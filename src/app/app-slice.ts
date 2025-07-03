import {createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import type {RequestStatus} from "@/common/types";
import {todolistsApi} from "@/features/todolists/api/todolistsApi";
import {tasksApi} from "@/features/todolists/api/tasksApi";


export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: 'light' as ThemeMode,
    status: 'idle' as RequestStatus,
    error: null as null | string,
    isLoggedIn: false,
  },
  reducers: (create) => {
    return {
      setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      }),
      // reducer + action
      changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
        state.themeMode = action.payload.themeMode
      }),
      changeAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
        state.status = action.payload.status
      }),
      setErrorAC: create.reducer<{ error: null | string }>((state, action) => {
        state.error = action.payload.error
      })
    }
  },
  extraReducers: (builder) => {
    builder
        .addMatcher(
            // (action) => {
            //   return action.type.endsWith('/pending')
            // } // можно использовать утилитную функцию RTK Query
            isPending, (state, action) => {
              if (todolistsApi.endpoints.getTodolists.matchPending(action)
                  || tasksApi.endpoints.getTasks.matchPending(action)) {
                return
              }
              state.status = "loading"
            })
        .addMatcher(isRejected, (state) => {
          state.status = 'failed'
        })
        .addMatcher(isFulfilled, (state) => {
          state.status = 'succeeded'
        })
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  }
})

export const appReducer = appSlice.reducer
export const {changeThemeModeAC, changeAppStatusAC, setErrorAC, setIsLoggedIn} = appSlice.actions
export const {selectThemeMode, selectStatus, selectError, selectIsLoggedIn} = appSlice.selectors

export type ThemeMode = 'dark' | 'light'

