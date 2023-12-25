import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./components/ToDoList";
import {v1} from "uuid";

export type ChoseType = "all" | "completed" | "active";

function App() {

    let tsks_1: Array<TaskType> = [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "ES6/TS", isDone: false},
    ]


    const [tasks, setTask] = useState(tsks_1);
    const [filter, setFilter] = useState<ChoseType>("all");


    function removeTask(id: string) {
        let filterTask = tasks.filter(e => e.id !== id);
        setTask(filterTask);

    }

    function addTask(text:string){

            setTask([{id:v1(),title:text.trim(),isDone:true},...tasks])

    }

    let taskForToDOList = tasks;
    if (filter === "active") {
        taskForToDOList = tasks.filter(el => el.isDone === false);
    }
    if (filter === "completed") {
        taskForToDOList = tasks.filter(el => el.isDone === true);
    }

    function changeFilter(value: ChoseType) {
        setFilter(value);
    }


    function changeTaskStatus (taskId:string, isDone:boolean){
        let myTask: Array<TaskType> = tasks.map(val=>{
         return   val.id===taskId ? {...val,  isDone:isDone}  : val ;
        })
        setTask(myTask)
    }

    return (

        <div className="App">
            <ToDoList NameToDO="What to learn"
                      tasks={taskForToDOList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
