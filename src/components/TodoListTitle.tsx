import IconButton from "@mui/material/IconButton";
import {EditableSpan} from "./EditableSpan.tsx";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type TodoListTitlePropsType = {
    title: string
    deleteTodolist: () => void
    changeTitle: (newTitle: string) => void
}

export const TodoListTitle = ({title, deleteTodolist, changeTitle}: TodoListTitlePropsType) => {
    return (
        <h3>
            <EditableSpan title={title} changeTitleHandler={changeTitle}/>

            <IconButton
                aria-label="delete"
                onClick={deleteTodolist}>
                <DeleteForeverIcon color="primary" />
            </IconButton>
        </h3>
    );
};

