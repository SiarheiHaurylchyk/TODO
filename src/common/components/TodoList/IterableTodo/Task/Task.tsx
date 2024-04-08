import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../EditableSpan/EditableSpan";
import {TaskStatuses} from "../../../enums/enums";
import AlertDialog from "../../../DialogsDelete/DialogDelete";
import {TaskTypeEntity} from "./TaskSlice";



type TaskProps = {
    updateCheckHandler:(id:string,e:number)=>void,
    updateTasksHandler:(id:string,text:string)=>void,
    removeTask:(id: string)=>void,
    task:TaskTypeEntity
}

const Task = React.memo(({updateCheckHandler,updateTasksHandler,removeTask,task}:TaskProps) => {



    const updateTasksCallbackHandler = useCallback((text:string)=>{
        updateTasksHandler(task.id,text)
    },[updateTasksHandler,task.id])

    const updateCheckHandlerCheckbox=(e:ChangeEvent<HTMLInputElement>)=>{
        updateCheckHandler(task.id,e.currentTarget.checked?2:0)
    }

    const removeAlertDialogCallback = ()=>{
        removeTask(task.id)
    }


    return (
        <li key={task.id} className={task.status===TaskStatuses.Completed?"isDone":""}>
            <Checkbox onChange={updateCheckHandlerCheckbox} checked={task.status===TaskStatuses.Completed} disabled={task.entityStatus==="loading"}/>
            <EditableSpan oldTitle={task.title} updateTasksCallbackHandler={updateTasksCallbackHandler} disabled={task.entityStatus}/>

            <IconButton disabled={task.entityStatus==="loading"}>
                <AlertDialog removeAlertDialogCallback={removeAlertDialogCallback} entityStatus={task.entityStatus}/>
            </IconButton>
        </li>
    )
});

export default Task;