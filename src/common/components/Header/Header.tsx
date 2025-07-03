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
import {changeThemeModeAC, selectIsLoggedIn, selectStatus, selectThemeMode, setIsLoggedIn} from "@/app/app-slice.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import LinearProgress from '@mui/material/LinearProgress'
import {useEffect} from "react";
import {loadState, saveState} from "@/common/utils/localStorage";
import {NavLink} from "react-router";
import {Path} from "@/common/routing/Routing";
import {ResultCode} from "@/common/Enums";
import {AUTH_TOKEN} from "@/common/constants";
import {useLogoutMutation} from "@/features/auth/api/authApi";
import {baseApi} from "@/app/baseApi";

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const theme = useTheme();
const [logoutMutation] = useLogoutMutation()

  useEffect(() => {
    dispatch(changeThemeModeAC({themeMode: loadState('themeMode')}))
  }, [])

  const changeThemeModeHandler = () => {
    dispatch(changeThemeModeAC({themeMode: themeMode === "light" ? "dark" : "light"}))
    saveState('themeMode', themeMode === "light" ? "dark" : "light")
  }

  const logoutHandler = () => {
    logoutMutation().then((res) => {
      if (res?.data?.resultCode === ResultCode.Success) {
        localStorage.removeItem(AUTH_TOKEN)
        dispatch(setIsLoggedIn({isLoggedIn: false}))

      }
    }).then(() => {
      // dispatch(baseApi.util.resetApiState()) // зачистка всего кэша RTK Query, минус, что этот запрос реализован как перезагрузка всего приложения и все запросы из App летят заного
      // dispatch(todolistsApi.util.invalidateTags(['Todolist'])) // зачистка только кэша с Тудулистами
      dispatch(baseApi.util.invalidateTags(['Todolist', 'Task'])) // зачистка кэша с Тудулистами и Тасками
    })

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
              <NavLink to={'/'}>MAIN</NavLink>
              <Switch onChange={changeThemeModeHandler} checked={themeMode === 'dark'}/>
            </Box>
          </Container>
        </Toolbar>
        {status === 'loading' && <LinearProgress/>}
      </AppBar>
  );
};