import {TodoListTitle} from "./TodoListTitle.tsx";
import {AddTaskForm} from "./AddTaskForm.tsx";
import {TaskList} from "./TaskList.tsx";
import {FilterButton} from "./FilterButton.tsx";
import {FilterValuesType} from "../App.tsx";

type TodolistItemPropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (id: string) => void
    changeTodolistFilter: (newFilterValue: FilterValuesType) => void
    createTasks: (title: string) => void
    changeTaskStatus:(id: string, newIsDoneStatus:boolean) => void
    activeFilter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = ({title, tasks, deleteTask, changeTodolistFilter, createTasks, changeTaskStatus, activeFilter}: TodolistItemPropsType) => {

    // const { title, subTitle, description, tasks } = props // один из вариантов деструктуризации проксов

    return (
        <div>
            <TodoListTitle title={title}/>
            <AddTaskForm maxTitleLength={12} createTasks={createTasks}/>
            <TaskList changeTaskStatus={changeTaskStatus} tasks={tasks} deleteTask={deleteTask} />
            <FilterButton activeFilter={activeFilter} changeTodolistFilter={changeTodolistFilter}/>
        </div>
    );
};

