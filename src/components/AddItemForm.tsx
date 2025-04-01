import {Button} from "./Button.tsx";
import {useState, KeyboardEvent, ChangeEvent} from "react";


type AddItemFormProps = {
    createItems: (title: string) => void
    maxTitleLength: number
}

export const AddItemForm = ({createItems, maxTitleLength}: AddItemFormProps) => {
    const [itemInput, setItemInput] = useState("");
    const [error, setError] = useState(false);


    const createItemHandler = () => {
        if (itemInput.trim() !== "") {
            createItems(itemInput.trim())
            setItemInput("")
        } else {
            setError(true)
        }
    }
    const setItemInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setItemInput(e.currentTarget.value)

    }
    const onKeyDownItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isAddButtonDisabled) {
            createItemHandler()
        }
    }

    const isAddButtonDisabled = !itemInput || itemInput.length > maxTitleLength

    return (
        <div>
            <input placeholder={`max ${maxTitleLength} symbols`}
                   value={itemInput}
                   onChange={setItemInputHandler}
                   onKeyDown={onKeyDownItemHandler}
                   className={error ? "error" : ""}/>

            <Button isDisabled={isAddButtonDisabled}
                    onClickHandler={createItemHandler}
                    title={'+'}/>

            {itemInput.length > maxTitleLength && <div style={{color: "red"}}>max {maxTitleLength} symbols</div>}
            {error && <div style={{color: "red"}}>enter valid title</div>}
        </div>
    );
};
