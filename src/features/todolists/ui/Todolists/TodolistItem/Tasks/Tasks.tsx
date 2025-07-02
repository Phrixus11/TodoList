import List from "@mui/material/List";
import {type DomainTodolist} from "@/features/todolists/model/todolists-slice";
import {TaskItem} from "./TaskItem/TaskItem";
import {type DomainTask, TaskStatus} from "@/features/todolists/api/tasksApi.types";
import {useGetTasksQuery} from "@/features/todolists/api/tasksApi";


type TaskListPropsType = {
  todolist: DomainTodolist
}

export const Tasks = ({todolist}: TaskListPropsType) => {
      const {id, filter} = todolist
      const {data} = useGetTasksQuery(id)


      let filteredTasks = data?.items
      if (filter === "Active") {
        filteredTasks = filteredTasks?.filter((task: DomainTask) => task.status === TaskStatus.New)
      }
      if (filter === "Completed") {
        filteredTasks = filteredTasks?.filter((task: DomainTask) => task.status === TaskStatus.Completed)
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


