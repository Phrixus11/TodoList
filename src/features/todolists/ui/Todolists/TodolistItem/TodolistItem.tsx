import {TodoListTitle} from "./TodoListTitle/TodoListTitle.tsx";
import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm.tsx";
import {Tasks} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx";
import {FilterButton} from "./FilterButton/FilterButton.tsx";
import {TodolistType} from "@/features/todolists/model/todolists-reducer.ts";
import {createTaskAC} from "@/features/todolists/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";


type TodolistItemPropsType = {
    todolist: TodolistType
}


export const TodolistItem = ({todolist}: TodolistItemPropsType) => {
    const {id} = todolist
    const dispatch = useAppDispatch()


    const createTaskHandler = (title: string) => {
        const action = createTaskAC({todolistId: id, title})
        dispatch(action)
    }


    return (
        <div>
            <TodoListTitle todolist={todolist}/>
            <AddItemForm maxTitleLength={12} createItems={createTaskHandler}/>
            <Tasks todolist={todolist}/>
            <FilterButton todolist={todolist}/>
        </div>
    );
};

