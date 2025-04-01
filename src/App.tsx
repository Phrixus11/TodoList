import './App.css'
import {TaskType, TodolistItem} from "./components/TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm.tsx";


export type FilterValuesType = "All" | "Active" | "Completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
    // tasks: TaskType[] // так делать не будем, ввиду лишней большой вложенности
}

export type TaskStateType = {
    [todolistId: string]: TaskType[]
}

export const App = () => {
    //BLL
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todoListId_1, title: "What to learn", filter: "All"},
        {id: todoListId_2, title: "What to buy", filter: "All"},
    ])


    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux-toolkit', isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Meat', isDone: false},
            {id: v1(), title: 'Cheeps', isDone: false},
        ]
    })


    // delete
    const deleteTask = (id: string, todolistId: string) => {
        // const todolistTasks:TaskType[] = tasks[todolistId]
        // const filteredTasks: TaskType[] = todolistTasks.filter(t=> t.id !== id)
        // const nexState: TaskStateType = {...tasks, [todolistId]: filteredTasks}
        // setTasks(nexState)

        // короткая запись
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})
    }

    const createTasks = (title: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: [...tasks[todolistId], {id: v1(), title, isDone: false}]
        })
    }


    const changeTodolistFilter = (newFilterValue: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: newFilterValue} : tl)
        )
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }

    const createTodolist = (title: string) => {
       const newTodolistId = v1()
        setTodolists([...todolists, {id: newTodolistId, title, filter: "All"}])
        setTasks(prevState => ({...prevState, [newTodolistId]: []}))
    }

    const changeTodoListTitle = (newTitle: string, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: newTitle} : tl)
        )
    }

    //update checkbox task status
    const changeTaskStatus = (id: string, newIsDoneStatus: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, isDone: newIsDoneStatus} : t)
        })
    }

    const changeTaskTitle = (id: string, title: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, title} : t)
        })
    }

    const todolistsComponents = todolists.map(tl => {
        let filteredTasks: TaskType[] = tasks[tl.id]
        if (tl.filter === "Active") {
            filteredTasks = tasks[tl.id].filter((task: TaskType) => !task.isDone)
        }
        if (tl.filter === "Completed") {
            filteredTasks = tasks[tl.id].filter((task: TaskType) => task.isDone)
        }
        return (
            <TodolistItem
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
                activeFilter={tl.filter}
                tasks={filteredTasks}
                deleteTodolist={deleteTodolist}
                deleteTask={deleteTask}
                changeTodolistFilter={changeTodolistFilter}
                createTasks={createTasks}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
    })

    return (
        <div className="app">
            <AddItemForm createItems={createTodolist} maxTitleLength={20}/>
            {todolistsComponents}
        </div>
    )
}