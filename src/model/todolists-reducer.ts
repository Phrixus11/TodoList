import {FilterValuesType, TodolistType} from "../App.tsx";

const initialState: TodolistType[] = []

// определение типа через  DeleteTodolistActionType
// export type DeleteTodolistActionType = {
//     type: 'delete_todolist'
//     payload: {
//         todolistId: string
//     }
// }

// определение типа через возврат типа из функции используя as const внутри функции
// export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
// export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>

type ActionType = ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof createTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>


export const todolistsReducer = (todolists: TodolistType[] = initialState, action: ActionType): TodolistType[] => {
    switch (action.type) {
        case "delete_todolist": {
            const {todolistId} = action.payload
            return todolists.filter(tl => tl.id !== todolistId)
        }
        case "create_todolist": {
            const {todolistId, title} = action.payload
            return [...todolists, {id: todolistId, title, filter: "All"}]
        }
        case "change_todolist_title": {
            const {todolistId, title} = action.payload
            return todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl)
        }
        case "change_todolist_filter": {
            const {todolistId, filter} = action.payload
            return todolists.map(tl => tl.id === todolistId
                ? {...tl, filter}
                : tl)
        }
        default:
            return todolists
    }
}

// определение типа через  DeleteTodolistActionType
// export const DeleteTodolistAC = (todolistId: string): DeleteTodolistActionType => ({
//     type: 'delete_todolist',
//     payload: {todolistId}
// })

// определение типа через возврат типа из функции используя as const
export const deleteTodolistAC = (todolistId: string) => ({
    type: 'delete_todolist',
    payload: {todolistId}
} as const)

export const createTodolistAC = (title: string, todolistId: string) => ({
    type: 'create_todolist',
    payload: {todolistId, title}
} as const)

export const changeTodolistTitleAC = ({todolistId, title}: { todolistId: string, title: string }) => ({
    type: 'change_todolist_title',
    payload: {todolistId, title}
} as const)

export const changeTodolistFilterAC = ({todolistId, filter}: { todolistId: string, filter: FilterValuesType }) => ({
    type: 'change_todolist_filter',
    payload: {todolistId, filter}
} as const)
