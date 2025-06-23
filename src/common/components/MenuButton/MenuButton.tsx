import { styled } from '@mui/material/styles'
import Button, { ButtonProps } from '@mui/material/Button'

type Props = {
    background?: string
}

type MenuButtonProps = ButtonProps & Props

export const MenuButton = styled(Button)<MenuButtonProps>(({background, theme})=>({
    minWidth: '110px',
    fontWeight: 'bold',
    boxShadow: `0 0 0 2px ${theme.palette.primary.light}, 4px 4px 0 0 ${theme.palette.primary.light}`,
    borderRadius: '2px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: theme.palette.primary.contrastText,
    background: background || theme.palette.primary.dark,
    '&:hover': {
        backgroundColor:  '#ffffff',
        color: '#000000',
    }

}))