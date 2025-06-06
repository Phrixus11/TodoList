import {createTheme} from "@mui/material/styles";
import type {ThemeMode} from "@/app/app-slice.ts";

export const getTheme = (themeMode: ThemeMode) => createTheme({
    palette: {
        primary: {
            main: "#20a399"
        },
        // secondary: purple,
        mode: themeMode,
    },
})
