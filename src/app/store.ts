import {configureStore} from '@reduxjs/toolkit'
import {appReducer, appSlice} from "./app-slice.ts";
import {saveState} from "@/common/utils/localStorage";
import {setupListeners} from '@reduxjs/toolkit/query/react';
import {baseApi} from "@/app/baseApi";

// создание store
export const store = configureStore({
    reducer: {
        [appSlice.name]: appReducer,
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)


store.subscribe(() => {
    saveState('store',store.getState().app.themeMode)
});


// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store