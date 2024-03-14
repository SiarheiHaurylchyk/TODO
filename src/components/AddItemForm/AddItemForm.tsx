import React, {ChangeEvent, useCallback, useState} from "react";
import {Button, TextField} from "@mui/material";
import {RequestStatusType} from "../../state/AppReduser";


type addItemFromPropsType = {
    addItem: (text: string) => void,
    disabled?:RequestStatusType
}
export const AddItemForm = React.memo(({addItem,disabled}:addItemFromPropsType) => {
    console.log("AddItemForm")
    const [newTask, setNewTask] = useState("");
    const [error, setError] = useState(false);


    let isAddTaskButtonDisabled = !newTask.trim();

    const addNewTask=(newTask: string)=> {
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


    const labelChangeError = error?"Error!!!":"Enter Text"

    return (
        <div>
            <TextField label={labelChangeError}
                       variant={"outlined"}
                       size={"small"}
                       error={error}
                       onChange={onChangeHandler}
                       value={newTask}
                       onKeyDown={handlePress}
                       disabled={disabled==="loading"}
            />
            <Button disabled={isAddTaskButtonDisabled||disabled==="loading"} variant={"contained"} sx={{minHeight:"40px"}} onClick={() => addNewTask(newTask)}>+</Button>

        </div>
    )
})