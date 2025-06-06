import IconButton from "@mui/material/IconButton";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  changeTodolistTitleTC,
  deleteTodolistTC,
  type DomainTodolist,
} from "@/features/todolists/model/todolists-slice.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type TodoListTitlePropsType = {
  todolist: DomainTodolist

}

export const TodoListTitle = ({todolist}: TodoListTitlePropsType) => {
  const {id, title, entityStatus} = todolist
  const dispatch = useAppDispatch()


  const deleteTodolistHandler = () => {
    const action = deleteTodolistTC({todolistId: id})
    dispatch(action)
  }
  const changeTodoListTitleHandler = (title: string) => {
    dispatch(changeTodolistTitleTC({todolistId: id, title}))
  }

  return (
      <h3>
        <EditableSpan maxTitleLength={20} title={title} changeTitleHandler={changeTodoListTitleHandler}/>

        <IconButton
            aria-label="delete"
            onClick={deleteTodolistHandler}
            disabled={entityStatus === 'loading' }>
          <DeleteForeverIcon color="primary"/>
        </IconButton>
      </h3>
  );
};

