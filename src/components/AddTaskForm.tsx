import {Button} from "./Button.tsx";
import {useState, KeyboardEvent, ChangeEvent} from "react";


type AddTaskFormProps = {
    createTasks: (title: string) => void
}

export const AddTaskForm = ({createTasks}: AddTaskFormProps) => {
    const [taskInput, setTaskInput] = useState("");
    const createTaskHandler = () => {
        if (taskInput) {
            createTasks(taskInput)
            setTaskInput("")
        }
    }
    const setTaskInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskInput(e.currentTarget.value)
    }
    const onKeyDownTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isAddButtonDisabled) {
            createTaskHandler()
        }
    }

    const isAddButtonDisabled = !taskInput || taskInput.length > 10

    return (
        <div>
            <input placeholder={"max 10 symbols"}
                   value={taskInput}
                   onChange={setTaskInputHandler}
                   onKeyDown={onKeyDownTaskHandler}/>

            <Button isDisabled={isAddButtonDisabled}
                    onClickHandler={createTaskHandler}
                    title={'+'}/>
            {taskInput.length > 10 && <div style={{color: "red"}}>max 10 symbols</div>}
        </div>
    );
};
