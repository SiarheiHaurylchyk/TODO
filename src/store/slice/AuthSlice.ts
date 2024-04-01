import {Dispatch, UnknownAction} from "redux";
import {setAppStatusAC} from "./AppSlice";
import {authApi, LoginParamsType} from "../../features/api/TodoListAPI";
import {errorFunctionMessage, networkError} from "../../common/utils/utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTodoListsTC} from "./TodoListSlice";



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

 export const authSlice = slice.reducer;


export const {setIsLoginAc} = slice.actions;

export const loginTc = (data:LoginParamsType) => (dispatch:any)=>{
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

