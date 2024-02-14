import React, {useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./ToDoList";

type TaskProps = {
    onCheckHandler:(id:string,e:boolean)=>void,
    updateTasksObjHandler:(id:string,text:string)=>void,
    removeTask:(id: string)=>void,
    element:TaskType
}

const Task = React.memo(({onCheckHandler,updateTasksObjHandler,removeTask,element}:TaskProps) => {

    const updateTasksHandler = useCallback((text:string)=>{
        updateTasksObjHandler(element.id,text)
    },[updateTasksObjHandler,element.id])

    return (
        <li key={element.id} className={element.isDone?"isDone":""}>
            <Checkbox onChange={(e)=>onCheckHandler(element.id,e.currentTarget.checked)} checked={element.isDone}/>
            <EditableSpan oldTitle={element.title} updateTasksHandler={updateTasksHandler}/>
            <IconButton onClick={() => {removeTask(element.id)}}>
                <Delete  />
            </IconButton>
        </li>
    )
});

export default Task;