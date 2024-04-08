import {TodoListSlice} from "../../common/components/TodoList/IterableTodo/TodoListSlice";
import {TaskSlice} from "../../common/components/TodoList/IterableTodo/Task/TaskSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppSlice, initializeAppTC} from "../AppSlice";
import {authSlice} from "../../common/components/Login/AuthSlice";
import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";


export type RootStateType = ReturnType<typeof store.getState>


export const store = configureStore({
    reducer:{ TodoListReducer: TodoListSlice,
        TaskReducer: TaskSlice,
        app:AppSlice,
        auth: authSlice},
})



export type useAppDispatch = typeof store.dispatch;

// export type AppThunk<ThunkReturnType = void> = ThunkAction<
//     ThunkReturnType,
//     RootStateType,
//     unknown,
//     Action
// >;
export const useAppDispatch: () => useAppDispatch = useDispatch

store.dispatch(initializeAppTC())
