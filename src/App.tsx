import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./components/ToDoList";

export type ChoseType = "all" | "completed" | "active";

function App() {

    let tsks_1: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "ES6/TS", isDone: false},
    ]

    const tsks_2: Array<TaskType> = [
        {id: 4, title: "Meat", isDone: true},
        {id: 5, title: "Fish", isDone: true},
        {id: 6, title: "Water", isDone: true},
    ]


    const [task, setTask] = useState(tsks_1);
    const [filter, setFilter] = useState<ChoseType>("all")

    function removeTask(id: number) {
        let filterTask = task.filter(e => e.id !== id);
        setTask(filterTask);
    }

    let taskForToDOList = task;
    if (filter === "active") {
        taskForToDOList = task.filter(el => el.isDone === false);
    }
    if (filter === "completed") {
        taskForToDOList = task.filter(el => el.isDone === true);
    }

    function changeFilter(value: ChoseType) {
        setFilter(value);
    }

    return (

        <div className="App">
            <ToDoList NameToDO="What to learn" tasks={taskForToDOList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
