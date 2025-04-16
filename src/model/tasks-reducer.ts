import {TaskStateType} from "../App.tsx";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";
import {v1} from "uuid";

type ActionType = ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof createTodolistAC>
    | ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof createTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>

export const tasksReducer = (tasks: TaskStateType = {}, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "create_todolist": {
            const {todolistId} = action.payload
            return {...tasks, [todolistId]: []}
        }
        case "delete_todolist": {
            const {todolistId} = action.payload
            const copyState = {...tasks}
            delete copyState[todolistId]
            return copyState
        }
        case "delete_task": {
            const {todolistId, taskId} = action.payload
            return {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
        }
        case "create_task": {
            const {todolistId, title} = action.payload
            return {
                ...tasks,
                [todolistId]: [{id: v1(), title, isDone: false}, ...tasks[todolistId]]
            }
        }
        case "change_task_status": {
            const {todolistId, taskId, isDone} = action.payload
            return {
            ...tasks,
                [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)
            }
        }
        case "change_task_title":{
            const {todolistId, taskId, title} = action.payload
            return {
                ...tasks,
                [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
            }
        }
        default: {
            return tasks
        }
    }
}

export const deleteTaskAC = ({todolistId, taskId}: { todolistId: string, taskId: string }) => ({
    type: 'delete_task',
    payload: {taskId, todolistId}
} as const)

export const createTaskAC = ({todolistId, title}: { todolistId: string, title: string }) => ({
    type: 'create_task',
    payload: {title, todolistId}
} as const)

export const changeTaskStatusAC = ({todolistId, taskId, isDone}: {
    todolistId: string,
    taskId: string,
    isDone: boolean
}) => ({
    type: 'change_task_status',
    payload: {todolistId, taskId, isDone}
} as const)

export const changeTaskTitleAC = ({todolistId, taskId, title}: {
    todolistId: string,
    taskId: string,
    title: string
}) => ({
    type: 'change_task_title',
    payload: {todolistId, taskId, title}
} as const)

