import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AUTH_TOKEN } from '@/common/constants'
import { handleError } from '@/common/utils/handleError'
import { baseQueryWithZodValidation } from '@/common/utils'

export const baseApi = createApi({
  // `reducerPath` - имя `slice`, куда будут сохранены состояние и экшены для этого `API`
  reducerPath: 'todolistsApi',
  tagTypes: ['Todolist', 'Task'],
  // `baseQuery` - конфигурация для `HTTP-клиента`, который будет использоваться для отправки запросов
  baseQuery: baseQueryWithZodValidation(async (args, api, extraOptions) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000))

    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      credentials: 'include',
      prepareHeaders: (headers) => {
        headers.set('API-KEY', import.meta.env.VITE_API_KEY)
        headers.set('Authorization', `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
      },
    })(args, api, extraOptions)

    // if (result.error) {
    //   if (result.error.status === 'FETCH_ERROR'
    //       || result.error.status === 'TIMEOUT_ERROR'
    //       || result.error.status === 'CUSTOM_ERROR') {
    //     api.dispatch(setErrorAC({error: result.error.error}))
    //   }
    //   if (result.error.status === 'PARSING_ERROR') {
    //     api.dispatch(setErrorAC({error: 'ошибка парсинга, свяжитесь с поддержкой'}))
    //   }
    //   if (result.error.status === 403) {
    //     api.dispatch(setErrorAC({error: '403 Forbidden Error. Check API-KEY'}))
    //   }
    //   if (result.error.status === 400 || result.error.status === 500) {
    //     // 1 вариант, как обмануть TS , опасно, может привести к ошибкам
    //     // api.dispatch(setErrorAC({error: (result.error.data as {message: string}).message}))
    //
    //     // 2вариант JSON.stringify
    //     // api.dispatch(setErrorAC({error: JSON.stringify(result.error.data || 'Some error occurred') }))
    //
    //     // 3 вариант. Type Predicate
    //     if (isErrorWithMessage(result.error.data)) {
    //       api.dispatch(setErrorAC({error: result.error.data.message}))
    //     } else {
    //         api.dispatch(setErrorAC({ error: JSON.stringify(result.error.data) }))
    //       }
    //   }
    // }

    handleError(api, result)

    return result
  }),
  // baseQuery: fetchBaseQuery({
  //       baseUrl: import.meta.env.VITE_BASE_URL,
  //       prepareHeaders: (headers) => {
  //         headers.set("API-KEY", import.meta.env.VITE_API_KEY)
  //         headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
  //       },
  //     }),
  endpoints: () => ({}),

  // установка времени жизни кэша, можно устанавливать на каждый запрос отдельно
  // keepUnusedDataFor: 5
  // глобальный перезапрос данных при возврате фокуса в приложении, отправляет повторно все запросы, можно оформить локально через хуки
  // refetchOnFocus: true,
  // аналогично, только при потере и возврате интернет соединения
  // refetchOnReconnect: true,
})
