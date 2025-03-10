import './App.css'
import {TaskType, TodolistItem} from "./components/TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";


export type FilterValuesType = "All" | "Active" | "Completed"

export const App = () => {
    //BLL
    const todoListTitle_1 = "What to learn"
    // const todoListTitle_2 = "What to buy"


    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])

    // const tasks2: Array<TaskType> = [
    //     { id: 4, title: 'Beer', isDone: true },
    //     { id: 5, title: 'Meat', isDone: false },
    //     { id: 6, title: 'Cheeps', isDone: false },
    // ]

    const deleteTask = (id: string) => {
        const nextState: TaskType[] = tasks.filter((task: TaskType) => {
            return task.id !== id
        })
        setTasks(nextState)
    }

    const createTasks = (title: string) => {
        // const newTask: TaskType = {id: v1(), title: title, isDone: false}
        // const nextState: TaskType[] = [...tasks, newTask]
        setTasks([...tasks, {id: v1(), title, isDone: false}])
    }

    const [filter, setFilter] = useState<FilterValuesType>("All")

    let filteredTasks: TaskType[] = []
    if (filter === "All") {
        filteredTasks = tasks
    }
    if (filter === "Active") {
        filteredTasks = tasks.filter((task: TaskType) => !task.isDone)
    }
    if (filter === "Completed") {
        filteredTasks = tasks.filter((task: TaskType) => task.isDone)
    }


    const changeTodolistFilter = (newFilterValue: FilterValuesType) => {
        setFilter(newFilterValue)
    }

    return (
        <div className="app">
            <TodolistItem title={todoListTitle_1}
                          tasks={filteredTasks}
                          deleteTask={deleteTask}
                          changeTodolistFilter={changeTodolistFilter}
                          createTasks={createTasks}/>

            {/*<TodolistItem title={todoListTitle_2} tasks={tasks2} />*/}
        </div>
    )
}