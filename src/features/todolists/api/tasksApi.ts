import { instance } from "@/common/instance"
import type { DomainTask, GetTasksResponse, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types"
import type { BaseResponse } from "@/common/types"
import {baseApi} from "@/app/baseApi";

export const _tasksApi = {
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

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
      providesTags: ['Task']
    }),
    createTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({todolistId, title}) => ({method: 'post', url: `/todo-lists/${todolistId}/tasks`, body: {title}}),
      invalidatesTags: ['Task']
    }),
    deleteTask: build.mutation<BaseResponse, { taskId: string; todolistId: string }>({
      query: ({ taskId, todolistId }) => ({method: 'delete', url: `/todo-lists/${todolistId}/tasks/${taskId}`}),
      invalidatesTags: ['Task']
    }),
    updateTask: build.mutation<BaseResponse<{ item: DomainTask }>, { taskId: string, model: UpdateTaskModel, todolistId: string }>({
      query: ({ taskId, todolistId, model }) => ({method: 'put', url: `/todo-lists/${todolistId}/tasks/${taskId}`, body: {...model}}),
      invalidatesTags: ['Task']
    }),


  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi