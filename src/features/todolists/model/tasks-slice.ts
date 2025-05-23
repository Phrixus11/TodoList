import {createSlice} from "@reduxjs/toolkit";
import {createTodolistTC, deleteTodolistTC} from "./todolists-slice";
import {nanoid} from "@reduxjs/toolkit/react";


export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as TaskStateType,
  reducers: create => ({
    deleteTaskAC: create.reducer<{ todolistId: string, taskId: string }>((state, action) => {
      const i = state[action.payload.todolistId].findIndex(e => e.id === action.payload.taskId)
      if (i !== -1) state[action.payload.todolistId].splice(i, 1)
    }),
    createTaskAC: create.preparedReducer(( {todolistId, title}: {todolistId: string,title: string} )=>{
      return {
        payload: {
          todolistId,
          title,
          taskId: nanoid()
        }
      }
    },(state, action) => {
      state[action.payload.todolistId].unshift({
        id: action.payload.taskId,
        title: action.payload.title,
        isDone: false
      })
    }),

    changeTaskStatusAC: create.reducer<{
      todolistId: string,
      taskId: string,
      newIsDone: boolean
    }>((state, action) => {
      const el = state[action.payload.todolistId].find(e => e.id === action.payload.taskId)
      if (el) el.isDone = action.payload.newIsDone
    }),

    changeTaskTitleAC: create.reducer<{ todolistId: string, taskId: string, newTitle: string }>((state, action) => {
      const el = state[action.payload.todolistId].find(e => e.id === action.payload.taskId)
      if (el) el.title = action.payload.newTitle
    }),

  }),
  extraReducers: builder => {
    builder
        .addCase(createTodolistTC.fulfilled, (state, action)=> {
          state[action.payload.todolistId] = []
        })
        .addCase(deleteTodolistTC.fulfilled, (state, action)=> {
          delete state[action.payload.todolistId]
        })
  },
  selectors: {
    selectTasks: (state) => state
  }
})

export const {deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const {selectTasks} = tasksSlice.selectors

// export const deleteTaskAC2 = createAction<{ todolistId: string, taskId: string }>('tasks/deleteTasks')
// export const createTaskAC2 = createAction('tasks/createTask', ({todolistId, title}: {
//     todolistId: string,
//     title: string
// }) => {
//     return {payload: {todolistId, taskId: nanoid(), title, isDone: false}}
// })
// export const changeTaskStatusAC2 = createAction<{
//     todolistId: string,
//     taskId: string,
//     newIsDone: boolean
// }>('tasks/changeTaskStatus')
// export const changeTaskTitleAC2 = createAction<{
//     todolistId: string,
//     taskId: string,
//     newTitle: string
// }>('tasks/changeTaskTitle')
//
//
// export const tasksReducer2 = createReducer(initialState, builder => {
//   builder
//       // .addCase(deleteTodolistAC, (state, action) => {
//       //     delete state[action.payload.todolistId]
//       // })
//       .addCase(createTodolistAC, (state, action) => {
//         state[action.payload.todolistId] = []
//       })
//       .addCase(deleteTaskAC, (state, action) => {
//         const i = state[action.payload.todolistId].findIndex(e => e.id === action.payload.taskId)
//         if (i !== -1) state[action.payload.todolistId].splice(i, 1)
//       })
//       .addCase(createTaskAC, (state, action) => {
//         state[action.payload.todolistId].unshift({
//           id: action.payload.taskId,
//           title: action.payload.title,
//           isDone: false
//         })
//       })
//       .addCase(changeTaskStatusAC, (state, action) => {
//         const el = state[action.payload.todolistId].find(e => e.id === action.payload.taskId)
//         if (el) el.isDone = action.payload.newIsDone
//       })
//       .addCase(changeTaskTitleAC, (state, action) => {
//         const el = state[action.payload.todolistId].find(e => e.id === action.payload.taskId)
//         if (el) el.title = action.payload.newTitle
//       })
//
// })

export type TaskStateType = {
  [todolistId: string]: TaskType[]
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}