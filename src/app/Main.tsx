import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "@/common/components/AddItemForm/AddItemForm.tsx";
import {Todolists} from "@/features/todolists/ui/Todolists/Todolists.tsx";
import {useCreateTodolistMutation} from "@/features/todolists/api/todolistsApi";


export const Main = () => {
  // const dispatch = useAppDispatch()
const [addTodolist] = useCreateTodolistMutation()


  const createTodolist = (title: string) => {
    addTodolist(title)
  }

  // if (!isLoggedIn) {
  //   return <Navigate to={Path.Login}/>
  // }

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