import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import {MenuButton} from "@/common/components/MenuButton/MenuButton.tsx";
import Switch from "@mui/material/Switch";
import AppBar from "@mui/material/AppBar";
import {useTheme} from "@mui/material/styles";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {changeThemeModeAC} from "@/app/app-reducer.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectorThemeMode} from "@/app/app-selectors.ts";

export const Header = () => {
    const themeMode = useAppSelector(selectorThemeMode)
    const theme = useTheme();
    const dispatch = useAppDispatch()

    const changeThemeModeHandler = () => dispatch(changeThemeModeAC({themeMode: themeMode === "light"? "dark" : "light"}))

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Container sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Box>
                        <MenuButton background={theme.palette.secondary.dark}>Sign in</MenuButton>
                        <MenuButton>Sign up</MenuButton>
                        <MenuButton>Faq</MenuButton>
                        <Switch onChange={changeThemeModeHandler}/>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    );
};