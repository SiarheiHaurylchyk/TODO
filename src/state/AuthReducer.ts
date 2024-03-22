import {Dispatch} from "redux";
import {setAppStatusAC} from "./AppReducer";
import {authApi, LoginParamsType} from "../api/TodoListAPI";
import {errorFunctionMessage} from "../utils/utils";


type initialStateType = {
    isLoginIn:boolean
}

const initialState = {
    isLoginIn:false
}

export const authReducer = (state:initialStateType =initialState , action:ActionsType)=>{
    switch (action.type) {
        case "IS-LOGIN":{
            return {...state, isLoginIn: action.isLoginIn}
        }

        default:{
            return state
        }
    }

}

type setIsLoginType = ReturnType<typeof setIsLoginAc>
export const setIsLoginAc = (isLoginIn:boolean) =>{
    return{
        type: "IS-LOGIN",
        isLoginIn
    }as const
}

type ActionsType = setIsLoginType

export const loginTc = (data:LoginParamsType) => (dispatch:Dispatch)=>{
    dispatch(setAppStatusAC("loading"))
    authApi.login(data)
        .then(res=>{
            if(res.data.resultCode===0){
                dispatch(setIsLoginAc(true))
                dispatch(setAppStatusAC("succeeded"))
            }
            else {
             errorFunctionMessage(res.data,dispatch)

            }
        }).catch(err=>{
        errorFunctionMessage(err,dispatch)

    })
}

export const logOutTc = () => (dispatch:Dispatch)=>{
    dispatch(setAppStatusAC("loading"))
    authApi.logOut()
        .then(res=>{
            if(res.data.resultCode===0){
                dispatch(setIsLoginAc(false))
                dispatch(setAppStatusAC("succeeded"))
            }
            else {
                errorFunctionMessage(res.data,dispatch)

            }
        }).catch(err=>{
        errorFunctionMessage(err,dispatch)

    })
}

