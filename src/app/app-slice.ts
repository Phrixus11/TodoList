import {createSlice} from "@reduxjs/toolkit";


export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: 'light' as ThemeMode,
  },
  reducers: (create) => {
    return {
      // reducer + action
      changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
        state.themeMode = action.payload.themeMode
      }),
    }
  },
  selectors: {
    selectorThemeMode: (state) => state.themeMode
  }
})

export const appReducer = appSlice.reducer
export const {changeThemeModeAC} = appSlice.actions
export const {selectorThemeMode} = appSlice.selectors

export type ThemeMode = 'dark' | 'light'

// export const changeThemeModeAC = createAction<{ themeMode: ThemeMode }>('app/changeThemeMode')
//
// export const appReducer = createReducer(initialState, builder => {
//     builder
//         .addCase(changeThemeModeAC, (state, action) => {
//             state.themeMode = action.payload.themeMode
//         })
// })


