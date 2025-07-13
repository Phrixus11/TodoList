import IconButton from "@mui/material/IconButton";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {type DomainTodolist} from "@/features/todolists/lib/types";
import {
  useChangeTodolistTitleMutation,
  useDeleteTodolistMutation
} from "@/features/todolists/api/todolistsApi";

type TodoListTitlePropsType = {
  todolist: DomainTodolist

}

export const TodoListTitle = ({todolist}: TodoListTitlePropsType) => {
  const {id, title, entityStatus} = todolist
  const [deleteTodolist] = useDeleteTodolistMutation()
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()


  // Работа с entity status

  // const changeTodoListStatus = (status: RequestStatus) => {
  //   dispatch(todolistsApi.util.updateQueryData('getTodolists', undefined, (todolists) => {
  //     const el = todolists.find((e) => e.id === id)
  //     if (el) el.entityStatus = status
  //   }))
  // }
  // const deleteTodolistHandler = () => {
  //   changeTodoListStatus('loading')
  //   deleteTodolist(id).unwrap().catch(() => {
  //     changeTodoListStatus('idle')
  //   })
  // }


  // 1 вариант Optimistic update в компоненте

  // const deleteTodolistHandler = async () => {
  //   const patchResult = dispatch(
  //     todolistsApi.util.updateQueryData('getTodolists', undefined, state => {
  //       const index = state.findIndex(todolist => todolist.id === id)
  //       if (index !== -1) {
  //         state.splice(index, 1)
  //       }
  //     })
  //   )
  //   try {
  //     await deleteTodolist('id').unwrap()
  //   } catch {
  //     patchResult.undo()
  //   }
  // }


  const deleteTodolistHandler = () => deleteTodolist(id)

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

