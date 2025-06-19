import z from "zod/v4";
import {domainTaskSchema, getTasksSchema} from "@/features/todolists/lib/schemas";

export type DomainTask = z.infer<typeof domainTaskSchema>

// export type GetTasksResponse = {
//   error: string | null
//   totalCount: number
//   items: DomainTask[]
// }

export type GetTasksResponse = z.infer<typeof getTasksSchema>

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


// для исключения выборочно из DomainTask
export type UpdateTaskModel = Omit<DomainTask, "id" | "todoListId" | "order" | "addedDate">

//взять выборочно из DomainTask
export type Model = Pick<DomainTask, "description" | "title" | "status">


