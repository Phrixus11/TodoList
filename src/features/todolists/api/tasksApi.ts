import type { DomainTask, GetTasksResponse, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types'
import type { BaseResponse } from '@/common/types'
import { baseApi } from '@/app/baseApi'
import { getTasksSchema } from '@/features/todolists/lib/schemas'
import { PAGE_SIZE } from '@/common/constants'

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { todolistId: string; params: { page: number } }>({
      query: ({ todolistId, params }) => {
        return { url: `/todo-lists/${todolistId}/tasks`, params: { ...params, count: PAGE_SIZE }, }
      },

      // Вариант обработки ошибки валидации Zod через transformResponse
      // transformResponse: (res:GetTasksResponse) => {
      //   try {
      //     getTasksSchema.parse(res)
      //   } catch (error) {
      //     // console.table(e)
      //     if (error instanceof z.ZodError) {
      //       console.table(error.issues)
      //     }
      //   }
      //
      //   return res
      // },

      // Вариант обработки ошибки валидации Zod через extraOptions, с помощью утилитной функции
      extraOptions: { dataSchema: getTasksSchema },
      providesTags: (_result, _error, { todolistId }) => {
        return [{ type: 'Task', id: todolistId }]
      },
      // установка времени жизни кэша
      keepUnusedDataFor: 300
    }),
    createTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({ method: 'post', url: `/todo-lists/${todolistId}/tasks`, body: { title } }),
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: 'Task', id: todolistId }],
    }),
    deleteTask: build.mutation<BaseResponse, { taskId: string; todolistId: string }>({
      query: ({ taskId, todolistId }) => ({ method: 'delete', url: `/todo-lists/${todolistId}/tasks/${taskId}` }),
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: 'Task', id: todolistId }],
    }),
    updateTask: build.mutation<
      BaseResponse<{ item: DomainTask }>,
      { taskId: string; model: UpdateTaskModel; todolistId: string }
    >({
      query: ({ taskId, todolistId, model }) => ({
        method: 'put',
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        body: { ...model },
      }),
       onQueryStarted: async ({ taskId, todolistId, model }, { dispatch, queryFulfilled, getState}) => {
         const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), 'getTasks')
         console.log(cachedArgsForQuery)
         // @ts-ignore
         const index = cachedArgsForQuery.findLastIndex((el: any) => el.todolistId === todolistId)
         console.log(cachedArgsForQuery[index].params.page)
        const patchResult = dispatch(
          tasksApi.util.updateQueryData('getTasks', { todolistId, params:{page: cachedArgsForQuery[index].params.page} }, (state) => {
            const index = state.items.findIndex((task) => task.id === taskId)
            if (index !== -1) {
              state.items[index] = {...state.items[index], ...model}
            }
          }),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: 'Task', id: todolistId }],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi
