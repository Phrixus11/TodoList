import {TodoListTitle} from "./TodoListTitle/TodoListTitle.tsx";
import {AddItemForm} from "@/common/components/AddItemForm/AddItemForm";
import {Tasks} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx";
import {FilterButton} from "./FilterButton/FilterButton.tsx";
import {type DomainTodolist} from "@/features/todolists/model/todolists-slice.ts";
import {useCreateTaskMutation} from "@/features/todolists/api/tasksApi";

type TodolistItemPropsType = {
  todolist: DomainTodolist
}


export const TodolistItem = ({todolist}: TodolistItemPropsType) => {
  const {id} = todolist

  const [createTask] = useCreateTaskMutation()

  const createTaskHandler = (title: string) => {
    createTask({todolistId: id , title})
  }

  const isDisabled = todolist.entityStatus === 'loading'

  return (
      <div style={isDisabled ? {opacity: 0.6} : {}} inert={isDisabled}>
        <TodoListTitle todolist={todolist}/>
        <AddItemForm maxTitleLength={12} createItems={createTaskHandler} disabled={isDisabled}/>
        <Tasks todolist={todolist}/>
        <FilterButton todolist={todolist}/>
      </div>
  );
};

