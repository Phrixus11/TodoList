import './App.css'
import {TaskType, TodolistItem} from "./components/TodolistItem.tsx";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm.tsx";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {MenuAppBar} from "./components/MenuAppBar.tsx";
import {
    changeTodolistFilterAC, changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    tasksReducer
} from "./model/tasks-reducer.ts";

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

    const initialState: TodolistType[] = [
        {id: todoListId_1, title: "What to learn", filter: "All"},
        {id: todoListId_2, title: "What to buy", filter: "All"},
    ]
    // переход на useReducer
    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, initialState)
    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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

    // const [tasks, setTasks] = useState<TaskStateType>({
    //     [todoListId_1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //         {id: v1(), title: 'Redux-toolkit', isDone: false},
    //     ],
    //     [todoListId_2]: [
    //         {id: v1(), title: 'Beer', isDone: true},
    //         {id: v1(), title: 'Meat', isDone: false},
    //         {id: v1(), title: 'Cheeps', isDone: false},
    //     ]
    // })


    // delete
    const deleteTask = (id: string, todolistId: string) => {
        const action = deleteTaskAC({todolistId, taskId: id})
        dispatchTasks(action)
    }

    const createTasks = (title: string, todolistId: string) => {
        const action = createTaskAC({todolistId, title})
        dispatchTasks(action)
    }


    const changeTodolistFilter = (newFilterValue: FilterValuesType, todolistId: string) => {
        dispatchTodolists(changeTodolistFilterAC({todolistId, filter: newFilterValue}))
    }

    const deleteTodolist = (todolistId: string) => {
        const action = deleteTodolistAC(todolistId)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const createTodolist = (title: string) => {
        const newTodolistId = v1()
        const action = createTodolistAC(title, newTodolistId)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const changeTodoListTitle = (newTitle: string, todolistId: string) => {
        dispatchTodolists(changeTodolistTitleAC({todolistId, title: newTitle}))
    }

    //update checkbox task status
    const changeTaskStatus = (id: string, newIsDoneStatus: boolean, todolistId: string) => {
        const action = changeTaskStatusAC({todolistId, taskId: id, isDone: newIsDoneStatus})
        dispatchTasks(action)
    }

    const changeTaskTitle = (id: string, title: string, todolistId: string) => {
        const action = changeTaskTitleAC({todolistId, taskId: id, title})
        dispatchTasks(action)
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
            <Grid key={tl.id}>
                <Paper elevation={3} sx={{p: '5px 15px 20px'}}>
                    <TodolistItem
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
                </Paper>
            </Grid>
        )
    })

    const [isDarkMode, setIsDarkMode] = useState(false)

    // const theme = createTheme({
    //     palette: {
    //         primary:  lime,
    //         secondary: purple,
    //         mode: isDarkMode ? 'dark' : 'light',
    //     },
    // })

    const theme = createTheme({
        palette: {
            primary: {
                main: "#20a399"
            },
            // secondary: purple,
            mode: isDarkMode ? 'dark' : 'light',
        },
    })

// <CssBaseline/>  - комппонент, скидывающий базовые стили CSS
    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <MenuAppBar setIsDarkMode={() => setIsDarkMode(!isDarkMode)}/>
                <Container maxWidth="lg">
                    <Grid container sx={{p: '20px 0'}}>
                        <AddItemForm createItems={createTodolist} maxTitleLength={20}/>
                    </Grid>
                    <Grid container spacing={2}>
                        {todolistsComponents}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}