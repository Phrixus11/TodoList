import {changeAppStatusAC, setErrorAC} from '@/app/app-slice'
import type {BaseResponse} from '@/common/types'
import type {Dispatch} from '@reduxjs/toolkit'

export const handleServerAppError = <T>(dispatch: Dispatch, data: BaseResponse<T>) => {

  dispatch(setErrorAC({error: data.messages.length ? data.messages[0] : 'some error'}))
  dispatch(changeAppStatusAC({status: 'failed'}))
}