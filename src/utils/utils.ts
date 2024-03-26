import {setAppErrorAC} from "../state/AppReducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/TodoListAPI";
import {AxiosError} from "axios";


export const errorFunctionMessage = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
        if (data.messages.length) {
            dispatch(setAppErrorAC({error:data.messages[0]}))
        }
        else {
            dispatch(setAppErrorAC({error:"ErrorAddTodo"}))
        }
}

export const networkError = (err:AxiosError,dispatch:Dispatch) =>{
    dispatch(setAppErrorAC({error:err.message}))
}