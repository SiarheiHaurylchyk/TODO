
import {v1} from "uuid";
import {todoListAPI, TodoListType} from "../api/TodoListAPI";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./AppReduser";




export type ChoseType = "all" | "completed" | "active";


export type TodoListDomainType = TodoListType & {
    filter: ChoseType,
    entityStatus:RequestStatusType
}

const initTodoState:Array<TodoListDomainType> = []
export const TodoListReducer = (state:Array<TodoListDomainType> = initTodoState,action:GlobalActionType):Array<TodoListDomainType> =>{
    switch (action.type) {
        case "CHANGE-FILTER-TODO":{
            return state.map(e => e.id === action.payload.todoListId ? {...e, filter:action.payload.filter} : e);
        }
        case "REMOVE-TODOLIST":{
            return state.filter(e => e.id !== action.payload.todoListId)
        }
        case "ADD-TODOLIST":{
            const rez = action.payload.todoList
            return [{...action.payload.todoList,filter:"all",entityStatus:'idle'},...state]
        }
        case "UPDATE-TODOLIST":{
           return  state.map(el => el.id === action.payload.todoListId ? {...el, title:action.payload.title} : el)
        }

        case "SET-TODOLIST":{
            return action.payload.todoList.map(tl=> {
                return {
                    ...tl, filter:"all",
                    entityStatus:"idle"
                }
            })
        }

        case "SET-ENTITYSTATUS":{
            return  state.map(el => el.id === action.payload.id ? {...el,entityStatus:action.payload.status} : el)
        }

        default: return state
    }
}

export type GlobalActionType = changeFilterACType|removeTodoListAcType|addTodoListAcType|updateTodoListsAcType|setTodolistAcType|setEntityStatusAcType

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC=(filter: ChoseType, todoListId: string)=>{
    return{
        type: "CHANGE-FILTER-TODO",
        payload:{
            filter,
            todoListId
        }
    } as const
}


export type removeTodoListAcType = ReturnType<typeof removeTodoListAc>
export const removeTodoListAc = (todoListId: string) =>{
    return{
        type:"REMOVE-TODOLIST",
        payload:{
            todoListId
        }
    }as const
}


export type addTodoListAcType = ReturnType<typeof addTodoListAc>
export const addTodoListAc = ( todoList: TodoListType) =>{
    return{
        type:"ADD-TODOLIST",
        payload:{
            todoList,

        }
    }as const
}


export type updateTodoListsAcType = ReturnType<typeof updateTodoListsAc>
export const updateTodoListsAc = (todoListId: string, title: string) =>{
    return{
        type:"UPDATE-TODOLIST",
        payload:{
            todoListId,
            title
        }
    }as const
}


export type setTodolistAcType = ReturnType<typeof  setTodolistAc>
export const setTodolistAc = (todoList:Array<TodoListType>)=>{
  return{
      type:"SET-TODOLIST",
      payload:{
          todoList
      }
  }as const
       
}

export type setEntityStatusAcType = ReturnType<typeof  setEntityStatusAc>
export const setEntityStatusAc = (id:string, status:RequestStatusType)=>{
    return{
        type: "SET-ENTITYSTATUS",
        payload:{
            id,status
        }
    }as const
}

export const fetchTodoListTC=()=> {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        todoListAPI.getTodoListAPI()
            .then(res => {
                dispatch(setTodolistAc(res.data))
                dispatch(setAppStatusAC("succeeded"))
            })
    }
}

export const addTodoListsTC=(title:string)=>(dispatch:Dispatch)=>{
    todoListAPI.createTodoList(title)
        .then(res=>{
            if (res.data.resultCode===0){
                dispatch(addTodoListAc(res.data.data.item))
            }
            else {
                if (res.data.messages.length){
                    dispatch(setAppErrorAC(res.data.messages[0]))
                }
                else {
                    dispatch(setAppErrorAC("ErrorAddTodo"))
                }
            }
        })
}

export const removeTodoListsTC=(todoListId:string)=>(dispatch:Dispatch)=>{
    dispatch(setEntityStatusAc(todoListId,"loading"))
    dispatch(setAppStatusAC("loading"))
    todoListAPI.DeleteTodoList(todoListId)
        .then(res=>{
            dispatch(removeTodoListAc(todoListId))
            dispatch(setEntityStatusAc(todoListId,"succeeded"))
            dispatch(setAppStatusAC("succeeded"))
        })
}

export const updateTodoListsTC=(todoListId: string, title: string)=>(dispatch:Dispatch)=>{
    dispatch(setEntityStatusAc(todoListId,"loading"))
    todoListAPI.UpdateTodoList(todoListId,title)
        .then(res=>{
            dispatch(updateTodoListsAc(todoListId,title))
            dispatch(setEntityStatusAc(todoListId,"succeeded"))
        })
}