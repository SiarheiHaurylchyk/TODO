import React, {useCallback, useEffect} from 'react';
import MyButton from "../Button/MyButton";
import "./ToDoList.style.css"
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {CircularProgress, Container, IconButton, Skeleton} from "@mui/material";
import {
    changeTaskStatusTC,
    fetchTasksTC,
    TaskTypeEntity,
    thunkCreaterDeleteTask,
    thunkCreatorAddTasks
} from "../../state/TaskReducer";
import {useSelector} from "react-redux";
import Task from "./Task/Task";
import {ChoseType, TodoListDomainType} from "../../state/TodoListReducer";
import {TaskStatuses, TaskType} from "../../api/TodoListAPI";
import {RootReducerType, useAppDispatch} from "../../store/store";
import {RequestStatusType} from "../../state/AppReduser";


type ToDoListType = {
    NameToDO: string,
    changeFilter: (value:ChoseType,id:string)=>void,
    todoLists:TodoListDomainType
    updateTodoLists:(id:string,title:string)=>void,
    removeTodoList:(idRemove:string)=>void
}


const ToDoList = React.memo(({removeTodoList, NameToDO, changeFilter,todoLists,updateTodoLists}: ToDoListType) => {

    const dispatch = useAppDispatch()

    let taskForToDOList = useSelector<RootReducerType, Array<TaskTypeEntity>>(state => state.TaskReducer[todoLists.id])

    const status = useSelector<RootReducerType, RequestStatusType>(state => state.app.statusTask)



    useEffect(() => {
        dispatch(fetchTasksTC(todoLists.id))
    }, []);



    const removeTask=useCallback((id: string)=> {
            dispatch(thunkCreaterDeleteTask(todoLists.id,id));
    },[dispatch,todoLists.id])

    const addTasks=useCallback((title:string)=>{
        dispatch(thunkCreatorAddTasks(todoLists.id,title))
    },[dispatch,todoLists.id]);

    const updateCheckHandler = useCallback((id:string,check:number)=>{
        dispatch(changeTaskStatusTC(todoLists.id,id,{status:check}))
    },[dispatch,todoLists.id])


    const updateTasksHandler= useCallback((id:string,text:string)=>{
        dispatch(changeTaskStatusTC(todoLists.id,id,{title:text}))
    },[dispatch,todoLists.id]);





    const updateTodoListsHandler=useCallback((title:string)=>{
        updateTodoLists(todoLists.id,title);
    },[updateTodoLists,todoLists.id])

    const removeTodo=useCallback((idRemove:string)=>{
        removeTodoList(idRemove);
    },[removeTodoList])



    if (todoLists.filter === "active") {
        taskForToDOList = taskForToDOList.filter(el => el.status === TaskStatuses.New );
    }
    if (todoLists.filter === "completed") {
        taskForToDOList = taskForToDOList.filter(el => el.status === TaskStatuses.Completed);
    }


    const listItems: Array<JSX.Element> = taskForToDOList.map(el=>{

      return todoLists.entityStatus ==="loading" ? <Skeleton> <Task key={el.id} updateCheckHandler={updateCheckHandler} removeTask={removeTask} updateTasksHandler={updateTasksHandler} task={el}/></Skeleton>
            : <Task key={el.id} updateCheckHandler={updateCheckHandler} removeTask={removeTask} updateTasksHandler={updateTasksHandler} task={el}/>
    })


    const onAllClickHandler = useCallback(() => changeFilter('all', todoLists.id),[changeFilter,todoLists.id]);
    const onActiveClickHandler = useCallback(() => changeFilter('active', todoLists.id),[changeFilter,todoLists.id]);
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', todoLists.id),[changeFilter,todoLists.id]);



    return (
        <>
            <div className="toDoList">
                    <h3>
                        <div className={"h3-todo"}>
                        <EditableSpan oldTitle={NameToDO} updateTasksCallbackHandler={updateTodoListsHandler} disabled={todoLists.entityStatus}/>

                        <IconButton onClick={()=>removeTodo(todoLists.id)} disabled={todoLists.entityStatus==="loading"}>
                            <Delete color={todoLists.entityStatus==="loading"?"disabled":"primary"}/>
                        </IconButton>
                        </div>
                    </h3>
                    <AddItemForm  addItem={addTasks} disabled={todoLists.entityStatus}/>
                    <ul className="ul-box">
                        {listItems.length !== 0 ? listItems : <li>Нет тасок</li>}
                    </ul>
                    <div className={"filterButton"}>
                        <MyButton isActive={todoLists.filter==="all"} onClick={onAllClickHandler}>All</MyButton>
                        <MyButton isActive={todoLists.filter==="active"} onClick={onActiveClickHandler}>Active</MyButton>
                        <MyButton isActive={todoLists.filter==="completed"} onClick={onCompletedClickHandler}>Completed</MyButton>
                    </div>
            </div>
        </>
    );
})

export default ToDoList;


