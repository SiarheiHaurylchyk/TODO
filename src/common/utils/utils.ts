import {setAppErrorAC, setAppStatusAC} from "../../store/slice/AppSlice";
import {Dispatch} from "redux";
import {ResponseType} from "../../features/api/TodoListAPI";
import axios, {AxiosError} from "axios";
import {useAppDispatch} from "../../store/store";


export const errorFunctionMessage = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
        if (data.messages.length) {
            dispatch(setAppErrorAC({error:data.messages[0]}))
        }
        else {
            dispatch(setAppErrorAC({error:"ErrorAddTodo"}))
        }
}

export const networkError = (err:unknown,dispatch:useAppDispatch) =>{
    let errorMessage = "Some error";

    if (axios.isAxiosError(err)){
        errorMessage = err.response?.data?.message ||err?.message ||  errorMessage
    }
    else if (err instanceof Error){
        errorMessage = `Native Error ${err?.message}`
    }else {
        errorMessage = JSON.stringify(err)
    }

    dispatch(setAppErrorAC({error:errorMessage}))
    dispatch(setAppStatusAC({status:"failed"}))
}