import {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";

type EditableSpanPropsType = {
    title: string
    classes?: string
    changeTitleHandler: (title: string) => void
    maxTitleLength: number

};
export const EditableSpan = ({title, classes, changeTitleHandler, maxTitleLength}: EditableSpanPropsType) => {
    const [titleInput, setTitleInput] = useState(title);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const onEditMode = () => {
        setIsEditMode(true);
    }
    const offEditMode = () => {
        if (titleInput.trim() !== "" && titleInput.trim().length <= maxTitleLength) {
            setIsEditMode(false);
            changeTitleHandler(titleInput)
        }

    }
    const setTitleInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.currentTarget.value);
    }
    return (
        isEditMode
            ? <TextField
                onBlur={offEditMode}
                value={titleInput}
                variant="standard"
                autoFocus onChange={setTitleInputHandler}
                error={titleInput.trim().length > maxTitleLength}
                helperText={titleInput.trim().length > maxTitleLength && `max length ${maxTitleLength} symbols.`}/>
            : <span className={classes} onDoubleClick={onEditMode}>{title}</span>
    )
};