import {setAppStatusAC} from "../../../App/AppSlice";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodoListThunk} from "../TodoList/IterableTodo/TodoListSlice";
import {createAppAsyncThunk} from "../../utils/createAsyncThunk";
import {authApi, LoginParamsType} from "../../../features/api/TodoListAPI";
import {errorFunctionMessage, networkError} from "../../utils/utils";


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
    },
    extraReducers:(builder)=>{
        builder
            .addCase(loginTc.fulfilled,(state, action:PayloadAction<{value:boolean}>)=>{
                state.isLoginIn=action.payload.value
            })


    }
})

 export const authSlice = slice.reducer;

export const authAction = slice.actions



const loginTc = createAppAsyncThunk<{value:boolean},{data:LoginParamsType}>(
    `${slice.name}/loginTc`,
    async (arg, thunkAPI)=>{
        const {dispatch,rejectWithValue} = thunkAPI;

        try {
            dispatch(setAppStatusAC({status:"loading"}))
            const res = await authApi.login(arg.data);

                    if(res.data.resultCode===0){
                        dispatch(TodoListThunk.fetchTodoListsTC())
                        dispatch(setAppStatusAC({status:"succeeded"}))
                        return {value:true}
                    }
                    else {
                        errorFunctionMessage(res.data,dispatch)
                        debugger
                        return rejectWithValue(null)
                    }
        }
        catch (e){
            networkError(e,dispatch)
            return rejectWithValue(null)
        }

    })



 const logOutTc = createAppAsyncThunk<{value:boolean}>(
    `${slice.name}/loginTc`,
    async (arg, thunkAPI)=> {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            dispatch(setAppStatusAC({status: "loading"}))
            const res =await authApi.logOut();

            if (res.data.resultCode === 0) {

                dispatch(setAppStatusAC({status: "succeeded"}))
              return {value: false}
            } else {
                errorFunctionMessage(res.data, dispatch)
                return rejectWithValue(null)
            }
        }

        catch (e){
            networkError(e,dispatch)
            return rejectWithValue(null)
        }
    })


export  const AuthSliceThunk = {loginTc,logOutTc}