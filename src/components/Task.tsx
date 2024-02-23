import React, {useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../api/TodoListAPI";


type TaskProps = {
    onCheckHandler:(id:string,e:boolean)=>void,
    updateTasksHandler:(id:string,text:string)=>void,
    removeTask:(id: string)=>void,
    element:TaskType
}

const Task = React.memo(({onCheckHandler,updateTasksHandler,removeTask,element}:TaskProps) => {

    const updateTasksCallbackHandler = useCallback((text:string)=>{
        updateTasksHandler(element.id,text)
    },[updateTasksHandler,element.id])

    return (
        <li key={element.id} className={element.status===TaskStatuses.Completed?"isDone":""}>
            <Checkbox onChange={(e)=>onCheckHandler(element.id,e.currentTarget.checked)} checked={element.status===TaskStatuses.Completed}/>
            <EditableSpan oldTitle={element.title} updateTasksCallbackHandler={updateTasksCallbackHandler}/>
            <IconButton onClick={() => {removeTask(element.id)}}>
                <Delete  />
            </IconButton>
        </li>
    )
});

export default Task;