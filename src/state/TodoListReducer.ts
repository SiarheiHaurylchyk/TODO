import {ChoseType, TodoListType} from "../App";
import {v1} from "uuid";

export let todoListId1 = v1();
export let todoListId2 = v1()

const initTodoState:Array<TodoListType> = [
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"},
]
export const TodoListReducer = (state:Array<TodoListType> = initTodoState,action:GlobalActionType):Array<TodoListType> =>{
    switch (action.type) {
        case "CHANGE-FILTER-TODO":{
            return state.map(e => e.id === action.payload.todoListId ? {...e, filter:action.payload.filter} : e);
        }
        case "REMOVE-TODOLIST":{
            return state.filter(e => e.id !== action.payload.todoListId)
        }
        case "ADD-TODOLIST":{
            let todo: TodoListType = {id: action.payload.id, title: action.payload.text, filter: "all"};
            return [todo,...state]
        }
        case "UPDATE-TODOLIST":{
           return  state.map(el => el.id === action.payload.todoListId ? {...el, title:action.payload.title} : el)
        }
        default: return state
    }
}

export type GlobalActionType = changeFilterACType|removeTodoListAcType|addTodoListAcType|updateTodoListsAcType

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
export const addTodoListAc = (id:string, text: string) =>{
    return{
        type:"ADD-TODOLIST",
        payload:{
            text,
            id
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