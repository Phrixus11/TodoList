import './App.css'
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {useAppSelector} from '@/common/hooks/useAppSelector';

import {getTheme} from "@/common/theme/theme";
import {Header} from "@/common/components/Header/Header.tsx";
import Box from '@mui/material/Box';
import {Main} from "@/app/Main.tsx";
import {selectThemeMode} from "@/app/app-slice";


export const App = () => {

  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

// <CssBaseline/>  - комппонент, скидывающий базовые стили CSS
  return (
      <div className="app">
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Box sx={{marginBottom: "60px"}}>
            <Header/>
          </Box>
          <Main/>
        </ThemeProvider>
      </div>
  )
}