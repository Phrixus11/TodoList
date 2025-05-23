export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}

export type DomainTask = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

// для исключения выборочно из DomainTask
export type UpdateTaskModel = Omit<DomainTask, "id" | "todoListId" | "order" | "addedDate">

//взять выборочно из DomainTask
export type Model = Pick<DomainTask, "description" | "title" | "status">

// для union type
// Exclude<> для исключения выборочно из юнион типа
// Extract<> взять выборочно из юнион типа

// export type Model2 = Partial<DomainTask> - все типа из DomainTask становятся опциональными
// export type Model2 = Required<DomainTask> - все типа из DomainTask становятся обязательными

const foo = (num1: number) => {
  return num1 > 0
}
export type Model3 = ReturnType<typeof foo> // типизирует значение которое возвращает функция
export type Model4 = Parameters<typeof foo> // типизирует входящие параметры

// export type UpdateTaskModel = {
//   description: string
//   title: string
//   status: TaskStatus
//   priority: TaskPriority
//   startDate: string
//   deadline: string
// }

export enum TaskStatus {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriority {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
