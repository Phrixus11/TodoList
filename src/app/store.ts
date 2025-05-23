import {configureStore} from '@reduxjs/toolkit'
import {tasksReducer, tasksSlice} from '@/features/todolists/model/tasks-slice'
import {todolistsReducer, todolistsSlice} from '@/features/todolists/model/todolists-slice'
import {appReducer, appSlice} from "./app-slice.ts";

// // объединение reducer'ов с помощью combineReducers
// const rootReducer = combineReducers({
//     app: appReducer,
//     tasks: tasksReducer,
//     todolists: todolistsReducer
// })

// создание store
export const store = configureStore({
    reducer: {
        [appSlice.name]: appReducer,
        [todolistsSlice.name]: todolistsReducer,
        [tasksSlice.name]: tasksReducer
    },
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store