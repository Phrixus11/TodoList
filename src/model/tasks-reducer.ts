import {TaskStateType} from "../app/App.tsx";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: TaskStateType = {}

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/deleteTasks')
export const createTaskAC = createAction('tasks/createTask', ({todolistId, title}: {
    todolistId: string,
    title: string
}) => {
    return {payload: {todolistId, taskId: nanoid(), title, isDone: false}}
})
export const changeTaskStatusAC = createAction<{
    todolistId: string,
    taskId: string,
    newIsDone: boolean
}>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{
    todolistId: string,
    taskId: string,
    newTitle: string
}>('tasks/changeTaskTitle')


export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.todolistId] = []
        })
        .addCase(deleteTaskAC, (state, action) => {
            const i = state[action.payload.todolistId].findIndex(e => e.id === action.payload.taskId)
            if (i !== -1) state[action.payload.todolistId].splice(i, 1)
        })
        .addCase(createTaskAC, (state, action) => {
            state[action.payload.todolistId].unshift({
                id: action.payload.taskId,
                title: action.payload.title,
                isDone: false
            })
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const el = state[action.payload.todolistId].find(e => e.id === action.payload.taskId)
            if (el) el.isDone = action.payload.newIsDone
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const el = state[action.payload.todolistId].find(e => e.id === action.payload.taskId)
            if (el) el.title = action.payload.newTitle
        })

})

