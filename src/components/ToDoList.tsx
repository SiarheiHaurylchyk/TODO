import React from 'react';
import Button from "./Button";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type ToDoListType = {
    NameToDO: string,
    tasks: Array<TaskType>
}
const ToDoList = ({tasks, NameToDO}: ToDoListType) => {
    const listItems: Array<JSX.Element> = [];
    for (let i = 0; i < tasks.length; i++) {
        const listItem: JSX.Element = <li>
            <input type="checkbox" checked={tasks[i].isDone}/>
            <span>{tasks[i].title}</span>
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
                        <Button text="+"/>
                    </div>
                    <ul>
                        {listItems}
                    </ul>
                    <div>
                        <Button text="All"/>
                        <Button text="Active"/>
                        <Button text="Completed"/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ToDoList;