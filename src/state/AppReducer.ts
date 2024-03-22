import {Dispatch} from "redux";
import {authApi} from "../api/TodoListAPI";
import {errorFunctionMessage} from "../utils/utils";
import {setIsLoginAc} from "./AuthReducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


export type initialStateType = {
    status: RequestStatusType,
    statusTask:RequestStatusType,
    statusAdd:RequestStatusType,
    error: null|string,
    setInitiolized:boolean
}

const initialState:initialStateType = {
    status:'idle',
    statusTask:"idle",
    statusAdd:"idle",
    error:null,
    setInitiolized:false
}
export const AppReducer = (state:initialStateType=initialState, action:ActionsType)=>{
    switch (action.type) {
        case 'APP/SET-STATUS':{
            return {...state,status:action.status}
        }
        case "TASK/SET-STATUS-TASK":{
            return  {...state,statusTask:action.status}
        }
        case "SET-STATUS-ADD":{
            return  {...state,statusAdd:action.status}
        }
        case 'APP/SET-ERROR':{
            return {...state,error:action.error}
        }
        case "SET-INITIALIZED":{
            return {...state,setInitiolized:action.status}
        }
        default:{
            return {...state}
        }

    }

}


export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) =>
    ({ type: 'APP/SET-STATUS', status }) as const

export type SetStatusTaskActionType = ReturnType<typeof setStatusTaskAC>
export const setStatusTaskAC = (status: RequestStatusType) =>
    ({ type: 'TASK/SET-STATUS-TASK', status }) as const

export type SetStatusAddType = ReturnType<typeof setStatusAddAC>
export const setStatusAddAC = (status: RequestStatusType) =>
    ({ type: 'SET-STATUS-ADD', status }) as const

export type setInitializedType = ReturnType<typeof setInitializedAC>
export const setInitializedAC = (status: boolean) =>
    ({ type: 'SET-INITIALIZED', status }) as const

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: null|string) => ({ type: 'APP/SET-ERROR', error }) as const


export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"));
    authApi.getAuth().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoginAc(true))
            dispatch(setAppStatusAC("succeeded"))
        }
        else {
            errorFunctionMessage(res.data,dispatch)
        }
    }).catch(err=>{
        errorFunctionMessage(err,dispatch)

    }).finally(()=>{
        dispatch(setInitializedAC(true))
    })
}



type ActionsType = SetAppStatusActionType | SetAppErrorActionType|SetStatusTaskActionType|SetStatusAddType|setInitializedType
