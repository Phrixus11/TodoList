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
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = ({title, tasks, deleteTask, changeTodolistFilter, createTasks}: TodolistItemPropsType) => {

    // const { title, subTitle, description, tasks } = props // один из вариантов деструктуризации проксов

    return (
        <div>
            <TodoListTitle title={title}/>
            <AddTaskForm createTasks={createTasks}/>
            <TaskList tasks={tasks} deleteTask={deleteTask} />
            <FilterButton changeTodolistFilter={changeTodolistFilter}/>
        </div>
    );
};

