import React, {ChangeEvent, useState} from "react";
import {Button, TextField} from "@mui/material";


type addItemFromPropsType = {
    addItem: (text: string) => void,

}
export const AddItemForm: React.FC<addItemFromPropsType> = React.memo(({addItem}) => {
    console.log("AddItemForm")

    const [newTask, setNewTask] = useState("");
    const [error, setError] = useState(false);



    let isAddTaskButtonDisabled = !newTask.trim();

    function addNewTask(newTask: string) {
        if (newTask.trim() !== "") {
            addItem(newTask);
            setNewTask("");
        } else {
            setError(true);
        }
    }

    const handlePress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewTask(newTask);
            setNewTask("");
        }
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        error && setError(false)
        setNewTask(e.currentTarget.value)
    }

    return (
        <>
            <TextField label={error?"Error!!!":"Enter Text"}
                       variant={"outlined"}
                       size={"small"}
                       helperText={error}
                       error={error}
                       onChange={onChangeHandler}
                       value={newTask}
                       onKeyDown={handlePress}
            />
            <Button disabled={isAddTaskButtonDisabled} variant={"contained"} sx={{minHeight:"40px"}} onClick={() => addNewTask(newTask)}>+</Button>

        </>
    )
})