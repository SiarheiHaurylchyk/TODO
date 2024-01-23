import {TaskType} from "../components/ToDoList";
import {ChoseType} from "../App";

export type TodoListType = {
    age:number,
    childrenCount:number,
    name:string
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

export const Reduser = (state:TodoListType,action:any) =>{
    switch (action.type){
        case "INCREMENT-AGE":
        state.age = state.age+1;
        return state;
        case "INCREMENT-CHILDREN-COUNT":
            state.childrenCount = state.childrenCount+1;
            return state;
        default: throw new Error("I don't now what you pass me in action");
    }
}

export const useReducer = () =>{

}