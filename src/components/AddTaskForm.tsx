import {Button} from "./Button.tsx";
import {useState, KeyboardEvent, ChangeEvent} from "react";


type AddTaskFormProps = {
    createTasks: (title: string) => void
    maxTitleLength: number
}

export const AddTaskForm = ({createTasks, maxTitleLength}: AddTaskFormProps) => {
    const [taskInput, setTaskInput] = useState("");
    const [error, setError] = useState(false);



    const createTaskHandler = () => {
        if (taskInput.trim() !== "") {
            createTasks(taskInput.trim())
            setTaskInput("")
        } else {
            setError(true)
        }
    }
    const setTaskInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskInput(e.currentTarget.value)

    }
    const onKeyDownTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isAddButtonDisabled) {
            createTaskHandler()
        }
    }

    const isAddButtonDisabled = !taskInput || taskInput.length > maxTitleLength

    return (
        <div>
            <input placeholder={`max ${maxTitleLength} symbols`}
                   value={taskInput}
                   onChange={setTaskInputHandler}
                   onKeyDown={onKeyDownTaskHandler}
            className={error?"error":""}/>

            <Button isDisabled={isAddButtonDisabled}
                    onClickHandler={createTaskHandler}
                    title={'+'}/>
            {taskInput.length > maxTitleLength && <div style={{color: "red"}}>max {maxTitleLength} symbols</div>}
            {error && <div style={{color: "red"}}>enter valid title</div>}
        </div>
    );
};
