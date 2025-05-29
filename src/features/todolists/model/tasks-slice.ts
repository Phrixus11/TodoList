import {createTodolistTC, deleteTodolistTC} from "./todolists-slice";
import {createAppSlice} from "@/common/utils";
import {tasksApi} from "../api/tasksApi";
import type {DomainTask} from "@/features/todolists/api/tasksApi.types";
import {changeStatesAC} from "@/app/app-slice";


export const tasksSlice = createAppSlice({
  name: 'tasks',
  initialState: {} as TaskStateType,
  reducers: create => ({
    fetchTasksTC: create.asyncThunk(async (todolistId: string, thunkAPI) => {
      try {
        thunkAPI.dispatch(changeStatesAC({status: 'loading'}))
        const res = await tasksApi.getTasks(todolistId)
        thunkAPI.dispatch(changeStatesAC({status: 'succeeded'}))
        return {todolistId, tasks: res.data.items}
      } catch (e) {
        thunkAPI.dispatch(changeStatesAC({status: 'failed'}))
        return thunkAPI.rejectWithValue(e)
      }
    }, {
      fulfilled: (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      },
    }),

    createTaskTC: create.asyncThunk(async (args: { todolistId: string, title: string }, thunkAPI) => {
      try {
        thunkAPI.dispatch(changeStatesAC({status: 'loading'}))
        const res = await tasksApi.createTask(args)
        thunkAPI.dispatch(changeStatesAC({status: 'succeeded'}))
        return {todolistId: args.todolistId, task: res.data.data.item}
      } catch (e) {
        thunkAPI.dispatch(changeStatesAC({status: 'failed'}))
        return thunkAPI.rejectWithValue(e)
      }
    }, {
      fulfilled: (state, action) => {
        const newTask = action.payload.task
        state[action.payload.todolistId].unshift(newTask)
      }
    }),

    deleteTaskTC: create.asyncThunk(async (args: { todolistId: string, taskId: string }, thunkAPI) => {
      try {
        thunkAPI.dispatch(changeStatesAC({status: 'loading'}))
        await tasksApi.deleteTask(args)
        thunkAPI.dispatch(changeStatesAC({status: 'succeeded'}))
        return args
      } catch (e) {
        thunkAPI.dispatch(changeStatesAC({status: 'failed'}))
        return thunkAPI.rejectWithValue(e)
      }
    }, {
      fulfilled: (state, action) => {
        const i = state[action.payload.todolistId].findIndex(e => e.id === action.payload.taskId)
        if (i !== -1) state[action.payload.todolistId].splice(i, 1)
      }
    }),
    updateTaskTC: create.asyncThunk(async (args: {
      todolistId: string,
      taskId: string,
      domainModel: DomainTask
    }, thunkAPI) => {
      const {taskId,todolistId,domainModel} = args
      try {
        const model = {
          description: domainModel.description,
          title: domainModel.title,
          priority: domainModel.priority,
          startDate: domainModel.startDate,
          deadline: domainModel.deadline,
          status: domainModel.status
        }
        thunkAPI.dispatch(changeStatesAC({status: 'loading'}))
        await tasksApi.updateTask({taskId, todolistId, model})
        thunkAPI.dispatch(changeStatesAC({status: 'succeeded'}))
        return args
      } catch (e) {
        thunkAPI.dispatch(changeStatesAC({status: 'failed'}))
        return thunkAPI.rejectWithValue(e)
      }
    }, {
      fulfilled: (state, action) => {
        const tasks = state[action.payload.todolistId];
        let index = state[action.payload.todolistId].findIndex(e => e.id === action.payload.taskId)
        if (index !== -1) tasks[index] = action.payload.domainModel
      }
    }),

  }),
  extraReducers: builder => {
    builder
        .addCase(createTodolistTC.fulfilled, (state, action) => {
          state[action.payload.todolist.id] = []
        })
        .addCase(deleteTodolistTC.fulfilled, (state, action) => {
          delete state[action.payload.todolistId]
        })
  },
  selectors: {
    selectTasks: (state) => state
  }
})

export const {createTaskTC, updateTaskTC, fetchTasksTC, deleteTaskTC} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const {selectTasks} = tasksSlice.selectors

export type TaskStateType = {
  [todolistId: string]: DomainTask[]
}

