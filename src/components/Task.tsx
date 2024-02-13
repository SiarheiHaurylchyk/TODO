import React, {useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";

type TaskProps = {
    onCheckHandler:(id:string,e:boolean)=>void,
    updateTasksObjHandler:(id:string,text:string)=>void,
    removeTask:(id: string)=>void,
    id:string,
    isDone:boolean,
    title:string
}

const Task = React.memo(({onCheckHandler,updateTasksObjHandler,removeTask,id,isDone,title}:TaskProps) => {

    const updateTasksHandler = useCallback((text:string)=>{
        updateTasksObjHandler(id,text)
    },[updateTasksObjHandler,id])

    return (
        <li key={id} className={isDone?"isDone":""}>
            <Checkbox onChange={(e)=>onCheckHandler(id,e.currentTarget.checked)} checked={isDone}/>
            <EditableSpan oldTitle={title} updateTasksHandler={updateTasksHandler}/>
            <IconButton onClick={() => {removeTask(id)}}>
                <Delete  />
            </IconButton>
        </li>
    )
});

export default Task;