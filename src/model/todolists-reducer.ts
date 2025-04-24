import {FilterValuesType, TodolistType} from "../app/App.tsx";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: TodolistType[] = []


export const deleteTodolistAC = createAction<{ todolistId: string }>('todolists/deleteTodolist')
export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return {payload: {title, todolistId: nanoid()}}
})
export const changeTodolistTitleAC = createAction<{
    todolistId: string,
    title: string
}>('todolists/changeTodolistTitle')
export const changeTodolistFilterAC = createAction<{
    todolistId: string,
    filter: FilterValuesType
}>('todolists/changeTodolistFilter')


export const todolistsReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const i = state.findIndex(e => e.id === action.payload.todolistId)
            if (i !== -1) state.splice(i, 1)
        })
        .addCase(createTodolistAC, (state, action) => {
            state.push({id: action.payload.todolistId, title: action.payload.title, filter: 'All'})
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const i = state.findIndex(e => e.id === action.payload.todolistId)
            if (i !== -1) state[i].title = action.payload.title
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            const el = state.find(e => e.id === action.payload.todolistId)
            if (el) el.filter = action.payload.filter
        })

})
