import {Button} from "./Button.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type TodoListTitlePropsType = {
    title: string
    deleteTodolist: () => void
    changeTitle: (newTitle: string) => void
}

export const TodoListTitle = ({title, deleteTodolist, changeTitle}: TodoListTitlePropsType) => {
    return (
        <h3>
            <EditableSpan title={title} changeTitleHandler={changeTitle}/>

            <Button title={"x"} onClickHandler={deleteTodolist}></Button>
        </h3>
    );
};

