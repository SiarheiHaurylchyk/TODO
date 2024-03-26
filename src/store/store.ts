import {combineReducers} from "redux";
import {TodoListReducer} from "../state/TodoListReducer";
import {TaskReducer} from "../state/TaskReducer";
import {thunk} from "redux-thunk";
import {useDispatch} from "react-redux";
import {AppReducer} from "../state/AppReducer";
import {authReducer} from "../state/AuthReducer";
import {configureStore} from "@reduxjs/toolkit";


const RootReducer = combineReducers({
    TodoListReducer: TodoListReducer,
    TaskReducer: TaskReducer,
    app:AppReducer,
    auth: authReducer
})
export type RootReducerType = ReturnType<typeof RootReducer>




// @ts-ignore
// export const store = legacy_createStore(RootReducer,applyMiddleware(thunk))

export const store = configureStore({
    reducer:RootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),

})



export type useAppDispatch = typeof store.dispatch;

export const useAppDispatch: () => useAppDispatch = useDispatch

// export const useAppDispatch = ()=> useDispatch<ThunkDispatch< RootReducerType,unknown, AnyAction>>()


// @ts-ignore
window.store = store;