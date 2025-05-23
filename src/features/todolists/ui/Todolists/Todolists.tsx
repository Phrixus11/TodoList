import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodolistItem} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {useEffect} from "react";
import {fetchTodolistsTC, selectTodolists} from "@/features/todolists/model/todolists-slice";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, []);

  return (
      <>
        {todolists.map(tl => (
            <Grid key={tl.id}>
              <Paper elevation={3} sx={{p: '5px 15px 20px'}}>
                <TodolistItem todolist={tl}/>
              </Paper>
            </Grid>
        ))}
      </>
  );
};