import React, {ChangeEvent, useCallback} from 'react';
import MyButton from "./MyButton";
import "./ToDoList.style.css"
import {ChoseType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {addTaskAc, changeTaskStatusAc, removeTaskAc, updateTasksAc} from "../state/TaskReducer";
import {useDispatch} from "react-redux";
import Task from "./Task";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type ToDoListType = {
    NameToDO: string,
    tasks: Array<TaskType>,
    changeFilter: (value:ChoseType,id:string)=>void,
    filter:ChoseType,
    todoListId:string,
    updateTodoLists:(todoListId:string,title:string)=>void,
    removeTodoList:(todoListIdRemove:string)=>void
}


const ToDoList = React.memo(({removeTodoList,tasks, NameToDO, changeFilter,filter,todoListId,updateTodoLists}: ToDoListType) => {
    console.log("TodoList")
    const dispatch = useDispatch()

    if (filter === "active") {
        tasks = tasks.filter(el => !el.isDone );
    }
    if (filter === "completed") {
        tasks = tasks.filter(el => el.isDone);
    }


    const removeTask=useCallback((id: string)=> {
        // setTasksObj({...tasksObj, [todoListId]: tasksObj[todoListId].filter(e => e.id !== id)});
        dispatch(removeTaskAc(id,todoListId));
    },[dispatch,todoListId])

    const addTasks=useCallback((title:string)=>{
        dispatch(addTaskAc(title,todoListId))
    },[dispatch,todoListId]);



    const onCheckHandler = useCallback((id:string,check:boolean)=>{
        dispatch(changeTaskStatusAc(id,check,todoListId))
    },[dispatch,todoListId])


    const updateTasksObjHandler= useCallback((id:string,text:string)=>{
        dispatch(updateTasksAc(todoListId,id,text))
    },[dispatch,todoListId]);





    const listItems: Array<JSX.Element> = tasks.map(el=>{

      return <Task key={el.id} id={el.id} title={el.title} isDone={el.isDone} onCheckHandler={onCheckHandler} removeTask={removeTask} updateTasksObjHandler={updateTasksObjHandler} />
    })





    const updateTodoListsHandler=useCallback((title:string)=>{
        updateTodoLists(todoListId,title);
    },[updateTodoLists,todoListId])

    const removeTodo=useCallback((todoListIdRemove:string)=>{
        removeTodoList(todoListIdRemove);
    },[removeTodoList])


    const onAllClickHandler = useCallback(() => changeFilter('all', todoListId),[changeFilter,todoListId]);
    const onActiveClickHandler = useCallback(() => changeFilter('active', todoListId),[changeFilter,todoListId]);
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', todoListId),[changeFilter,todoListId]);

    return (
        <>
            <div className="toDoList">

                    <h3>
                        <div className={"h3-todo"}>
                        <EditableSpan oldTitle={NameToDO} updateTasksHandler={updateTodoListsHandler}/>

                        <IconButton onClick={()=>removeTodo(todoListId)}>
                            <Delete color={"primary"}  />
                        </IconButton>
                        </div>
                    </h3>
                    <AddItemForm  addItem={addTasks}/>
                    <ul className="ul-box">
                        {listItems.length!==0?listItems:<li>Нет тасок</li>}
                    </ul>
                    <div>
                        <MyButton isActive={filter==="all"} onClick={onAllClickHandler}>All</MyButton>
                        <MyButton isActive={filter==="active"} onClick={onActiveClickHandler}>Active</MyButton>
                        <MyButton isActive={filter==="completed"} onClick={onCompletedClickHandler}>Completed</MyButton>
                    </div>

            </div>
        </>
    );
})

export default ToDoList;


