import {SxProps} from "@mui/material";

// export const stylesListItem: SxProps = {justifyContent: 'space-between', }

export const getListItemSx = (isDone: boolean): SxProps => ({
    p: 0,
    fontWeight: isDone ? 'normal' : 'bold',
    justifyContent: 'space-between',
    textDecoration: isDone ? 'line-through' : 'none',
    opacity: isDone ? 0.5 : 1,
})

