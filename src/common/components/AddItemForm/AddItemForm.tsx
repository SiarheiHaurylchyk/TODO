import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import {ChangeEvent, useState} from "react";
import {RequestStatusType} from "App/AppSlice";

type CustomizedInputBaseProps = {
    addItem: (text: string) => void,
    disabled?:RequestStatusType
}

export function AddItemForm({addItem,disabled}:CustomizedInputBaseProps) {

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



    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 280 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Enter Text"
                onChange={onChangeHandler}
                value={newTask}
            />

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
                onClick={() => addNewTask(newTask)}
                color="primary" sx={{ p: '10px' }}
                aria-label="directions"
                disabled={disabled==="loading"}
            >
                <DirectionsIcon />
            </IconButton>
        </Paper>
    );
}