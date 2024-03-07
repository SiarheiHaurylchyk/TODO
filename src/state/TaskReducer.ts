import {TaskStateType} from "../components/App/App";
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
        case "UPDATE-TASK":{
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId].map(e => e.id === action.payload.taskId ? {...e, ...action.payload.model} : e)}
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
           return {...state,[action.payload.todoListId]:action.payload.task};
        }

        default:{
            return state
        }
    }
}

export type actionTaskType = removeTaskAcType|addTaskAcType|changeTaskStatusAcType|addTodoListAcType|removeTodoListAcType|setTodolistAcType|setTasksAcType



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

export type changeTaskStatusAcType = ReturnType<typeof updateTaskGlobAc>
export const updateTaskGlobAc = (todoListId: string , taskId: string, model:UpdateTaskDomainType )=>{
    return{
        type:"UPDATE-TASK",
        payload:{
            taskId,
            model,
            todoListId
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



export type UpdateTaskDomainType = {
    title?: string,
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}


export const changeTaskStatusTC = (TodoListId: string, id: string, domainModel:UpdateTaskDomainType)=>(dispatch:Dispatch,getState:()=>RootReducerType)=>{
    const state=getState();
    const task= state.TaskReducer[TodoListId].find(t=>t.id===id);
    if (!task){
        return
    }

    let apiMod:UpdateTaskType={title:task.title, description:task.description, status:task.status, priority:task.priority,startDate:task.startDate,deadline:task.deadline,...domainModel}

    todoListAPI.UpdateTask(TodoListId,id,apiMod)
        .then(res=>{
            dispatch(updateTaskGlobAc(TodoListId,id, {...apiMod}))
        })
}