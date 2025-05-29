import List from "@mui/material/List";
import {fetchTasksTC, selectTasks} from "@/features/todolists/model/tasks-slice";
import {useAppSelector} from "@/common/hooks/useAppSelector";

import {type DomainTodolist} from "@/features/todolists/model/todolists-slice";
import {TaskItem} from "./TaskItem/TaskItem";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {TaskStatus, type DomainTask} from "@/features/todolists/api/tasksApi.types";
import {useEffect} from "react";


type TaskListPropsType = {
  todolist: DomainTodolist
}

export const Tasks = ({todolist}: TaskListPropsType) => {
      const {id, filter} = todolist
      const tasks = useAppSelector(selectTasks)
      const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id))
  }, []);

      let filteredTasks: DomainTask[] = tasks[id]
      if (filter === "Active") {
        filteredTasks = tasks[id].filter((task: DomainTask) => task.status === TaskStatus.New)
      }
      if (filter === "Completed") {
        filteredTasks = tasks[id].filter((task: DomainTask) => task.status === TaskStatus.Completed)
      }

      const tasksList = filteredTasks?.length === 0 ?
          <span>Ваш список пуст</span> :
          <List>
            {filteredTasks?.map(t => (
                <TaskItem key={t.id} task={t} todolist={todolist}/>
            ))}
          </List>


      return <> {tasksList}  </>
    }


