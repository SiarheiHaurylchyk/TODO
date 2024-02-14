import {combineReducers, legacy_createStore} from "redux";
import {TaskReducer} from "../state/TaskReducer";
import {TodoListReducer} from "../state/TodoListReducer";
import {v1} from "uuid";
import {Provider} from "react-redux";
import {RootReducerType} from "../store/store";
import React from "react";

const rootReducer = combineReducers({
    TodoListReducer: TodoListReducer,
    TaskReducer: TaskReducer
})

const initialGlobalState = {
    initTodoState: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    initTasksState: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

// @ts-ignore
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as RootReducerType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}