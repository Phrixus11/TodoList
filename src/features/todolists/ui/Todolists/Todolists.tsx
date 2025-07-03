import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodolistItem} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx";
import {useGetTodolistsQuery} from "@/features/todolists/api/todolistsApi";
import Box from "@mui/material/Box";
import {TodolistSkeleton} from "@/features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton";

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
        <Box sx={{display: "flex", justifyContent: "space-between"}} style={{ gap: "32px" }}>
          {Array(3)
              .fill(null)
              .map((_, id) => (
                  <TodolistSkeleton key={id} />
              ))}
        </Box>
    )
  }

  return (
      <>
        {todolists?.map(tl => (
            <Grid key={tl.id}>
              <Paper elevation={3} sx={{p: '5px 15px 20px', position: 'relative'}}>
                {tl.entityStatus === 'loading' && <div style={{ position: 'absolute', top: '0', bottom: '0', right: '0', left: '0', cursor: 'not-allowed'}}></div>}
                <TodolistItem todolist={tl}/>
              </Paper>
            </Grid>
        ))}
      </>
  );
};