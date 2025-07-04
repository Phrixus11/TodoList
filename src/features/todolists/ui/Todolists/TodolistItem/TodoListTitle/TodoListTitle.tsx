import IconButton from "@mui/material/IconButton";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {type DomainTodolist} from "@/features/todolists/lib/types";
import {
  todolistsApi,
  useChangeTodolistTitleMutation,
  useDeleteTodolistMutation
} from "@/features/todolists/api/todolistsApi";
import {useAppDispatch} from "@/common/hooks";
import type {RequestStatus} from "@/common/types";

type TodoListTitlePropsType = {
  todolist: DomainTodolist

}

export const TodoListTitle = ({todolist}: TodoListTitlePropsType) => {
  const {id, title, entityStatus} = todolist
  const [deleteTodolist] = useDeleteTodolistMutation()
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()
  const dispatch = useAppDispatch();


  const changeTodoListStatus = (status: RequestStatus) => {
    dispatch(todolistsApi.util.updateQueryData('getTodolists', undefined, (todolists) => {
      const el = todolists.find((e) => e.id === id)
      if (el) el.entityStatus = status
    }))
  }

  const deleteTodolistHandler = () => {
    changeTodoListStatus('loading')
    deleteTodolist(id).unwrap().catch(() => {
      changeTodoListStatus('idle')
    })
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

