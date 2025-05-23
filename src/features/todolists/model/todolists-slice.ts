import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {nanoid} from "@reduxjs/toolkit/react";
import type {Todolist} from "@/features/todolists/api/todolistsApi.types";
import {todolistsApi} from "@/features/todolists/api/todolistsApi";



export const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as DomainTodolist[],
  reducers: (create) => {
    return {
      changeTodolistFilterAC: create.reducer<{
        todolistId: string,
        filter: FilterValuesType
      }>((state, action) => {
        const el = state.find(e => e.id === action.payload.todolistId)
        if (el) el.filter = action.payload.filter
      }),
    }
  },
  extraReducers: builder => {
    builder
        .addCase(fetchTodolistsTC.fulfilled, (_state, action)=> {
          return action.payload.todolists.map(tl => ({...tl, filter: 'All'}))
        })
        .addCase(fetchTodolistsTC.rejected, (_state, _action)=> {
          alert('error')
        })
        .addCase(changeTodolistTitleTC.fulfilled, (state, action)=> {
          const i = state.findIndex(e => e.id === action.payload.todolistId)
          if (i !== -1) state[i].title = action.payload.title
        })
        .addCase(createTodolistTC.fulfilled, (state, action)=> {
          state.unshift({
            id: action.payload.todolistId,
            title: action.payload.title,
            filter: 'All',
            addedDate: '',
            order: 1
          })
        })
        .addCase(deleteTodolistTC.fulfilled, (state, action)=> {
          const i = state.findIndex(e => e.id === action.payload.todolistId)
          if (i !== -1) state.splice(i, 1)
        })
  },
  selectors: {
    selectTodolists: (state) => state
  },

})


// export const fetchTodolistsTC = createAsyncThunk(`${todolistsSlice.name}/fetchTodolists`, (_arg, {dispatch}) => {
//   todolistsApi.getTodolists()
//       .then((res)=> {
//         dispatch(fetchTodolistAC({todolists: res.data}))
//       })
// })

export const fetchTodolistsTC = createAsyncThunk(`${todolistsSlice.name}/fetchTodolistsTC`,
    async (_arg, {  rejectWithValue}) => {
  try {
    const res = await todolistsApi.getTodolists()
    return {todolists: res.data}
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const changeTodolistTitleTC = createAsyncThunk(`${todolistsSlice.name}/changeTodolistTitleTC`, async ({todolistId, title}: {todolistId: string, title:string}, {
  rejectWithValue
}) => {
  try {
    await todolistsApi.changeTodolistTitle({todolistId, title})
    return {todolistId, title}
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const createTodolistTC = createAsyncThunk(`${todolistsSlice.name}/createTodolistTC`, async (arg: {title: string},thunkAPI)=> {
  try {
    await todolistsApi.createTodolist(arg.title)
    return {title: arg.title, todolistId: nanoid()}
  } catch (e) {
    return thunkAPI.rejectWithValue(e)
  }
})

export const deleteTodolistTC = createAsyncThunk('${todolistsSlice.name}/deleteTodolistTC', async ({todolistId}:{todolistId:string}, thunkAPI) => {
  try {
    await todolistsApi.deleteTodolist(todolistId)
    return {todolistId}
  } catch (e) {
    return thunkAPI.rejectWithValue(e)
  }
})


export const todolistsReducer = todolistsSlice.reducer
export const {
  changeTodolistFilterAC,
} = todolistsSlice.actions
export const {selectTodolists} = todolistsSlice.selectors

export type FilterValuesType = "All" | "Active" | "Completed"

export type DomainTodolist = Todolist & { filter: FilterValuesType }