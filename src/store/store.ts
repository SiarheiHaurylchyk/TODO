import {combineReducers, legacy_createStore} from "redux";
import {TodoListReducer} from "../state/TodoListReducer";
import {TaskReducer} from "../state/TaskReducer";

const RootReducer = combineReducers({
    TodoListReducer: TodoListReducer,
    TaskReducer: TaskReducer
})
export type RootReducerType = ReturnType<typeof RootReducer>

export const store = legacy_createStore(RootReducer)