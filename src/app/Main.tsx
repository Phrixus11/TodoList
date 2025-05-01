import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "@/common/components/AddItemForm/AddItemForm.tsx";
import {createTodolistAC} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Todolists} from "@/features/todolists/ui/Todolists/Todolists.tsx";


export const Main = () => {


    const dispatch = useAppDispatch()

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatch(action)
    }

    return (
        <Container maxWidth="lg">
            <Grid container sx={{p: '20px 0'}}>
                <AddItemForm createItems={createTodolist} maxTitleLength={20}/>
            </Grid>
            <Grid container spacing={2}>
                <Todolists/>
            </Grid>
        </Container>
    );
};