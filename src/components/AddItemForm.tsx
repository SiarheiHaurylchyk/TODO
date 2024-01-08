import React, {ChangeEvent, useState} from "react";
import Button from "./Button";


type addItemFromPropsType = {
    addItem: (text: string) => void,

}
export const AddItemForm: React.FC<addItemFromPropsType> = ({addItem}) => {
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
        <div>
            <input onChange={onChangeHandler} value={newTask} onKeyDown={handlePress} className={error ? "error" : ""}/>
            <Button isDisabled={isAddTaskButtonDisabled} onClick={() => addNewTask(newTask)}>+</Button>
            {error && <div style={{color: "red"}}>Error: Title is required</div>}
        </div>
    )
}