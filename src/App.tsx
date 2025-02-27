import './App.css'
import {TaskType, TodolistItem} from "./components/TodolistItem.tsx";

export type Task = {
    id: number
    title: string
    isDone: boolean
}



export const App = () => {



    //BLL
    const todoListTitle_1 = "What to learn"
    const todoListTitle_2 = "What to buy"

    const tasks1: TaskType[] = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
    ]

    const tasks2: Array<TaskType> = [
        { id: 4, title: 'Beer', isDone: true },
        { id: 5, title: 'Meat', isDone: false },
        { id: 6, title: 'Cheeps', isDone: false },
    ]

    return (
        <div className="app">
            <TodolistItem title={todoListTitle_1} tasks={tasks1} />
            <TodolistItem title={todoListTitle_2} tasks={tasks2} />
        </div>
    )
}