import {TodoListSlice} from "./slice/TodoListSlice";
import {TaskSlice} from "./slice/TaskSlice";
import {useDispatch} from "react-redux";
import {AppSlice, initializeAppTC} from "./slice/AppSlice";
import {authSlice} from "./slice/AuthSlice";
import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";


export type RootStateType = ReturnType<typeof store.getState>


export const store = configureStore({
    reducer:{ TodoListReducer: TodoListSlice,
        TaskReducer: TaskSlice,
        app:AppSlice,
        auth: authSlice},
})



export type useAppDispatch = typeof store.dispatch;

export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootStateType,
    unknown,
    Action
>;
export const useAppDispatch: () => useAppDispatch = useDispatch

store.dispatch(initializeAppTC())
