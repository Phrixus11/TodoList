import {TodoListTitle} from "./TodoListTitle.tsx";
import {AddTaskForm} from "./AddTaskForm.tsx";
import {TaskList} from "./TaskList.tsx";
import {FilterButton} from "./FilterButton.tsx";
import {FilterValuesType} from "../App.tsx";

type TodolistItemPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    activeFilter: FilterValuesType
    deleteTask: (id: string, todolistId: string) => void
    changeTodolistFilter: (newFilterValue: FilterValuesType, todolistId: string) => void
    createTasks: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, newIsDoneStatus: boolean, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = ({
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeTodolistFilter,
                                 createTasks,
                                 changeTaskStatus,
                                 activeFilter,
                                 todolistId,
                                 deleteTodolist
                             }: TodolistItemPropsType) => {

    // const { title, subTitle, description, tasks } = props // один из вариантов деструктуризации проксов

    const deleteTodolistHandler = () => {
        deleteTodolist(todolistId)
    }
    const createTaskHandler = (title: string) => {
        createTasks(title, todolistId)
    }
    const changeTaskStatusHandler = (taskId: string, newIsDoneStatus: boolean) => {
        changeTaskStatus(taskId, newIsDoneStatus, todolistId)
    }
    const deleteTaskHandler = (taskId: string) => {
        deleteTask(taskId, todolistId)
    }
    const changeTodolistFilterHandler = (newFilterValue: FilterValuesType) => {
        changeTodolistFilter(newFilterValue, todolistId)
    }

    return (
        <div>
            <TodoListTitle title={title} deleteTodolist={deleteTodolistHandler}/>
            <AddTaskForm maxTitleLength={12} createTasks={createTaskHandler}/>
            <TaskList changeTaskStatus={changeTaskStatusHandler}
                      tasks={tasks}
                      deleteTask={deleteTaskHandler}/>
            <FilterButton
                activeFilter={activeFilter}
                changeTodolistFilter={changeTodolistFilterHandler}/>
        </div>
    );
};

