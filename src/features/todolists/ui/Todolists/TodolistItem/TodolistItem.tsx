import {TodoListTitle} from "./TodoListTitle/TodoListTitle.tsx";
import {AddItemForm} from "@/common/components/AddItemForm/AddItemForm";
import {Tasks} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx";
import {FilterButton} from "./FilterButton/FilterButton.tsx";
import {type DomainTodolist} from "@/features/todolists/model/todolists-slice.ts";
import {createTaskTC} from "@/features/todolists/model/tasks-slice.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";


type TodolistItemPropsType = {
    todolist: DomainTodolist
}


export const TodolistItem = ({todolist}: TodolistItemPropsType) => {
    const {id} = todolist
    const dispatch = useAppDispatch()


    const createTaskHandler = (title: string) => {
        const action = createTaskTC({todolistId: id, title})
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

