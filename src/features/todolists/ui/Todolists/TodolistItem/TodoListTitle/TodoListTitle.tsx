import IconButton from "@mui/material/IconButton";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {type DomainTodolist,} from "@/features/todolists/model/todolists-slice.ts";
import {useChangeTodolistTitleMutation, useDeleteTodolistMutation} from "@/features/todolists/api/todolistsApi";

type TodoListTitlePropsType = {
  todolist: DomainTodolist

}

export const TodoListTitle = ({todolist}: TodoListTitlePropsType) => {
  const {id, title, entityStatus} = todolist
  const [deleteTodolist] = useDeleteTodolistMutation()
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()

  const deleteTodolistHandler = () => {
    deleteTodolist(id)
  }
  const changeTodoListTitleHandler = (title: string) => {
    changeTodolistTitle({todolistId: id, title})
  }

  return (
      <h3>
        <EditableSpan maxTitleLength={20} title={title} changeTitleHandler={changeTodoListTitleHandler}/>

        <IconButton
            aria-label="delete"
            onClick={deleteTodolistHandler}
            disabled={entityStatus === 'loading'}>
          <DeleteForeverIcon color="primary"/>
        </IconButton>
      </h3>
  );
};

