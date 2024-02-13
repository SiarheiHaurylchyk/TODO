import React, {ChangeEvent, useCallback} from 'react';
import MyButton from "./MyButton";
import "./ToDoList.style.css"
import {ChoseType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {Checkbox, IconButton} from "@mui/material";
import {addTaskAc, changeTaskStatusAc, removeTaskAc, updateTasksAc} from "../state/TaskReducer";
import {useDispatch} from "react-redux";


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
    removeTodoList:(todoListId:string)=>void,
    updateTodoLists:(todoListId:string,title:string)=>void,
    removeTodo:(todoListIdRemove:string)=>void
}


const ToDoList = React.memo(({removeTodo,tasks, NameToDO, changeFilter,filter,todoListId,removeTodoList,updateTodoLists}: ToDoListType) => {
    console.log("TodoList")
    const dispatch = useDispatch()




    function onCheckHandler (id:string,e:ChangeEvent<HTMLInputElement>,tasksId:string){
        dispatch(changeTaskStatusAc(id,e.currentTarget.checked,tasksId))
    }
    function removeTask(id: string, todoListId: string) {
        // setTasksObj({...tasksObj, [todoListId]: tasksObj[todoListId].filter(e => e.id !== id)});
        dispatch(removeTaskAc(id,todoListId));
    }

    const listItems: Array<JSX.Element> = tasks.map(el=>{
        function updateTasksObjHandler(text:string){
            dispatch(updateTasksAc(todoListId,el.id,text))
        }
        return (
            <li key={el.id} className={el.isDone?"isDone":""}>
                <Checkbox onChange={(e)=>onCheckHandler(el.id,e,todoListId)} checked={el.isDone}/>
                <EditableSpan oldTitle={el.title} updateTasksObjHandler={updateTasksObjHandler}/>
                <IconButton>
                    <Delete onClick={() => {
                        removeTask(el.id,todoListId)
                    }} />
                </IconButton>
            </li>
        )
    })





    const addTasks=useCallback((title:string)=>{
        dispatch(addTaskAc(title,todoListId))
    },[dispatch,todoListId]);

    function updateTodoListsHandler(title:string){
        updateTodoLists(todoListId,title);
    }

    return (
        <>
            <div className="toDoList">

                    <h3>
                        <div className={"h3-todo"}>
                        <EditableSpan oldTitle={NameToDO} updateTasksObjHandler={updateTodoListsHandler}/>

                        <IconButton>
                            <Delete color={"primary"} onClick={()=>removeTodo(todoListId)} />
                        </IconButton>
                        </div>
                    </h3>
                    <AddItemForm  addItem={addTasks}/>
                    <ul className="ul-box">
                        {listItems.length!==0?listItems:<li>Нет тасок</li>}
                    </ul>
                    <div>
                        <MyButton isActive={filter==="all"} onClick={()=>changeFilter("all",todoListId)}>All</MyButton>
                        <MyButton isActive={filter==="active"} onClick={()=>changeFilter("active",todoListId)}>Active</MyButton>
                        <MyButton isActive={filter==="completed"} onClick={()=>changeFilter("completed",todoListId)}>Completed</MyButton>
                    </div>

            </div>
        </>
    );
})

export default ToDoList;


