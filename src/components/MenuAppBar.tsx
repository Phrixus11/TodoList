import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import {MenuButton} from "./MenuButton.tsx";
import Switch from "@mui/material/Switch";
import AppBar from "@mui/material/AppBar";
import {useTheme} from "@mui/material/styles";

type ButtonAppBarPropsType = {
    setIsDarkMode: () => void;

};
export const MenuAppBar = ({setIsDarkMode}: ButtonAppBarPropsType) => {
    const theme = useTheme();
    return (
        <>
            <Box sx={{marginBottom: "60px"}}>
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
                                <Switch onChange={setIsDarkMode}/>
                            </Box>
                        </Container>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
};