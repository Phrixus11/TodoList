import {Button} from "./Button.tsx";

type TodoListTitlePropsType = {
    title: string
    deleteTodolist: () => void
}

export const TodoListTitle = ({title, deleteTodolist}: TodoListTitlePropsType) => {
    return (
        <h3>
            {title}
            <Button title={"x"} onClickHandler={deleteTodolist} ></Button>
        </h3>
    );
};

