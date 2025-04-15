import {TaskStateType} from "../App.tsx";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";

type ActionType = ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof createTodolistAC>

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
        default: {
            return tasks
        }
    }
}