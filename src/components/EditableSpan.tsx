import {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    classes?: string
    changeTitleHandler: (title: string)=>void

};
export const EditableSpan = ({title, classes, changeTitleHandler}: EditableSpanPropsType) => {
    const [titleInput, setTitleInput] = useState(title);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const onEditMode = () => {
        setIsEditMode(true);
    }
    const offEditMode = () => {
        if (titleInput.trim() !== "") {
            setIsEditMode(false);
            changeTitleHandler(titleInput)
        }

    }
    const setTitleInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.currentTarget.value);
    }
    return (
        isEditMode
            ? <input onBlur={offEditMode} value={titleInput} type="text" autoFocus onChange={setTitleInputHandler}/>
            : <span className={classes} onDoubleClick={onEditMode}>{title}</span>
    )
};