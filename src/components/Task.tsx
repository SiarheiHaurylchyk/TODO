import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";

type TaskProps = {
    onCheckHandler:(id:string,e:ChangeEvent<HTMLInputElement>)=>void,
    updateTasksHandler:(text:string)=>void,
    removeTask:(id: string)=>void,
    id:string,
    isDone:boolean,
    title:string
}

const Task = React.memo(({onCheckHandler,updateTasksHandler,removeTask,id,isDone,title}:TaskProps) => {
    return (
        <li key={id} className={isDone?"isDone":""}>
            <Checkbox onChange={(e)=>onCheckHandler(id,e)} checked={isDone}/>
            <EditableSpan oldTitle={title} updateTasksHandler={updateTasksHandler}/>
            <IconButton>
                <Delete onClick={() => {
                    removeTask(id)
                }} />
            </IconButton>
        </li>
    )
});

export default Task;