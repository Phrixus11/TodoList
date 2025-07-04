import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {todolistsApi} from "@/features/todolists/api/todolistsApi";
import {type DomainTodolist, type FilterValuesType} from "@/features/todolists/lib/types";


type FilterButtonProps = {
  todolist: DomainTodolist
}

export const FilterButton = ({todolist}: FilterButtonProps) => {
  const {id, filter} = todolist

  const dispatch = useAppDispatch()

  const changeTodolistFilterHandler = (newFilterValue: FilterValuesType) => {
    dispatch(todolistsApi.util.updateQueryData('getTodolists', undefined, (todolists) => {
      const el = todolists.find((e) => e.id === id)
      if (el) el.filter = newFilterValue
    }))
  }


  return (
      <Box sx={{display: "flex", justifyContent: "space-between"}}>
        <Button
            size={'small'}
            disableElevation variant={'contained'}
            color={filter === "All" ? 'secondary' : 'primary'}

            onClick={() => changeTodolistFilterHandler('All')}>All</Button>
        <Button
            size={'small'}
            disableElevation
            variant={'contained'}
            color={filter === "Active" ? 'secondary' : 'primary'}
            onClick={() => changeTodolistFilterHandler('Active')}>Active</Button>
        <Button
            size={'small'}
            disableElevation
            variant={'contained'}
            color={filter === "Completed" ? 'secondary' : 'primary'}
            onClick={() => changeTodolistFilterHandler('Completed')}>Completed</Button>
      </Box>
  );
};

