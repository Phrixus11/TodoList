import {createSlice} from "@reduxjs/toolkit";
import type {RequestStatus} from "@/common/types";


export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: 'light' as ThemeMode,
    status: 'idle' as RequestStatus,
  },
  reducers: (create) => {
    return {
      // reducer + action
      changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
        state.themeMode = action.payload.themeMode
      }),
      changeStatesAC: create.reducer<{ status: RequestStatus }>((state, action) => {
        state.status = action.payload.status
      })
    }
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status
  }
})

export const appReducer = appSlice.reducer
export const {changeThemeModeAC, changeStatesAC} = appSlice.actions
export const {selectThemeMode, selectStatus} = appSlice.selectors

export type ThemeMode = 'dark' | 'light'

