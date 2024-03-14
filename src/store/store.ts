import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TodoListReducer} from "../state/TodoListReducer";
import {TaskReducer} from "../state/TaskReducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {AppReduser} from "../state/AppReduser";


const RootReducer = combineReducers({
    TodoListReducer: TodoListReducer,
    TaskReducer: TaskReducer,
    app:AppReduser
})
export type RootReducerType = ReturnType<typeof RootReducer>




// @ts-ignore
export const store = legacy_createStore(RootReducer,applyMiddleware(thunk))


export type useAppDispatch = typeof store.dispatch;

export const useAppDispatch: () => useAppDispatch = useDispatch

// export const useAppDispatch = ()=> useDispatch<ThunkDispatch< RootReducerType,unknown, AnyAction>>()