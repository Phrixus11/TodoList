type ButtonProps = {
    title: string
    changeTodolistFilter?: () => void
}

export const Button = ({title, changeTodolistFilter}: ButtonProps) => {
    return (
        <button onClick={changeTodolistFilter}>{title}</button>
    );
};
