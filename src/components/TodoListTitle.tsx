
type TodoListTitlePropsType = {
    title: string
}

export const TodoListTitle = ({title}: TodoListTitlePropsType) => {
    return (
        <h3>{title}</h3>
    );
};

