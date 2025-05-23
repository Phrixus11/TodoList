import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  changeTodolistFilterAC,
  type DomainTodolist,
  FilterValuesType
} from "@/features/todolists/model/todolists-slice.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";


type FilterButtonProps = {
    todolist: DomainTodolist
}

export const FilterButton = ({todolist}: FilterButtonProps) => {
    const {id, filter} = todolist

    const dispatch = useAppDispatch()

    const changeTodolistFilterHandler = (newFilterValue: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({todolistId: id, filter: newFilterValue}))
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

