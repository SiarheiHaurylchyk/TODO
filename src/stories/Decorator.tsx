import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TaskSlice} from "../store/slice/TaskSlice";
import {TodoListSlice} from "../store/slice/TodoListSlice";
import {v1} from "uuid";
import {Provider} from "react-redux";
import React from "react";
import {AppSlice} from "../store/slice/AppSlice";
import {thunk} from "redux-thunk";
import {TaskStatuses} from "../common/components/enums/enums";

const RootReducer = combineReducers({
    TodoListReducer: TodoListSlice,
    TaskReducer: TaskSlice,
    app:AppSlice
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
    },
    auth:{
        isLoginIn: false
    }

};


// @ts-ignore
export const storyBookStore = legacy_createStore(RootReducer, applyMiddleware(thunk));


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}