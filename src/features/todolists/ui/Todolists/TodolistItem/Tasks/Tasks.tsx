import List from "@mui/material/List";
import {TaskType} from "@/features/todolists/model/tasks-reducer";
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {selectTasks} from "@/features/todolists/model/tasks-selectors";
import {TodolistType} from "@/features/todolists/model/todolists-reducer";
import {TaskItem} from "./TaskItem/TaskItem";


type TaskListPropsType = {
  todolist: TodolistType
}

export const Tasks = ({todolist}: TaskListPropsType) => {
      const {id, filter} = todolist
      const tasks = useAppSelector(selectTasks)


      let filteredTasks: TaskType[] = tasks[id]
      if (filter === "Active") {
        filteredTasks = tasks[id].filter((task: TaskType) => !task.isDone)
      }
      if (filter === "Completed") {
        filteredTasks = tasks[id].filter((task: TaskType) => task.isDone)
      }

      const tasksList = filteredTasks.length === 0 ?
          <span>Ваш список пуст</span> :
          <List>
            {filteredTasks.map(t => (
                <TaskItem key={t.id} task={t} todolist={todolist}/>
            ))}
          </List>


      return <> {tasksList}  </>
    }
;

