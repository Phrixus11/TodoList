import {TaskType} from "./TodolistItem.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import {getListItemSx} from "./TaskList.styles.ts";

type TaskListPropsType = {
    tasks: TaskType[]
    deleteTask: (id: string) => void
    changeTaskStatus: (taskId: string, newIsDoneStatus: boolean) => void
    changeTaskTitle: (id: string, title: string) => void
}

export const TaskList = ({tasks, deleteTask, changeTaskStatus, changeTaskTitle}: TaskListPropsType) => {

        const tasksList = tasks.length === 0 ?
            <span>Ваш список пуст</span> :
            <List>
                {tasks.map(t => {
                    // const TaskClass = t.isDone ? "task-done" : "task"
                    const changeTaskTitleHandler = (title: string) => {
                        changeTaskTitle(t.id, title,)
                    }
                    return (
                        <ListItem key={t.id} disablePadding sx={getListItemSx(t.isDone)}>
                            <Box>
                                <Checkbox
                                    checked={t.isDone}
                                    onChange={(e) => changeTaskStatus(t.id, e.currentTarget.checked)}
                                    size={"small"}/>
                                <EditableSpan maxTitleLength={12}
                                              title={t.title}
                                              changeTitleHandler={changeTaskTitleHandler}/>
                            </Box>
                            <IconButton size={"small"}
                                        aria-label="delete"
                                        onClick={() => deleteTask(t.id)}>
                                <DeleteForeverIcon color="primary"/>
                            </IconButton>
                        </ListItem>
                    )
                })
                }
            </List>


        return <> {tasksList}  </>
    }
;

