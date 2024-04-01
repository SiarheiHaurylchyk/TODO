
import {todoListAPI, TodoListType} from "../../features/api/TodoListAPI";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./AppSlice";
import {AxiosError} from "axios";
import {errorFunctionMessage, networkError} from "../../common/utils/utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {taskThunk} from "./TaskSlice";
import toDoList from "../../common/components/TodoList/ToDoList";
import {AppThunk} from "../store";
import {createAppAsyncThunk} from "../../common/utils/createAsyncThunk";




export type ChoseType = "all" | "completed" | "active";


export type TodoListDomainType = TodoListType & {
    filter: ChoseType,
    entityStatus:RequestStatusType
    isShowTasks:boolean
}


const initTodoState:Array<TodoListDomainType> = []

const slice = createSlice({
    name:"TodoListReducer",
    initialState:initTodoState,
    reducers:{
        changeFilterAC(state,action:PayloadAction<{filter: ChoseType, todoListId: string}>){
            const index = state.findIndex(el => el.id === action.payload.todoListId);
            if (index>-1){
                state[index].filter=action.payload.filter;
            }
        },
        removeTodoListAc(state,action:PayloadAction<{todoListId: string}>){
            const index = state.findIndex(el => el.id === action.payload.todoListId)
            if (index>-1){
                state.splice(index,1)
            }
        },
        addTodoListAc(state,action:PayloadAction<{todoList: TodoListType}>){
            state.unshift({...action.payload.todoList,filter:"all",entityStatus:'idle',isShowTasks:false})
        },
        updateTodoListsAc(state,action:PayloadAction<{todoListId: string, title: string}>){
            const index = state.findIndex(el => el.id === action.payload.todoListId);
            if (index>-1){
                state[index].title=action.payload.title;
            }
        },

        // setTodolistsAc(state,action:PayloadAction<{todoList:Array<TodoListType>}>){
        //     return action.payload.todoList.map(tl=> { return {...tl, filter:"all",entityStatus:"loading",isShowTasks:false} })
        // },

        setEntityStatusAc(state,action:PayloadAction<{id:string, status:RequestStatusType}>){
            const index = state.findIndex(el => el.id === action.payload.id);
            if (index>-1){
                state[index].entityStatus=action.payload.status;
            }
        },
        setEntityStatusAfterLoading(state,action:PayloadAction<{status:RequestStatusType}>){
          return  state.map(el=>{
                return {...el,entityStatus:"idle"}
            })
        },
        setIsShowTasks(state,action:PayloadAction<{id:string}>){
            let todoListById =  state.find((todoList:any) => action.payload.id === todoList.id);
            if (todoListById){
                todoListById.isShowTasks = true
            }
        }
    },
    extraReducers(builder){
        builder.addCase(fetchTodoListsTC.fulfilled,(state,action:PayloadAction<{todoList:Array<TodoListType>}>)=>{
            return action.payload.todoList.map(tl=> { return {...tl, filter:"all",entityStatus:"idle",isShowTasks:false} })
        })


    }
})

export const TodoListSlice = slice.reducer;



export const {changeFilterAC,removeTodoListAc,addTodoListAc,updateTodoListsAc,setEntityStatusAc,setEntityStatusAfterLoading,setIsShowTasks} = slice.actions;


export const fetchTodoListsTC = createAppAsyncThunk<{todoList: TodoListType[]}>(
    `${slice.name}/fetchTodoListsTC`,
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {

            dispatch(setAppStatusAC({status: "loading"}))

            const res = await todoListAPI.getTodoListAPI();

            res.data.forEach(toDoList => {
                dispatch(taskThunk.fetchTasks(toDoList.id)).then(() => {
                    dispatch(setIsShowTasks({id: toDoList.id}))
                })
            })

            dispatch(setEntityStatusAfterLoading({status:"idle"}))
            return {todoList: res.data}
        }
        catch (e) {
            networkError(e,dispatch)
            return rejectWithValue(null)
        }
        finally {
            dispatch(setAppStatusAC({status:"succeeded"}))

        }
    })

// export const _fetchTodoListsTC=():AppThunk=> (dispatch,state) => {
//
//         dispatch(setAppStatusAC({status:"loading"}))
//         todoListAPI.getTodoListAPI()
//             .then(res => {
//                 dispatch(setTodolistsAc({todoList:res.data}))
//
//               res.data.forEach(toDoList=>{
//                   dispatch(taskThunk.fetchTasks(toDoList.id)).then(()=>{
//                       dispatch(setIsShowTasks({id:toDoList.id}))
//                   })
//               })
//
//             }).catch((err)=>{
//             networkError(err,dispatch)
//         }).finally(()=>{
//             dispatch(setAppStatusAC({status:"succeeded"}))
//             dispatch(setEntityStatusAfterLoading({status:"idle"}))
//
//         })
// }
//

export const addTodoListsTC=(title:string)=>(dispatch:Dispatch)=>{
    todoListAPI.createTodoList(title)
        .then(res=>{
            if (res.data.resultCode===0){
                dispatch(addTodoListAc({todoList:res.data.data.item}))
            }else {
                errorFunctionMessage<{item:TodoListType}>(res.data,dispatch)
            }
        }).catch((err)=>{
        networkError(err,dispatch)
    })
}

export const removeTodoListsTC=(todoListId:string)=>(dispatch:Dispatch)=>{
    dispatch(setEntityStatusAc({id:todoListId,status:"loading"}))
    dispatch(setAppStatusAC({status:"loading"}))
    todoListAPI.DeleteTodoList(todoListId)
        .then(res=>{
            dispatch(removeTodoListAc({todoListId:todoListId}))
            dispatch(setEntityStatusAc({id:todoListId,status:"succeeded"}))
            dispatch(setAppStatusAC({status:"succeeded"}))
        })
}

export const updateTodoListsTC=(todoListId: string, title: string)=>(dispatch:Dispatch)=>{
    dispatch(setEntityStatusAc({id:todoListId,status:"loading"}))
    todoListAPI.UpdateTodoList(todoListId,title)
        .then(res=>{
            dispatch(updateTodoListsAc({todoListId,title}))
            dispatch(setEntityStatusAc({id:todoListId,status:"succeeded"}))
        })
}