type ButtonProps = {
    title: string
    onClickHandler?: () => void
    isDisabled?: boolean
    className?: string
}

export const Button = ({title, onClickHandler, isDisabled, className}: ButtonProps) => {
    return (
        <button className={className} onClick={onClickHandler} disabled={isDisabled}>{title}</button>
    );
};
