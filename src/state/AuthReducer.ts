import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "./AppReducer";
import {authApi, LoginParamsType} from "../api/TodoListAPI";
import {errorFunctionMessage, networkError} from "../utils/utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoginIn:false
}

const slice = createSlice({
    name: "auth",
    initialState:initialState,
    reducers:{
        setIsLoginAc(state,action:PayloadAction<{value:boolean}>){
              state.isLoginIn=action.payload.value
        }
    }
})

 export const authReducer = slice.reducer;


export const {setIsLoginAc} = slice.actions;

export const loginTc = (data:LoginParamsType) => (dispatch:Dispatch)=>{
    dispatch(setAppStatusAC({status:"loading"}))
    authApi.login(data)
        .then(res=>{
            if(res.data.resultCode===0){
                dispatch(setIsLoginAc({value:true}))
                dispatch(setAppStatusAC({status:"succeeded"}))
            }
            else {
             errorFunctionMessage(res.data,dispatch)

            }
        }).catch(err=>{

        networkError(err,dispatch)

    })
}

export const logOutTc = () => (dispatch:Dispatch)=>{
    dispatch(setAppStatusAC({status:"loading"}))
    authApi.logOut()
        .then(res=>{
            if(res.data.resultCode===0){
                dispatch(setIsLoginAc({value:false}))
                dispatch(setAppStatusAC({status:"succeeded"}))
            }
            else {
                errorFunctionMessage(res.data,dispatch)

            }
        }).catch(err=>{
        networkError(err,dispatch)

    })
}

