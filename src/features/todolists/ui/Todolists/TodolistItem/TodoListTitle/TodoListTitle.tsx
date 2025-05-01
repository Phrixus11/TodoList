import IconButton from "@mui/material/IconButton";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {changeTodolistTitleAC, deleteTodolistAC, TodolistType} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type TodoListTitlePropsType = {
    todolist: TodolistType

}

export const TodoListTitle = ({todolist}: TodoListTitlePropsType) => {
    const {id, title} = todolist
    const dispatch = useAppDispatch()

    const deleteTodolistHandler = () => {
        const action = deleteTodolistAC({todolistId: id})
        dispatch(action)
    }
    const changeTodoListTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleAC({todolistId: id, title}))
    }

    return (
        <h3>
            <EditableSpan maxTitleLength={20} title={title} changeTitleHandler={changeTodoListTitleHandler}/>

            <IconButton
                aria-label="delete"
                onClick={deleteTodolistHandler}>
                <DeleteForeverIcon color="primary" />
            </IconButton>
        </h3>
    );
};

