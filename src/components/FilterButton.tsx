import Button from "@mui/material/Button";
import {FilterValuesType} from "../app/App.tsx";
import Box from "@mui/material/Box";


type FilterButtonProps = {
    changeTodolistFilter: (newFilterValue: FilterValuesType) => void
    activeFilter: FilterValuesType
}

export const FilterButton = ({changeTodolistFilter, activeFilter}: FilterButtonProps) => {

    return (
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Button
                size={'small'}
                disableElevation variant={'contained'}
                color={activeFilter === "All" ? 'secondary' : 'primary'}

                onClick={() => changeTodolistFilter('All')}>All</Button>
            <Button
                size={'small'}
                disableElevation
                variant={'contained'}
                color={activeFilter === "Active" ? 'secondary' : 'primary'}
                onClick={() => changeTodolistFilter('Active')}>Active</Button>
            <Button
                size={'small'}
                disableElevation
                variant={'contained'}
                color={activeFilter === "Completed" ? 'secondary' : 'primary'}
                onClick={() => changeTodolistFilter('Completed')}>Completed</Button>
        </Box>
    );
};

