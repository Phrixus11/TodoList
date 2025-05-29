import type {Todolist} from '@/features/todolists/api/todolistsApi.types'
import {todolistsApi} from '@/features/todolists/api/todolistsApi'
import {createAppSlice} from '@/common/utils'
import {changeStatesAC} from '@/app/app-slice'

export const todolistsSlice = createAppSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  reducers: (create) => {
    return {
      // thunk creator
      createTodolistTC: create.asyncThunk(
          async (arg: { title: string }, thunkAPI) => {
            try {
              thunkAPI.dispatch(changeStatesAC({status: 'loading'}))
              const res = await todolistsApi.createTodolist(arg.title)
              thunkAPI.dispatch(changeStatesAC({status: 'succeeded'}))
              return {todolist: res.data.data.item}
            } catch (e) {
              thunkAPI.dispatch(changeStatesAC({status: 'failed'}))
              return thunkAPI.rejectWithValue(e)
            }
          },
          {
            fulfilled: (state, action) => {
              state.unshift({...action.payload.todolist, filter: 'All'})
            },
          },
      ),
      deleteTodolistTC: create.asyncThunk(async ({todolistId}: { todolistId: string }, thunkAPI) => {
        try {
          thunkAPI.dispatch(changeStatesAC({status: 'loading'}))
          await todolistsApi.deleteTodolist(todolistId)
          thunkAPI.dispatch(changeStatesAC({status: 'succeeded'}))
          return {todolistId}
        } catch (e) {
          thunkAPI.dispatch(changeStatesAC({status: 'failed'}))
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
              thunkAPI.dispatch(changeStatesAC({status: 'loading'}))
              await todolistsApi.changeTodolistTitle({todolistId, title})
              thunkAPI.dispatch(changeStatesAC({status: 'succeeded'}))
              return {todolistId, title}
            } catch (e) {
              thunkAPI.dispatch(changeStatesAC({status: 'failed'}))
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
              dispatch(changeStatesAC({status: 'loading'}))
              const res = await todolistsApi.getTodolists()
              dispatch(changeStatesAC({status: 'succeeded'}))
              return {todolists: res.data}
            } catch (e) {
              dispatch(changeStatesAC({status: 'failed'}))
              return rejectWithValue(e)
            }
          },
          {
            fulfilled: (_state, action) => {
              return action.payload.todolists.map((tl) => ({...tl, filter: 'All'}))
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
  changeTodolistTitleTC
} = todolistsSlice.actions

export const {selectTodolists} = todolistsSlice.selectors

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type DomainTodolist = Todolist & { filter: FilterValuesType }
