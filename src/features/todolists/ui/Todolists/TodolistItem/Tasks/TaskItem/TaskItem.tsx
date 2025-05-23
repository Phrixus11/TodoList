import {getListItemSx} from "./TaskList.styles";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ListItem from "@mui/material/ListItem";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, type TaskType} from "@/features/todolists/model/tasks-slice.ts";
import {ChangeEvent} from "react";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {type DomainTodolist} from "@/features/todolists/model/todolists-slice.ts";

type Props = {
  todolist: DomainTodolist
  task: TaskType
};
export const TaskItem = ({todolist, task}: Props) => {

  const dispatch = useAppDispatch()
  const changeTaskTitleHandler = (title: string) => {
    const action = changeTaskTitleAC({todolistId: todolist.id, taskId: task.id, newTitle: title})
    dispatch(action)
  }
  const deleteTaskHandler = () => {
    const action = deleteTaskAC({todolistId: todolist.id, taskId: task.id})
    dispatch(action)
  }
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const action = changeTaskStatusAC({todolistId: todolist.id, taskId: task.id, newIsDone: e.currentTarget.checked})
    dispatch(action)
  }

  return (
      <ListItem disablePadding sx={getListItemSx(task.isDone)}>
        <Box>
          <Checkbox
              checked={task.isDone}
              onChange={changeTaskStatusHandler}
              size={"small"}/>
          <EditableSpan maxTitleLength={12}
                        title={task.title}
                        changeTitleHandler={changeTaskTitleHandler}/>
        </Box>
        <IconButton size={"small"}
                    aria-label="delete"
                    onClick={deleteTaskHandler}>
          <DeleteForeverIcon color="primary"/>
        </IconButton>
      </ListItem>
  );
};