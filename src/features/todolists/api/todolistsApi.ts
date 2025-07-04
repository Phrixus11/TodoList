import type {BaseResponse} from "@/common/types"
import type {Todolist} from "./todolistsApi.types"
import {baseApi} from "@/app/baseApi";
import {instance} from "@/common/instance";
import { DomainTodolist } from "../lib/types";


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
      query: () => "todo-lists",
      transformResponse: (todolists: Todolist[]): DomainTodolist[] => {
        return todolists.map((todolist) => ({...todolist, filter: "All", entityStatus: "idle"}))
      },
      providesTags: ['Todolist']
    }),
    createTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => {
        return {
          method: 'post',
          url: "/todo-lists",
          body: {title}
        }
      },
      invalidatesTags: ['Todolist']
    }),
    deleteTodolist: build.mutation<BaseResponse, string>({
      query: (id) => {
        return {
          method: 'delete',
          url: `/todo-lists/${id}`,
        }
      },
      invalidatesTags: ['Todolist']
    }),
    changeTodolistTitle: build.mutation<BaseResponse, { todolistId: string; title: string }>({
      query: ({todolistId,title}) => {
        return {
          method: 'put',
          url: `/todo-lists/${todolistId}`,
          body: {title},
        }
      },
      invalidatesTags: ['Todolist']
    }),
  }),
})

// `createApi` создает объект `API`, который содержит все эндпоинты в виде хуков,
// определенные в свойстве `endpoints`
export const {useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation} = todolistsApi





export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("/todo-lists")
  },
  changeTodolistTitle(payload: { todolistId: string; title: string }) {
    const {todolistId, title} = payload
    return instance.put<BaseResponse>(`/todo-lists/${todolistId}`, {title})
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", {title})
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
}