import { SyntheticEvent } from 'react'
import Alert from '@mui/material/Alert'
import Snackbar, {type SnackbarCloseReason} from '@mui/material/Snackbar'
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {selectError, setErrorAC} from "@/app/app-slice";
import { useAppDispatch } from '@/common/hooks/useAppDispatch';

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectError)
  const dispatch = useAppDispatch()

  const handleClose = (_: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') return
    dispatch(setErrorAC({error: null}))
  }

  return (
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
  )
}