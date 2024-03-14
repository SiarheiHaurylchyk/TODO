import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TaskReducer} from "../state/TaskReducer";
import {TodoListReducer} from "../state/TodoListReducer";
import {v1} from "uuid";
import {Provider} from "react-redux";
import {RootReducerType} from "../store/store";
import React from "react";
import {TaskStatuses} from "../api/TodoListAPI";
import {AppReduser} from "../state/AppReduser";
import {thunk} from "redux-thunk";

const RootReducer = combineReducers({
    TodoListReducer: TodoListReducer,
    TaskReducer: TaskReducer,
    app:AppReduser
})

const initialGlobalState = {
    initTodoState: [
        {id: "todolistId1", title: "What to learn", filter: "all",addedDate:"",order:0},
        {id: "todolistId2", title: "What to buy", filter: "all",addedDate:"",order:0}
    ] ,
    initTasksState: {
        "todolistId1": [
            {id: v1(), title: "HTML", status:TaskStatuses.New,addedDate:"",startDate:"",order:1,deadline:"",priority:1,description:"Desk",todoListId:"todolistId1"},
            {id: v1(), title: "JS", status:TaskStatuses.New,addedDate:"",startDate:"",order:1,deadline:"",priority:1,description:"Desk",todoListId:"todolistId1"},
        ],
        "todolistId2": [
            {id: v1(), title: "Milk", status:TaskStatuses.New,addedDate:"",startDate:"",order:1,deadline:"",priority:1,description:"Desk",todoListId:"todolistId2"},
            {id: v1(), title: "Butter", status:TaskStatuses.New,addedDate:"",startDate:"",order:1,deadline:"",priority:1,description:"Desk",todoListId:"todolistId2"},
        ]
    },
    app:{
        error:null,
        status:'idle'
    }
};


// @ts-ignore
export const storyBookStore = legacy_createStore(RootReducer, applyMiddleware(thunk));


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}