import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodoListThunk} from "../common/components/TodoList/IterableTodo/TodoListSlice";
import {authAction} from "../common/components/Login/AuthSlice";
import {createAppAsyncThunk} from "../common/utils/createAsyncThunk";
import {authApi} from "../features/api/TodoListAPI";
import {errorFunctionMessage, networkError} from "../common/utils/utils";



export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


type initialStateType = {
    status: RequestStatusType,
    statusTask:RequestStatusType,
    statusAdd:RequestStatusType,
    error: null|string,
    setInitiolized:boolean,
    search:string
}

const initialState:initialStateType = {
    status:'idle',
    statusTask:"idle",
    statusAdd:"idle",
    error:null,
    setInitiolized:false,
    search:""
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
            console.log(state.statusAdd)
            state.statusAdd=action.payload.status
        },
        setAppErrorAC(state, action:PayloadAction<{error: string|null}>){
            state.error=action.payload.error
        },
        getSearch(state,action:PayloadAction<{search:string}>){
            state.search = action.payload.search;
        }

    },
    extraReducers:(builder)=>{
        builder
            .addCase(initializeAppTC.fulfilled,(state, action:PayloadAction<{status:boolean}>)=>{
                state.setInitiolized=action.payload.status
            })
            .addCase(initializeAppTC.rejected,(state, action)=>{
                state.setInitiolized=true
            })

            .addMatcher(
                (action)=>{
                    return action.type.endsWith("/pending");
                },
                (state, action)=>{
                    state.statusTask = "loading"
                    state.statusAdd= "loading"
            })
            .addMatcher(
                (action)=>{
                    return action.type.endsWith("/fulfilled");
                },
                (state, action)=>{
                    state.statusTask = "succeeded"
                    state.statusAdd = "succeeded"
                })
            .addMatcher(
                (action)=>{
                    return action.type.endsWith("/rejected");
                },
                (state, action)=>{
                    state.status = "idle"
                    state.statusTask = "idle"
                    state.statusAdd = "idle"
                })
    }
})

export const AppSlice = slice.reducer;


export const {setAppStatusAC,setStatusTaskAC,setStatusAddAC,setAppErrorAC,getSearch} = slice.actions;


export const initializeAppTC =  createAppAsyncThunk<{status:boolean}>(
    `${slice.name}/initializeAppTC`,
    async (arg, thunkAPI)=> {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            dispatch(setAppStatusAC({status:"loading"}));
            let res =  await authApi.getAuth()

                if (res.data.resultCode === 0) {
                    dispatch(authAction.setIsLoginAc({value:true}))
                    dispatch(setAppStatusAC({status:"succeeded"}))
                    dispatch(TodoListThunk.fetchTodoListsTC())
                    return {status:true}
                }
                else {
                    errorFunctionMessage(res.data,dispatch)
                    return rejectWithValue(null)
                }
        }
        catch (e){
            networkError(e,dispatch)

            return rejectWithValue(null)
        }


        })