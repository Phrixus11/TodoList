type ButtonProps = {
    title: string
    onClickHandler?: () => void
    isDisabled?: boolean
}

export const Button = ({title, onClickHandler, isDisabled  }: ButtonProps) => {
    return (
        <button onClick={onClickHandler} disabled={isDisabled}>{title}</button>
    );
};
