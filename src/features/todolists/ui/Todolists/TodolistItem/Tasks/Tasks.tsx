import List from '@mui/material/List'
import { type DomainTodolist } from '@/features/todolists/lib/types'
import { TaskItem } from './TaskItem/TaskItem'
import { type DomainTask, TaskStatus } from '@/features/todolists/api/tasksApi.types'
import { useGetTasksQuery } from '@/features/todolists/api/tasksApi'
import { TasksSkeleton } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton'
import { useState } from 'react'
import { TasksPagination } from './TasksPagination/TasksPagination'

type TaskListPropsType = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: TaskListPropsType) => {
  const [page, setPage] = useState(1)

  const { id, filter } = todolist
  const { data, isLoading } = useGetTasksQuery({ todolistId: id, params: { page: page } })

  // 1 variant
  // useEffect(() => {
  //   if (!!error) {
  //     dispatch(setErrorAC({ error: JSON.stringify((error as any).data.message) }))
  //   }
  // }, [error]);

  // 2 variant
  // useEffect(() => {
  //   if (!error) return
  //   if ('status' in error) {
  //     // FetchBaseQueryError
  //     const errMsg = 'error' in error ? error.error : JSON.stringify(error.data || 'Some error occurred')
  //     dispatch(setErrorAC({ error: errMsg }))
  //   } else {
  //     // SerializedError
  //     dispatch(setErrorAC({ error: error.message || 'Some error occurred' }))
  //   }
  // }, [error])

  let filteredTasks = data?.items
  if (filter === 'Active') {
    filteredTasks = filteredTasks?.filter((task: DomainTask) => task.status === TaskStatus.New)
  }
  if (filter === 'Completed') {
    filteredTasks = filteredTasks?.filter((task: DomainTask) => task.status === TaskStatus.Completed)
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  const tasksList =
    filteredTasks?.length === 0 ? (
      <span>Ваш список пуст</span>
    ) : (
      <>
        <List>{filteredTasks?.map((t) => <TaskItem key={t.id} task={t} todolist={todolist} />)}</List>
        <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
      </>
    )

  return <> {tasksList} </>
}
