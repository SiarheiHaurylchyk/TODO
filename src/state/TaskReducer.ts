import {v1} from "uuid";
import {addTodoListAcType, removeTodoListAcType, setTodolistAcType} from "./TodoListReducer";
import {TaskStatuses, TaskType, todoListAPI, UpdateTaskType} from "../api/TodoListAPI";
import {Dispatch} from "redux";
import {RootReducerType} from "../store/store";
import {RequestStatusType, setAppErrorAC, setStatusAddAC, setStatusTaskAC} from "./AppReducer";



export type TaskTypeEntity = TaskType & {
    entityStatus: RequestStatusType
}
export type TaskStateType = {
    [key: string]: Array<TaskTypeEntity>
}

const initTasksState: TaskStateType = {}


export const TaskReducer=(state:TaskStateType = initTasksState,action:actionTaskType): TaskStateType=>{
    switch (action.type) {
        case "REMOVE-TASK":{
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId].filter(e => e.id !== action.payload.id)}
        }
        case "ADD-TASK":{
            
            return {...state, [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]}
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
           return {...state,[action.payload.todoListId]:action.payload.task.map(el=>({...el,entityStatus:"idle"}))};
        }

        case "CHANGE-ENTITY-STATUS":{
            return {...state,[action.payload.todoListId]:state[action.payload.todoListId].map(el=>el.id===action.payload.id? {...el,entityStatus:action.payload.status}: el)}
        }


        default:{
            return state
        }
    }
}

export type actionTaskType = removeTaskAcType|addTaskAcType|changeTaskStatusAcType|addTodoListAcType|removeTodoListAcType|setTodolistAcType|setTasksAcType|changeEntityStatusType



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
export const addTaskAc = (task: TaskTypeEntity )=>{
    return{
        type:"ADD-TASK",
        payload:{
            task
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

export type changeEntityStatusType = ReturnType<typeof changeEntityStatusAc>
export const changeEntityStatusAc = (todoListId:string,id:string,status:RequestStatusType) =>{
    return {
        type: "CHANGE-ENTITY-STATUS",
        payload:{
            todoListId,id,status
        }
    }as const
}



export const fetchTasksTC=(todoListId:string)=> {
    return (dispatch: Dispatch) => {
        dispatch(setStatusTaskAC("loading"))
        todoListAPI.GetTasks(todoListId)
            .then(res => {
                dispatch(setTasksAc(res.data.items,todoListId))
                dispatch(setStatusTaskAC("succeeded"))
            })
    }
}

export const thunkCreaterDeleteTask = (todoListId:string,id:string)=> {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAddAC("loading"))
        dispatch(changeEntityStatusAc(todoListId,id,"loading"))
        todoListAPI.DeleteTasks(todoListId, id)
            .then(res => {
                    dispatch(removeTaskAc(todoListId, id));
                    dispatch(setStatusAddAC("succeeded"));
                    dispatch(changeEntityStatusAc(todoListId,id,"succeeded"))
            })
    }
}



export const thunkCreatorAddTasks = (todoListId:string,title:string)=>(dispatch:Dispatch)=>{
    todoListAPI.CreateTask(todoListId,title)
        .then(res=>{

            if (res.data.resultCode===0){
                let resTask:TaskTypeEntity = {...res.data.data.item,entityStatus:"idle"}

                dispatch(addTaskAc(resTask))
            }
            else {
                if (res.data.messages.length){
                    dispatch(setAppErrorAC(res.data.messages[0]))
                }
                else {
                    dispatch(setAppErrorAC("ErrorTask"))
                }
            }
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

    dispatch(changeEntityStatusAc(TodoListId,id,"loading"))
    const state=getState();
    const task= state.TaskReducer[TodoListId].find(t=>t.id===id);
    if (!task){
        return
    }

    let apiMod:UpdateTaskType={title:task.title, description:task.description, status:task.status, priority:task.priority,startDate:task.startDate,deadline:task.deadline,...domainModel}

    todoListAPI.UpdateTask(TodoListId,id,apiMod)
        .then(res=>{
            if(res.data.resultCode===0) {
                dispatch(updateTaskGlobAc(TodoListId, id, {...apiMod}))
                dispatch(changeEntityStatusAc(TodoListId, id, "succeeded"))
            }
            else {
                if (res.data.messages.length){
                    dispatch(setAppErrorAC(res.data.messages[0]))
                }
                else {
                    dispatch(setAppErrorAC("ErrorTask"))
                }
            }
        }).finally(()=>{
            dispatch(changeEntityStatusAc(TodoListId,id,"succeeded"))
    })
}