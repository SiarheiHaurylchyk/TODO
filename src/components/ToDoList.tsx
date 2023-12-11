import React from 'react';
import Button from "./Button";
import "./ToDoList.style.css"
import {ChoseType} from "../App";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type ToDoListType = {
    NameToDO: string,
    tasks: Array<TaskType>,
    removeTask: (id:number)=>void,
    changeFilter: (value:ChoseType)=>void
}


const ToDoList = ({tasks, NameToDO, removeTask, changeFilter}: ToDoListType) => {
    const listItems: Array<JSX.Element> = tasks.map(el=>{
        return (
            <li key={el.id}>
                <input type="checkbox" checked={el.isDone}/>
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
                    <h3>{NameToDO}</h3>
                    <div>
                        <input/>
                        <Button text="+" />

                    </div>
                    <ul className="ul-box">
                        {listItems.length!==0?listItems:<li>Нет тасок</li>}
                    </ul>
                    <div>
                        <Button text="All" changeFilter={changeFilter}/>
                        <Button text="Active" changeFilter={changeFilter}/>
                        <Button text="Completed" changeFilter={changeFilter}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ToDoList;