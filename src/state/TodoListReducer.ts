
import {todoListAPI, TodoListType} from "../api/TodoListAPI";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./AppReducer";
import {AxiosError} from "axios";
import {errorFunctionMessage, networkError} from "../utils/utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";




export type ChoseType = "all" | "completed" | "active";


export type TodoListDomainType = TodoListType & {
    filter: ChoseType,
    entityStatus:RequestStatusType
}


const initTodoState:Array<TodoListDomainType> = []

const slice = createSlice({
    name:"TodoListReducer",
    initialState:initTodoState,
    reducers:{
        changeFilterAC(state,action:PayloadAction<{filter: ChoseType, todoListId: string}>){
            const index = state.findIndex(el => el.id === action.payload.todoListId);
            if (index>-1){
                state[index].filter=action.payload.filter;
            }
        },
        removeTodoListAc(state,action:PayloadAction<{todoListId: string}>){
            const index = state.findIndex(el => el.id === action.payload.todoListId)
            if (index>-1){
                state.splice(index,1)
            }
        },
        addTodoListAc(state,action:PayloadAction<{todoList: TodoListType}>){
            state.unshift({...action.payload.todoList,filter:"all",entityStatus:'idle'})
        },
        updateTodoListsAc(state,action:PayloadAction<{todoListId: string, title: string}>){
            const index = state.findIndex(el => el.id === action.payload.todoListId);
            if (index>-1){
                state[index].title=action.payload.title;
            }
        },
        setTodolistAc(state,action:PayloadAction<{todoList:Array<TodoListType>}>){
            return action.payload.todoList.map(tl=> { return {...tl, filter:"all",entityStatus:"idle"} })
        },
        setEntityStatusAc(state,action:PayloadAction<{id:string, status:RequestStatusType}>){
            const index = state.findIndex(el => el.id === action.payload.id);
            if (index>-1){
                state[index].entityStatus=action.payload.status;
            }
        }
    }
})

export const TodoListReducer = slice.reducer;



export const {changeFilterAC,removeTodoListAc,addTodoListAc,updateTodoListsAc,setTodolistAc,setEntityStatusAc} = slice.actions;

export const fetchTodoListTC=()=> {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status:"loading"}))
        todoListAPI.getTodoListAPI()
            .then(res => {
                dispatch(setTodolistAc({todoList:res.data}))
            }).catch((err)=>{
            networkError(err,dispatch)
        }).finally(()=>{
            dispatch(setAppStatusAC({status:"succeeded"}))
        })
    }
}

export const addTodoListsTC=(title:string)=>(dispatch:Dispatch)=>{
    todoListAPI.createTodoList(title)
        .then(res=>{
            if (res.data.resultCode===0){
                dispatch(addTodoListAc({todoList:res.data.data.item}))
            }else {
                errorFunctionMessage<{item:TodoListType}>(res.data,dispatch)
            }
        }).catch((err)=>{
        networkError(err,dispatch)
    })
}

export const removeTodoListsTC=(todoListId:string)=>(dispatch:Dispatch)=>{
    dispatch(setEntityStatusAc({id:todoListId,status:"loading"}))
    dispatch(setAppStatusAC({status:"loading"}))
    todoListAPI.DeleteTodoList(todoListId)
        .then(res=>{
            dispatch(removeTodoListAc({todoListId:todoListId}))
            dispatch(setEntityStatusAc({id:todoListId,status:"succeeded"}))
            dispatch(setAppStatusAC({status:"succeeded"}))
        })
}

export const updateTodoListsTC=(todoListId: string, title: string)=>(dispatch:Dispatch)=>{
    dispatch(setEntityStatusAc({id:todoListId,status:"loading"}))
    todoListAPI.UpdateTodoList(todoListId,title)
        .then(res=>{
            dispatch(updateTodoListsAc({todoListId,title}))
            dispatch(setEntityStatusAc({id:todoListId,status:"succeeded"}))
        })
}