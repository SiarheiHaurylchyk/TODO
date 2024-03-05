import {TaskStateType} from "../App";
import {v1} from "uuid";
import {addTodoListAcType, removeTodoListAcType, setTodolistAcType} from "./TodoListReducer";
import {TaskStatuses, TaskType, todoListAPI, UpdateTaskType} from "../api/TodoListAPI";
import {Dispatch} from "redux";
import {RootReducerType} from "../store/store";


const initTasksState: TaskStateType = {}


export const TaskReducer=(state:TaskStateType = initTasksState,action:actionTaskType): TaskStateType=>{
    switch (action.type) {
        case "REMOVE-TASK":{
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId].filter(e => e.id !== action.payload.id)}
        }
        case "ADD-TASK":{
            let task:TaskType = {id: v1(), title: action.payload.title.trim(), status:TaskStatuses.New,addedDate:"",startDate:"",order:1,deadline:"",priority:1,description:"Desk",todoListId:action.payload.todoListId};
            return {...state, [action.payload.todoListId]: [task, ...state[action.payload.todoListId]]}
        }
        case "CHANGE-TASK-STATUS":{
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId].map(e => e.id === action.payload.taskId ? {...e, status: action.payload.isDone} : e)}
        }
        case "UPDATE-TASKS":{
           return  {...state, [action.payload.todoListId]: state[action.payload.todoListId].map(el => el.id === action.payload.id ? {...el, title:action.payload.title} : el)}
        }
        case "ADD-TODOLIST":{
            return {...state, [action.payload.todoList.id]: []}
        }
        case "REMOVE-TODOLIST":{
            const {[action.payload.todoListId]: r, ...rest} = state
            return rest
        }
        case "SET-TODOLIST":{
            const copyState={...state};
            action.payload.todoList.forEach(t=>{
                copyState[t.id]=[]
            })
           return copyState
        }

        case "SET-TASKS":{
            const copyState={...state};
            copyState[action.payload.todoListId] = action.payload.task
            return copyState
        }

        default:{
            return state
        }
    }
}

export type actionTaskType = removeTaskAcType|addTaskAcType|changeTaskStatusAcType|updateTasksAcType|addTodoListAcType|removeTodoListAcType|setTodolistAcType|setTasksAcType



export type removeTaskAcType = ReturnType<typeof removeTaskAc>
export const removeTaskAc = ( todoListId: string,id: string)=>{
    return{
        type:"REMOVE-TASK",
        payload:{
            id,
            todoListId
        }
    }as const
}

export type addTaskAcType = ReturnType<typeof addTaskAc>
export const addTaskAc = (todoListId: string,title: string )=>{
    return{
        type:"ADD-TASK",
        payload:{
            title,
            todoListId
        }
    }as const
}

export type changeTaskStatusAcType = ReturnType<typeof changeTaskStatusAc>
export const changeTaskStatusAc = (todoListId: string ,taskId: string, isDone: number, )=>{
    return{
        type:"CHANGE-TASK-STATUS",
        payload:{
            taskId,
            isDone,
            todoListId
        }
    }as const
}

export type updateTasksAcType = ReturnType<typeof updateTasksAc>
export const updateTasksAc = (todoListId: string, id: string, title: string)=>{
    return{
        type:"UPDATE-TASKS",
        payload:{
            todoListId,
            id,
            title
        }
    }as const
}

export type setTasksAcType = ReturnType<typeof setTasksAc>
export const setTasksAc = (task:Array<TaskType>,todoListId:string)=>{
    return{
        type:"SET-TASKS",
        payload:{
            task,
            todoListId
        }
    } as const
}



export const fetchTasksTC=(todoListId:string)=> {
    return (dispatch: Dispatch) => {
        todoListAPI.GetTasks(todoListId)
            .then(res => {
                dispatch(setTasksAc(res.data.items,todoListId))
            })
    }
}

export const thunkCreaterDeleteTask = (todoListId:string,id:string)=> {
    return (dispatch: Dispatch) => {
        todoListAPI.DeleteTasks(todoListId, id)
            .then(res => {
                dispatch(removeTaskAc(todoListId, id))
            })
    }
}

export const thunkCreatorAddTasks = (todoListId:string,title:string)=>(dispatch:Dispatch)=>{
    todoListAPI.CreateTask(todoListId,title)
        .then(res=>{
            dispatch(addTaskAc(todoListId,title))
        })
}


export const updateTasksHandlerTC=( todoListId:string,id:string,text:string)=>(dispatch:Dispatch)=>{
    let mod={title:text,deadline:'',status:0,description:'',priority:1,startDate:""}
    todoListAPI.UpdateTask(todoListId,id,mod)
        .then(res=>{
            dispatch(updateTasksAc(todoListId,id,mod.title))
        })
}

export const changeTaskStatusTC = (TodoListId: string, id: string,check:TaskStatuses)=>(dispatch:Dispatch,getState:()=>RootReducerType)=>{
    const state=getState();
    const task= state.TaskReducer[TodoListId].find(t=>t.id===id);
    if (!task){
        return
    }

    let mod:UpdateTaskType={title:task.title, description:task.description, status:check, priority:task.priority,startDate:task.startDate,deadline:task.deadline}
    todoListAPI.UpdateTask(TodoListId,id,mod)
        .then(res=>{
            dispatch(changeTaskStatusAc(TodoListId,id,mod.status))
        })
}