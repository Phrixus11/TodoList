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
import {changeThemeModeAC, selectStatus, selectThemeMode} from "@/app/app-slice.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import LinearProgress from '@mui/material/LinearProgress'
import {useEffect} from "react";
import {loadState, saveState} from "@/common/utils/localStorage";
import {logoutTC, selectIsLoggedIn} from "@/features/auth/model/auth-slice";
import {NavLink} from "react-router";
import {Path} from "@/common/routing/Routing";


export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const theme = useTheme();


  useEffect(() => {
    dispatch(changeThemeModeAC({themeMode: loadState('themeMode')}))
  }, [])

  const changeThemeModeHandler = () => {
    dispatch(changeThemeModeAC({themeMode: themeMode === "light" ? "dark" : "light"}))
    saveState('themeMode', themeMode === "light" ? "dark" : "light")
  }

  const logoutHandler = () => {
    dispatch(logoutTC())
  }


  return (
      <AppBar position="fixed">
        <Toolbar>
          <Container sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <IconButton color="inherit">
              <MenuIcon/>
            </IconButton>
            <Box>
              {isLoggedIn && <MenuButton
                  onClick={logoutHandler}
                  background={theme.palette.secondary.dark}>Log out</MenuButton>}

              <MenuButton size={'large'}
                          background={theme.palette.secondary.dark}>
                <NavLink to={Path.Faq}
                         style={{
                           color: 'inherit',
                           textDecoration: 'none'
                         }}>FAQ</NavLink>
              </MenuButton>
              <Switch onChange={changeThemeModeHandler} checked={themeMode === 'dark'}/>
            </Box>
          </Container>
        </Toolbar>
        {status === 'loading' && <LinearProgress/>}
      </AppBar>
  );
};