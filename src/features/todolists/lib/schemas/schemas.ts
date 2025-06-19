import z from "zod/v4";
import {TaskPriority, TaskStatus} from "@/features/todolists/api/tasksApi.types";

export const domainTaskSchema = z.object({
  description: z.string().nullable(),
  title: z.string(),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
  startDate: z.iso.datetime({local: true}).nullable(),
  deadline: z.string().nullable(),
  id: z.string(),
  todoListId: z.string(),
  order: z.number(),
  addedDate: z.iso.datetime({local: true}),
})

export const todolistSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.iso.datetime({local: true}),
  order: z.number(),
})

export const getTasksSchema = z.object({
  error: z.string().nullable(),
  totalCount: z.number().int().nonnegative(),
  items: domainTaskSchema.array(),
})