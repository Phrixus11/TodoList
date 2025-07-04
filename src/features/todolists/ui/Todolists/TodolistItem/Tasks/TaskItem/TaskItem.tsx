import {getListItemSx} from "./TaskList.styles";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ListItem from "@mui/material/ListItem";
import {ChangeEvent} from "react";
import {type DomainTodolist} from "@/features/todolists/lib/types";
import {type DomainTask, TaskStatus} from "@/features/todolists/api/tasksApi.types";
import {useDeleteTaskMutation, useUpdateTaskMutation} from "@/features/todolists/api/tasksApi";

type Props = {
  todolist: DomainTodolist
  task: DomainTask
};
export const TaskItem = ({todolist, task}: Props) => {
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const changeTaskTitleHandler = (title: string) => {
    updateTask({todolistId: todolist.id, taskId: task.id, model: {...task, title}})
  }
  const deleteTaskHandler = () => {
    deleteTask({todolistId: todolist.id, taskId: task.id})
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    updateTask({todolistId: todolist.id, taskId: task.id, model: {...task, status: e.currentTarget.checked? TaskStatus.Completed : TaskStatus.New}})
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