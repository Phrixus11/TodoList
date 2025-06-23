import s from './App.module.css'
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {useAppSelector} from '@/common/hooks/useAppSelector';
import {getTheme} from "@/common/theme/theme";
import {Header} from "@/common/components/Header/Header.tsx";
import Box from '@mui/material/Box';
import {selectThemeMode} from "@/app/app-slice";
import {ErrorSnackbar} from "@/common/components/ErrorSnackbar/ErrorSnackbar";
import {Routing} from "@/common/routing/Routing";
import {useAppDispatch} from '@/common/hooks';
import {useEffect, useState} from "react";
import {initializeAppTC} from "@/features/auth/model/auth-slice";
import CircularProgress from '@mui/material/CircularProgress'


export const App = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  useEffect(() => {
    dispatch(initializeAppTC()).finally(() => {
      setIsInitialized(true)
    })
  }, [])

  if (!isInitialized) {
    return (
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Box sx={{marginBottom: "60px"}}>
            <Header/>
          </Box>
          <div className={s.circularProgressContainer}>
            <CircularProgress size={150} thickness={3}/>
          </div>
        </ThemeProvider>
    )
  }

// <CssBaseline/>  - комппонент, скидывающий базовые стили CSS
  return (
      <div className={s.app}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Box sx={{marginBottom: "60px"}}>
            <Header/>
          </Box>
          <Routing/>
          <ErrorSnackbar/>
        </ThemeProvider>
      </div>
  )
}