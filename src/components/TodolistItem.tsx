import {TodoListTitle} from "./TodoListTitle.tsx";
import {AddTaskForm} from "./AddTaskForm.tsx";
import {TaskList} from "./TaskList.tsx";
import {FilterButton} from "./FilterButton.tsx";
import {FilterValuesType} from "../App.tsx";

type TodolistItemPropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (id: number) => void
    changeTodolistFilter: (newFilterValue: FilterValuesType) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const TodolistItem = ({title, tasks, deleteTask, changeTodolistFilter}: TodolistItemPropsType) => {

    // const { title, subTitle, description, tasks } = props // один из вариантов деструктуризации проксов

    return (
        <div>
            <TodoListTitle title={title}/>
            <AddTaskForm/>
            <TaskList tasks={tasks} deleteTask={deleteTask} />
            <FilterButton changeTodolistFilter={changeTodolistFilter}/>
        </div>
    );
};

