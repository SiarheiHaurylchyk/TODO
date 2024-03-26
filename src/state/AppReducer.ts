import {Dispatch} from "redux";
import {authApi} from "../api/TodoListAPI";
import {errorFunctionMessage} from "../utils/utils";
import {setIsLoginAc} from "./AuthReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


type initialStateType = {
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

const slice = createSlice({
    name:"AppReducer",
    initialState:initialState,
    reducers:{
        setAppStatusAC(state,action:PayloadAction<{status:RequestStatusType}>){
          state.status=action.payload.status
        },
        setStatusTaskAC(state,action:PayloadAction<{status:RequestStatusType}>){
            state.statusTask=action.payload.status
        },
        setStatusAddAC(state,action:PayloadAction<{status:RequestStatusType}>){
            state.statusAdd=action.payload.status
        },
        setInitializedAC(state, action:PayloadAction<{status:boolean}>){
           state.setInitiolized=action.payload.status
        },
        setAppErrorAC(state, action:PayloadAction<{error: null|string}>){
            state.error=action.payload.error
        }
    }
})

export const AppReducer = slice.reducer;


export const {setAppStatusAC,setInitializedAC,setStatusTaskAC,setStatusAddAC,setAppErrorAC} = slice.actions;

export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:"loading"}));
    authApi.getAuth().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoginAc({value:true}))
            dispatch(setAppStatusAC({status:"succeeded"}))
        }
        else {
            errorFunctionMessage(res.data,dispatch)
        }
    }).catch(err=>{
        errorFunctionMessage(err,dispatch)

    }).finally(()=>{
        dispatch(setInitializedAC({status:true}))
    })
}



