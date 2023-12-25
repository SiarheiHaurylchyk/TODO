import React, {ChangeEvent, KeyboardEventHandler, useState} from 'react';
import Button from "./Button";
import "./ToDoList.style.css"
import {ChoseType} from "../App";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type ToDoListType = {
    NameToDO: string,
    tasks: Array<TaskType>,
    removeTask: (id:string)=>void,
    changeFilter: (value:ChoseType)=>void,
    addTask: (text:string)=>void,
    changeTaskStatus:(taskId:string, isDone:boolean)=>void,
    filter:ChoseType
}


const ToDoList = ({tasks, NameToDO, removeTask, changeFilter,addTask,filter,changeTaskStatus}: ToDoListType) => {

    const [newTask,setNewTask] = useState("");
    const [error,setError] = useState(false);

    let isAddTaskButtonDisabled = !newTask.trim();

    function addNewTask(newTask:string){
        if (newTask.trim() !== "") {
            addTask(newTask);
            setNewTask("");
        }else {
            setError(true);
        }
    }

    function onChangeHandler(e:ChangeEvent<HTMLInputElement>){
        error && setError(false)
        setNewTask(e.currentTarget.value)
    }

    const handlePress = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewTask(newTask);
            setNewTask("");
        }
    }


    const listItems: Array<JSX.Element> = tasks.map(el=>{
        function onCheckHandler (e:ChangeEvent<HTMLInputElement>){
            changeTaskStatus(el.id,e.currentTarget.checked)
        }
        return (
            <li key={el.id} className={el.isDone?"isDone":""}>
                <input type="checkbox" onChange={onCheckHandler} checked={el.isDone}/>
                <span>{el.title}</span>
                <button className="ul-box__button" onClick={() => {
                    removeTask(el.id)
                }}>X
                </button>
            </li>
        )
    })


    return (
        <>
            <div className="toDoList">
                <div>
                    <h3 style={{textAlign:"center"}}>{NameToDO}</h3>
                    <div>
                        <input onChange={onChangeHandler} value={newTask} onKeyDown={handlePress} className={error?"error":""} />
                        <Button isDisabled={isAddTaskButtonDisabled} onClick={()=>addNewTask(newTask)}>+</Button>
                        {error && <div style={{color:"red"}}>Error:                     Title is required</div>}
                    </div>
                    <ul className="ul-box">
                        {listItems.length!==0?listItems:<li>Нет тасок</li>}
                    </ul>
                    <div>
                        <Button isActive={filter==="all"} activeClass={"active"} onClick={()=>changeFilter("all")}>All</Button>
                        <Button isActive={filter==="active"} activeClass={"active"} onClick={()=>changeFilter("active")}>Active</Button>
                        <Button isActive={filter==="completed"} activeClass={"active"} onClick={()=>changeFilter("completed")}>Completed</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ToDoList;