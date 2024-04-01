import {Dispatch} from "redux";
import {authApi} from "../../features/api/TodoListAPI";
import {errorFunctionMessage} from "../../common/utils/utils";
import {setIsLoginAc} from "./AuthSlice";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTodoListsTC} from "./TodoListSlice";
import {AppThunk} from "../store";

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
        setAppErrorAC(state, action:PayloadAction<{error: string|null}>){
            state.error=action.payload.error
        }
    }
})

export const AppSlice = slice.reducer;


export const {setAppStatusAC,setInitializedAC,setStatusTaskAC,setStatusAddAC,setAppErrorAC} = slice.actions;

export const initializeAppTC = () => (dispatch:any) => {
    dispatch(setAppStatusAC({status:"loading"}));
    authApi.getAuth().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoginAc({value:true}))
            dispatch(setAppStatusAC({status:"succeeded"}))
            dispatch(fetchTodoListsTC())
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



