import {setAppErrorAC} from "../state/AppReducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/TodoListAPI";

export const errorFunctionMessage = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("ErrorAddTodo"))
    }
}