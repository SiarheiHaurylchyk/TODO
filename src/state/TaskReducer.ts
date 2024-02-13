import {TaskStateType} from "../App";
import {v1} from "uuid";
import {addTodoListAcType, removeTodoListAcType, todoListId1, todoListId2} from "./TodoListReducer";

const initTasksState: TaskStateType = {
    [todoListId1]: [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "ES6/TS", isDone: false},
    ],
    [todoListId2]: [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: false},
    ]
}


export const TaskReducer=(state:TaskStateType = initTasksState,action:actionTaskType): TaskStateType=>{
    switch (action.type) {
        case "REMOVE-TASK":{
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId].filter(e => e.id !== action.payload.id)}
        }
        case "ADD-TASK":{
            let task = {id: v1(), title: action.payload.title.trim(), isDone: false};
            return {...state, [action.payload.todoListId]: [task, ...state[action.payload.todoListId]]}
        }
        case "CHANGE-TASK-STATUS":{
            return {...state, [action.payload.todoListId]: state[action.payload.todoListId].map(e => e.id === action.payload.taskId ? {...e, isDone:action.payload.isDone} : e)}
        }
        case "UPDATE-TASKS":{
           return  {...state, [action.payload.todoListId]: state[action.payload.todoListId].map(el => el.id === action.payload.id ? {...el, title:action.payload.title} : el)}
        }
        case "ADD-TODOLIST":{
            return {...state, [action.payload.id]: []}
        }
        case "REMOVE-TODOLIST":{
            const {[action.payload.todoListId]: r, ...rest} = state
            return rest
        }

        default:{
            return state
        }
    }
}

export type actionTaskType = removeTaskAcType|addTaskAcType|changeTaskStatusAcType|updateTasksAcType|addTodoListAcType|removeTodoListAcType


export type removeTaskAcType = ReturnType<typeof removeTaskAc>
export const removeTaskAc = (id: string, todoListId: string)=>{
    return{
        type:"REMOVE-TASK",
        payload:{
            id,
            todoListId
        }
    }as const
}

export type addTaskAcType = ReturnType<typeof addTaskAc>
export const addTaskAc = (title: string,todoListId: string )=>{
    return{
        type:"ADD-TASK",
        payload:{
            title,
            todoListId
        }
    }as const
}

export type changeTaskStatusAcType = ReturnType<typeof changeTaskStatusAc>
export const changeTaskStatusAc = (taskId: string, isDone: boolean, todoListId: string)=>{
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