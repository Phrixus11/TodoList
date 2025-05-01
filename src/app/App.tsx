import './App.css'
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {useAppSelector} from '../common/hooks/useAppSelector.ts';
import {selectorThemeMode} from "./app-selectors.ts";
import {getTheme} from "../common/theme/theme.ts";
import {Header} from "@/common/components/Header/Header.tsx";
import Box from '@mui/material/Box';
import {Main} from "@/app/Main.tsx";


export const App = () => {

    const themeMode = useAppSelector(selectorThemeMode)
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