import { instance } from "@/common/instance"
import type { DomainTask, GetTasksResponse, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types"
import type { BaseResponse } from "@/common/types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask({ todolistId, title }: { todolistId: string; title: string }) {
    return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask({ taskId, todolistId }: { taskId: string; todolistId: string }) {
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask({ taskId, todolistId, model }: { taskId: string; model: UpdateTaskModel; todolistId: string }) {
    return instance.put<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}
