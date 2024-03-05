
import {v1} from "uuid";
import {todoListAPI, TodoListType} from "../api/TodoListAPI";
import {Dispatch} from "redux";


export let todoListId1 = v1();
export let todoListId2 = v1()

export type ChoseType = "all" | "completed" | "active";


export type TodoListDomainType = TodoListType & {
    filter: ChoseType
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
            return [{...action.payload.todoList,filter:"all"},...state]
        }
        case "UPDATE-TODOLIST":{
           return  state.map(el => el.id === action.payload.todoListId ? {...el, title:action.payload.title} : el)
        }

        case "SET-TODOLIST":{
            return action.payload.todoList.map(tl=> {
                return {
                    ...tl, filter:"all"
                }
            })
        }

        default: return state
    }
}

export type GlobalActionType = changeFilterACType|removeTodoListAcType|addTodoListAcType|updateTodoListsAcType|setTodolistAcType

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

export const fetchTodoListTC=()=> {
    return (dispatch: Dispatch) => {
        todoListAPI.getTodoListAPI()
            .then(res => {
                dispatch(setTodolistAc(res.data))
            })
    }
}

export const addTodoListsTC=(title:string)=>(dispatch:Dispatch)=>{
    todoListAPI.createTodoList(title)
        .then(res=>{
            dispatch(addTodoListAc(res.data.data.item))
        })
}

export const removeTodoListsTC=(todoListId:string)=>(dispatch:Dispatch)=>{
    todoListAPI.DeleteTodoList(todoListId)
        .then(res=>{
            dispatch(removeTodoListAc(todoListId))
        })
}

export const updateTodoListsTC=(todoListId: string, title: string)=>(dispatch:Dispatch)=>{
    todoListAPI.UpdateTodoList(todoListId,title)
        .then(res=>{
            dispatch(updateTodoListsAc(todoListId,title))
        })
}