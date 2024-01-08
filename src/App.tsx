import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./components/ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";

export type ChoseType = "all" | "completed" | "active";

type TodoListType = {
    id: string,
    title: string,
    filter: ChoseType
}

function App() {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ])

    let [tasksObj, setTasksObj] = useState({
        [todoListId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "ES6/TS", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
        ]
    })

    function removeTask(id: string, todoListId:string) {
        setTasksObj({...tasksObj, [todoListId]:tasksObj[todoListId].filter(e=>e.id!==id)});
    }

    function addTask(text: string,todoListId:string) {
        let task = {id: v1(), title: text.trim(), isDone: true};
        setTasksObj({...tasksObj,[todoListId]:[...tasksObj[todoListId],task]})
    }


    function changeFilter(filter: ChoseType, todoListId: string) {
        setTodoList(todoLists.map(e => e.id === todoListId ? {...e, filter} : e));
    }

    function changeTaskStatus(taskId: string, isDone: boolean,todoListId:string) {
       setTasksObj({...tasksObj, [todoListId]:tasksObj[todoListId].map(e=>e.id==taskId?{...e,isDone}:e)})
    }



    function removeTodoList(todoListId:string){
        let dellTodo = todoLists.filter(e=>e.id!==todoListId);
        setTodoList(dellTodo)
        delete tasksObj[todoListId];
        setTasksObj(tasksObj);
    }

    return (

        <div className="App">
            <AddItemForm addItem={()=>{}} todoListId={'23'}/>
            {
                todoLists.map(e => {

                    let taskForToDOList = tasksObj[e.id];
                    if (e.filter === "active") {
                        taskForToDOList = taskForToDOList.filter(el => el.isDone === false);
                    }
                    if (e.filter === "completed") {
                        taskForToDOList = taskForToDOList.filter(el => el.isDone === true);
                    }

                    return <ToDoList NameToDO={e.title}
                                     tasks={taskForToDOList}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeTaskStatus}
                                     filter={e.filter}
                                     todoListId={e.id}
                                     key={e.id}
                                     removeTodoList={removeTodoList}
                    />
                })
            }
        </div>
    );
}

export default App;
