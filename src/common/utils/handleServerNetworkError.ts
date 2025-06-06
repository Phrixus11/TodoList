import {changeAppStatusAC, setErrorAC} from "@/app/app-slice";
import type {Dispatch} from "@reduxjs/toolkit";
import {isAxiosError} from "axios";

export const handleServerNetworkError = (dispatch: Dispatch, e: unknown) => {
  if (isAxiosError(e)) {
    dispatch(setErrorAC({error: e.response?.data?.message || e.message}))
  } else if (e instanceof Error) {
    dispatch(setErrorAC({error: `Native error: ${e.message}`}))
  } else {
    dispatch(setErrorAC({error:JSON.stringify(e)}))
  }

  dispatch(changeAppStatusAC({status: 'failed'}))
}