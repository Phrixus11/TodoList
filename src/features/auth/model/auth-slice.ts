import type {loginInputs} from "@/features/auth/lib/schemas";
import {createAppSlice, handleServerAppError, handleServerNetworkError} from "@/common/utils";
import {changeAppStatusAC} from "@/app/app-slice";
import {authApi} from "@/features/auth/api/authApi";
import {ResultCode} from "@/common/Enums";
import { AUTH_TOKEN } from '@/common/constants'

export const authSlice = createAppSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn
  },
  reducers: create => ({
    loginTC: create.asyncThunk(
        async (data: loginInputs, {dispatch, rejectWithValue}) => {
          try {
            dispatch(changeAppStatusAC({status: 'loading'}))
            const res = await authApi.login(data)
            if (res.data.resultCode === ResultCode.Success) {
              localStorage.setItem(AUTH_TOKEN, res.data.data.token);
              dispatch(changeAppStatusAC({status: 'succeeded'}))
              return {isLoggedIn: true}
            } else {
              handleServerAppError(dispatch, res.data)
              return rejectWithValue(null)
            }

          } catch (e) {
            handleServerNetworkError(dispatch, e)
            return rejectWithValue(e)
          }
        },
        {
          fulfilled: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
          },
        }
    ),
    //
    logoutTC: create.asyncThunk(
        async (_, { dispatch, rejectWithValue }) => {
          try {
            dispatch(changeAppStatusAC({ status: 'loading' }))
            const res = await authApi.logout()
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(changeAppStatusAC({ status: 'succeeded' }))
              localStorage.removeItem(AUTH_TOKEN)
              return { isLoggedIn: false }
            } else {
              handleServerAppError(dispatch, res.data)
              return rejectWithValue(null)
            }
          } catch (error: any) {
            handleServerNetworkError(dispatch, error)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
          },
        }
    ),
    initializeAppTC: create.asyncThunk(
        async (_, { dispatch, rejectWithValue }) => {
          try {
            dispatch(changeAppStatusAC({ status: 'loading' }))
            const res = await authApi.me()
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(changeAppStatusAC({ status: 'succeeded' }))
              return { isLoggedIn: true }
            } else {
              handleServerAppError(dispatch, res.data)
              return rejectWithValue(null)
            }
          } catch (error: any) {
            handleServerNetworkError(dispatch, error)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
          },


        }
    ),
  }),
})

export const {selectIsLoggedIn} = authSlice.selectors
export const {loginTC, logoutTC, initializeAppTC} = authSlice.actions
export const authReducer = authSlice.reducer