import React from 'react';
import './App.css';
import ToDoList, {TaskType} from "./components/ToDoList";


function App() {
    const tsks_1:Array<TaskType>=[
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "ES6/TS", isDone: false},
    ]

    const tsks_2:Array<TaskType>=[
        {id: 4, title: "Meat", isDone: true},
        {id: 5, title: "Fish", isDone: true},
        {id: 6, title: "Water", isDone: true},
    ]



    return (

        <div className="App">
        <ToDoList NameToDO="What to learn" tasks={tsks_1}/>
        <ToDoList NameToDO="What to buy" tasks={tsks_2}/>
        </div>
    );
}

export default App;
