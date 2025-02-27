import {TodoListTitle} from "./TodoListTitle.tsx";
import {AddTaskForm} from "./AddTaskForm.tsx";
import {TaskList} from "./TaskList.tsx";
import {FilterButton} from "./FilterButton.tsx";

type TodolistItemPropsType = {
    title: string
    tasks: TaskType[]
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const TodolistItem = ({title, tasks}: TodolistItemPropsType) => {

    // const { title, subTitle, description, tasks } = props // один из вариантов деструктуризации проксов

    return (
        <div>
            <TodoListTitle title={title}/>
            <AddTaskForm/>
            <TaskList tasks={tasks}/>
            <FilterButton/>
        </div>
    );
};

