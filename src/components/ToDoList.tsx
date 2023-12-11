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
    const listItems: Array<JSX.Element> = [];
    for (let i = 0; i < tasks.length; i++) {
        const listItem: JSX.Element = <li>
            <input type="checkbox" checked={tasks[i].isDone}/>
            <span>{tasks[i].title}</span>
            <button className="ul-box__button" onClick={() => {
                removeTask(tasks[i].id)
            }}>X
            </button>
        </li>
        listItems.push(listItem)
    }


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
                        {listItems}
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