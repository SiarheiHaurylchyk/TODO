import React, {useCallback, useEffect} from 'react';
import MyButton from "../Button/MyButton";
import "./ToDoList.style.css"

import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {changeTaskStatusTC, fetchTasksTC, thunkCreaterDeleteTask, thunkCreatorAddTasks} from "../../state/TaskReducer";
import {useSelector} from "react-redux";
import Task from "./Task/Task";
import {ChoseType} from "../../state/TodoListReducer";
import {TaskStatuses, TaskType} from "../../api/TodoListAPI";
import {RootReducerType, useAppDispatch} from "../../store/store";


type ToDoListType = {
    NameToDO: string,
    changeFilter: (value:ChoseType,id:string)=>void,
    filter:ChoseType,
    todoListId:string,
    updateTodoLists:(todoListId:string,title:string)=>void,
    removeTodoList:(todoListIdRemove:string)=>void
}


const ToDoList = React.memo(({removeTodoList, NameToDO, changeFilter,filter,todoListId,updateTodoLists}: ToDoListType) => {

    const dispatch = useAppDispatch()

    let taskForToDOList = useSelector<RootReducerType, Array<TaskType>>(state => state.TaskReducer[todoListId])


    useEffect(() => {
        dispatch(fetchTasksTC(todoListId))
    }, []);



    const removeTask=useCallback((id: string)=> {
            dispatch(thunkCreaterDeleteTask(todoListId,id));
    },[dispatch,todoListId])

    const addTasks=useCallback((title:string)=>{
        dispatch(thunkCreatorAddTasks(todoListId,title))
    },[dispatch,todoListId]);

    const updateCheckHandler = useCallback((id:string,check:number)=>{
        dispatch(changeTaskStatusTC(todoListId,id,{status:check}))
    },[dispatch,todoListId])


    const updateTasksHandler= useCallback((id:string,text:string)=>{
        dispatch(changeTaskStatusTC(todoListId,id,{title:text}))
    },[dispatch,todoListId]);





    const updateTodoListsHandler=useCallback((title:string)=>{
        updateTodoLists(todoListId,title);
    },[updateTodoLists,todoListId])

    const removeTodo=useCallback((todoListIdRemove:string)=>{
        removeTodoList(todoListIdRemove);
    },[removeTodoList])



    if (filter === "active") {
        taskForToDOList = taskForToDOList.filter(el => el.status === TaskStatuses.New );
    }
    if (filter === "completed") {
        taskForToDOList = taskForToDOList.filter(el => el.status === TaskStatuses.Completed);
    }


    const listItems: Array<JSX.Element> = taskForToDOList.map(el=>{

      return <Task key={el.id} element={el} updateCheckHandler={updateCheckHandler} removeTask={removeTask} updateTasksHandler={updateTasksHandler} />
    })


    const onAllClickHandler = useCallback(() => changeFilter('all', todoListId),[changeFilter,todoListId]);
    const onActiveClickHandler = useCallback(() => changeFilter('active', todoListId),[changeFilter,todoListId]);
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', todoListId),[changeFilter,todoListId]);

    return (
        <>
            <div className="toDoList">

                    <h3>
                        <div className={"h3-todo"}>
                        <EditableSpan oldTitle={NameToDO} updateTasksCallbackHandler={updateTodoListsHandler}/>

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


