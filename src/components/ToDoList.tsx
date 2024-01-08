import React, {ChangeEvent} from 'react';
import Button from "./Button";
import "./ToDoList.style.css"
import {ChoseType} from "../App";
import {AddItemForm} from "./AddItemForm";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type ToDoListType = {
    NameToDO: string,
    tasks: Array<TaskType>,
    removeTask: (id:string, todoListId:string)=>void,
    changeFilter: (value:ChoseType,id:string)=>void,
    addTask: (text:string, todoListId:string)=>void,
    changeTaskStatus:(taskId:string, isDone:boolean, todoListId:string)=>void,
    filter:ChoseType,
    todoListId:string,
    removeTodoList:(todoListId:string)=>void;
}


const ToDoList = ({tasks, NameToDO, removeTask, changeFilter,addTask,filter,changeTaskStatus,todoListId,removeTodoList}: ToDoListType) => {




    function onCheckHandler (id:string,e:ChangeEvent<HTMLInputElement>,tasksId:string){
        changeTaskStatus(id,e.currentTarget.checked,tasksId)
    }

    const listItems: Array<JSX.Element> = tasks.map(el=>{
        return (
            <li key={el.id} className={el.isDone?"isDone":""}>
                <input type="checkbox" onChange={(e)=>onCheckHandler(el.id,e,todoListId)} checked={el.isDone}/>
                <span>{el.title}</span>
                <button className="ul-box__button" onClick={() => {
                    removeTask(el.id,todoListId)
                }}>X
                </button>
            </li>
        )
    })
    function removeTodo(todoListIdRemove:string){
        removeTodoList(todoListIdRemove);
    }

    return (
        <>
            <div className="toDoList">
                <div>
                    <h3 style={{textAlign:"center"}}>{NameToDO} <button onClick={()=>removeTodo(todoListId)}>remove</button></h3>
                    <AddItemForm  addItem={addTask} todoListId={todoListId}/>
                    <ul className="ul-box">
                        {listItems.length!==0?listItems:<li>Нет тасок</li>}
                    </ul>
                    <div>
                        <Button isActive={filter==="all"} onClick={()=>changeFilter("all",todoListId)}>All</Button>
                        <Button isActive={filter==="active"} onClick={()=>changeFilter("active",todoListId)}>Active</Button>
                        <Button isActive={filter==="completed"} onClick={()=>changeFilter("completed",todoListId)}>Completed</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ToDoList;


