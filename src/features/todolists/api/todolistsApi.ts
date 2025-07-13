import type { BaseResponse } from '@/common/types'
import type { Todolist } from './todolistsApi.types'
import { baseApi } from '@/app/baseApi'
import { DomainTodolist } from '../lib/types'

// `createApi` - функция из `RTK Query`, позволяющая создать объект `API`
// для взаимодействия с внешними `API` и управления состоянием приложения
export const todolistsApi = baseApi.injectEndpoints({
  // `endpoints` - метод, возвращающий объект с эндпоинтами для `API`, описанными
  // с помощью функций, которые будут вызываться при вызове соответствующих методов `API`
  // (например `get`, `post`, `put`, `patch`, `delete`)
  endpoints: (build) => ({
    // Типизация аргументов (<возвращаемый тип, тип query аргументов (`QueryArg`)>)
    // `query` по умолчанию создает запрос `get` и указание метода необязательно
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => 'todo-lists',
      transformResponse: (todolists: Todolist[]): DomainTodolist[] => {
        return todolists.map((todolist) => ({ ...todolist, filter: 'All', entityStatus: 'idle' }))
      },
      providesTags: ['Todolist'],
    }),
    createTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => {
        return {
          method: 'post',
          url: '/todo-lists',
          body: { title },
        }
      },
      invalidatesTags: ['Todolist'],
    }),
    deleteTodolist: build.mutation<BaseResponse, string>({
      async onQueryStarted(id: string, { dispatch, queryFulfilled, getState }) {
        const patchResult = dispatch(
          todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
            const index = state.findIndex((todolist) => todolist.id === id)
            if (index !== -1) {
              state.splice(index, 1)
            }
          }),
        )
        try {
          await queryFulfilled
        } catch {
          const state = getState()
          const res = todolistsApi.endpoints.getTodolists.select()(state)
          const isExist = res.data?.some((tl) => tl.id === id)
          if (!isExist) patchResult.undo()
        }
      },
      query: (id) => {
        return {
          method: 'delete',
          url: `/todo-lists/${id}`,
        }
      },
      invalidatesTags: ['Todolist'],
    }),
    changeTodolistTitle: build.mutation<BaseResponse, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => {
        return {
          method: 'put',
          url: `/todo-lists/${todolistId}`,
          body: { title },
        }
      },
      invalidatesTags: ['Todolist'],
    }),
  }),
})

// `createApi` создает объект `API`, который содержит все эндпоинты в виде хуков,
// определенные в свойстве `endpoints`
export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation,
} = todolistsApi