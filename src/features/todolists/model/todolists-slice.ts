import type {Todolist} from '@/features/todolists/api/todolistsApi.types'
import {todolistsApi} from '@/features/todolists/api/todolistsApi'
import {createAppSlice} from '@/common/utils'
import {changeAppStatusAC} from '@/app/app-slice'
import type {RequestStatus} from "@/common/types";
import {ResultCode} from "@/common/Enums";
import {handleServerNetworkError} from "@/common/utils/";
import {handleServerAppError} from "@/common/utils/handleServerAppError";
import {todolistSchema} from "@/features/todolists/lib/schemas";

export const todolistsSlice = createAppSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  reducers: (create) => {
    return {
      // thunk creator
      createTodolistTC: create.asyncThunk(
          async (arg: { title: string }, thunkAPI) => {
            try {
              thunkAPI.dispatch(changeAppStatusAC({status: 'loading'}))
              const res = await todolistsApi.createTodolist(arg.title)
                //------- обработка ошибки
              if (res.data.resultCode === ResultCode.Success) {
                thunkAPI.dispatch(changeAppStatusAC({status: 'succeeded'}))
                return {todolist: res.data.data.item}
              } else {
                handleServerAppError(thunkAPI.dispatch, res.data)
                return thunkAPI.rejectWithValue(null)
              }
              //обработка ошибки  -------
            } catch (e) {
              handleServerNetworkError(thunkAPI.dispatch, e)
              return thunkAPI.rejectWithValue(e)
            }
          },
          {
            fulfilled: (state, action) => {
              state.unshift({...action.payload.todolist, filter: 'All', entityStatus: 'idle'})
            },
          },
      ),
      deleteTodolistTC: create.asyncThunk(async ({todolistId}: { todolistId: string }, thunkAPI) => {
        try {
          thunkAPI.dispatch(changeAppStatusAC({status: 'loading'}))
          thunkAPI.dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus: 'loading'}))
          const res = await todolistsApi.deleteTodolist(todolistId)

          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(changeAppStatusAC({status: 'succeeded'}))
            return {todolistId}
          } else {
            handleServerAppError(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue(null)
          }

        } catch (e) {
          handleServerNetworkError(thunkAPI.dispatch, e)
          thunkAPI.dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus: 'failed'}))
          return thunkAPI.rejectWithValue(e)
        }
      }, {
        fulfilled: (state, action) => {
          const i = state.findIndex((e) => e.id === action.payload.todolistId)
          if (i !== -1) state.splice(i, 1)
        }
      }),

      changeTodolistTitleTC: create.asyncThunk(async ({todolistId, title}: {
            todolistId: string,
            title: string
          }, thunkAPI) => {
            try {
              thunkAPI.dispatch(changeAppStatusAC({status: 'loading'}))
              const res = await todolistsApi.changeTodolistTitle({todolistId, title})

              if (res.data.resultCode === ResultCode.Success) {
                thunkAPI.dispatch(changeAppStatusAC({status: 'succeeded'}))
                return {todolistId, title}
              } else {
                handleServerAppError(thunkAPI.dispatch, res.data)
                return thunkAPI.rejectWithValue(null)
              }

            } catch (e) {
              handleServerNetworkError(thunkAPI.dispatch, e)
              return thunkAPI.rejectWithValue(e)
            }
          },
          {
            fulfilled: (state, action) => {
              const i = state.findIndex((e) => e.id === action.payload.todolistId)
              if (i !== -1) state[i].title = action.payload.title
            }
          }
      ),

      fetchTodolistsTC: create.asyncThunk(
          async (_arg, {dispatch, rejectWithValue}) => {
            try {
              dispatch(changeAppStatusAC({status: 'loading'}))
              const res = await todolistsApi.getTodolists()
              // проверка респонса с помощью zod
              todolistSchema.array().parse(res.data)
              dispatch(changeAppStatusAC({status: 'succeeded'}))
              return {todolists: res.data}
            } catch (e) {
              handleServerNetworkError(dispatch, e)
              return rejectWithValue(e)
            }
          },
          {
            fulfilled: (_state, action) => {
              return action.payload.todolists.map((tl) => ({...tl, filter: 'All', entityStatus: 'idle'}))
            },
          },
      ),

      // action creator
      changeTodolistFilterAC: create.reducer<{
        todolistId: string
        filter: FilterValuesType
      }>((state, action) => {
        const el = state.find((e) => e.id === action.payload.todolistId)
        if (el) el.filter = action.payload.filter
      }),
      changeTodolistEntityStatusAC: create.reducer<{
        todolistId: string
        entityStatus: RequestStatus
      }>((state, action) => {
        const el = state.find((e) => e.id === action.payload.todolistId)
        if (el) el.entityStatus = action.payload.entityStatus
      }),
    }
  },

  selectors:
      {
        selectTodolists: (state) => state,
      }
})


export const todolistsReducer = todolistsSlice.reducer

export const {
  changeTodolistFilterAC,
  fetchTodolistsTC,
  createTodolistTC,
  deleteTodolistTC,
  changeTodolistTitleTC,
  changeTodolistEntityStatusAC
} = todolistsSlice.actions

export const {selectTodolists} = todolistsSlice.selectors

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

