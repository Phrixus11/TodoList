import {getListItemSx} from "./TaskList.styles";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ListItem from "@mui/material/ListItem";
import {updateTaskTC, deleteTaskTC} from "@/features/todolists/model/tasks-slice.ts";
import {ChangeEvent} from "react";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {type DomainTodolist} from "@/features/todolists/model/todolists-slice.ts";
import {type DomainTask, TaskStatus} from "@/features/todolists/api/tasksApi.types";

type Props = {
  todolist: DomainTodolist
  task: DomainTask
};
export const TaskItem = ({todolist, task}: Props) => {

  const dispatch = useAppDispatch()
  const changeTaskTitleHandler = (title: string) => {
    const action = updateTaskTC({todolistId: todolist.id, taskId: task.id, domainModel: {...task, title}})
    dispatch(action)
  }
  const deleteTaskHandler = () => {
    const action = deleteTaskTC({todolistId: todolist.id, taskId: task.id})
    dispatch(action)
  }
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const action = updateTaskTC({todolistId: todolist.id, taskId: task.id, domainModel: {...task, status: e.currentTarget.checked? TaskStatus.Completed : TaskStatus.New}})
     dispatch(action)
  }

  return (
      <ListItem disablePadding sx={getListItemSx(task.status === TaskStatus.Completed)}>
        <Box>
          <Checkbox
              checked={task.status === TaskStatus.Completed}
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