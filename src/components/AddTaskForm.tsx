import {Button} from "./Button.tsx";
import {useRef} from "react";

type AddTaskFormProps = {
    createTasks: (title: string) => void
}

export const AddTaskForm = ({createTasks}: AddTaskFormProps) => {

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <input ref={inputRef}/>
            <Button onClickHandler={() => {
                if (inputRef.current) {
                    createTasks(inputRef.current.value)
                    inputRef.current.value = ""
                }
            }}
                    title={'+'}/>
        </div>
    );
};
