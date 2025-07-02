import {createTodolistTC, deleteTodolistTC} from "./todolists-slice";
import {createAppSlice, handleServerAppError, handleServerNetworkError} from "@/common/utils";
import {_tasksApi} from "../api/tasksApi";
import {type DomainTask} from "@/features/todolists/api/tasksApi.types";
import {changeAppStatusAC} from "@/app/app-slice";
import {ResultCode} from "@/common/Enums";
import {getTasksSchema} from "@/features/todolists/lib/schemas";


export const tasksSlice = createAppSlice({
  name: 'tasks',
  initialState: {} as TaskStateType,
  reducers: create => ({
    fetchTasksTC: create.asyncThunk(async (todolistId: string, thunkAPI) => {
      try {
        thunkAPI.dispatch(changeAppStatusAC({status: 'loading'}))
        const res = await _tasksApi.getTasks(todolistId)
        // // проверка респонса с помощью zod, чтолько для domainTasks
        // domainTaskSchema.array().parse(res.data.items)
        getTasksSchema.parse(res.data)

        thunkAPI.dispatch(changeAppStatusAC({status: 'succeeded'}))
        return {todolistId, tasks: res.data.items}
      } catch (e) {
        handleServerNetworkError(thunkAPI.dispatch, e)
        return thunkAPI.rejectWithValue(e)
      }
    }, {
      fulfilled: (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      },
    }),

    createTaskTC: create.asyncThunk(async (args: { todolistId: string, title: string }, thunkAPI) => {
      try {
        thunkAPI.dispatch(changeAppStatusAC({status: 'loading'}))
        const res = await _tasksApi.createTask(args)

        if (res.data.resultCode === ResultCode.Success) {
          thunkAPI.dispatch(changeAppStatusAC({status: 'succeeded'}))
          return {todolistId: args.todolistId, task: res.data.data.item}
        } else {
          handleServerAppError(thunkAPI.dispatch, res.data)
          return thunkAPI.rejectWithValue(null)
        }

      } catch (e: any) {
        handleServerNetworkError(thunkAPI.dispatch, e)
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
        thunkAPI.dispatch(changeAppStatusAC({status: 'loading'}))
        const res = await _tasksApi.deleteTask(args)

        if (res.data.resultCode === ResultCode.Success) {
          thunkAPI.dispatch(changeAppStatusAC({status: 'succeeded'}))
          return args
        } else {
          handleServerAppError(thunkAPI.dispatch, res.data)
          return thunkAPI.rejectWithValue(null)
        }

      } catch (e) {
        handleServerNetworkError(thunkAPI.dispatch, e)
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
      const {taskId, todolistId, domainModel} = args
      try {
        const model = {
          description: domainModel.description,
          title: domainModel.title,
          priority: domainModel.priority,
          startDate: domainModel.startDate,
          deadline: domainModel.deadline,
          status: domainModel.status
        }
        thunkAPI.dispatch(changeAppStatusAC({status: 'loading'}))
        const res = await _tasksApi.updateTask({taskId, todolistId, model})

        if (res.data.resultCode === ResultCode.Success) {
          thunkAPI.dispatch(changeAppStatusAC({status: 'succeeded'}))
          return args
        } else {
          handleServerAppError(thunkAPI.dispatch, res.data)
          return thunkAPI.rejectWithValue(null)
        }

      } catch (e) {
        handleServerNetworkError(thunkAPI.dispatch, e)
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

