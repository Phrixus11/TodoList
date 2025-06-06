import {useState, KeyboardEvent, ChangeEvent} from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type AddItemFormProps = {
  createItems: (title: string) => void
  maxTitleLength: number
  disabled?: boolean
}

export const AddItemForm = ({createItems, maxTitleLength, disabled = false}: AddItemFormProps) => {
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

  const isAddButtonDisabled = !itemInput || itemInput.length > maxTitleLength || disabled

  return (
      <div>
        <TextField label={`max ${maxTitleLength} symbols`}
                   value={itemInput}
                   onChange={setItemInputHandler}
                   onKeyDown={onKeyDownItemHandler}
                   variant={"outlined"}
                   size={"small"}
                   error={error || itemInput.length > maxTitleLength}
                   helperText={error || itemInput.length > maxTitleLength && 'enter valid title'}
        />
        <IconButton
            aria-label="add"
            disabled={isAddButtonDisabled}
            onClick={createItemHandler}
            >
          <AddCircleOutlineIcon color="primary"/>
        </IconButton>

      </div>
  );
};
