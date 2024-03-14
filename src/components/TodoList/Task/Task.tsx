import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, CircularProgress, Container, IconButton} from "@mui/material";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../api/TodoListAPI";
import {TodoListDomainType} from "../../../state/TodoListReducer";
import {useSelector} from "react-redux";
import {RootReducerType} from "../../../store/store";
import {RequestStatusType} from "../../../state/AppReduser";
import Box from "@mui/material/Box";
import {TaskTypeEntity} from "../../../state/TaskReducer";


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




    return (
        <li key={task.id} className={task.status===TaskStatuses.Completed?"isDone":""}>
            <Checkbox onChange={updateCheckHandlerCheckbox} checked={task.status===TaskStatuses.Completed} disabled={task.entityStatus==="loading"}/>
            <EditableSpan oldTitle={task.title} updateTasksCallbackHandler={updateTasksCallbackHandler} disabled={task.entityStatus}/>
            <IconButton onClick={() => {removeTask(task.id)}} disabled={task.entityStatus==="loading"}>
                <Delete color={task.entityStatus==="loading"?"disabled":"primary"}/>
            </IconButton>
        </li>
    )
});

export default Task;