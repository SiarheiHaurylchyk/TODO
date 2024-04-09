import {RequestStatusType, setAppStatusAC} from "App/AppSlice";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {taskThunk} from "./Task/TaskSlice";
import {ReorderTodoListArgs, todoListAPI, TodoListType} from "features/api/TodoListAPI";
import {createAppAsyncThunk} from "common/utils/createAsyncThunk";
import {errorFunctionMessage, networkError} from "common/utils/utils";
import {DragAndDropChangeTodoId} from "common/utils/DragAndDropChangeId";


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
            let todoListById =  state.find((todoList:TodoListDomainType) => action.payload.id === todoList.id);
            if (todoListById){
                todoListById.isShowTasks = true
            }
        }

    },
    extraReducers(builder){
        builder.addCase(fetchTodoListsTC.fulfilled,(state,action:PayloadAction<{todoList:Array<TodoListType>}>)=>{
            return action.payload.todoList.map(tl=> { return {...tl, filter:"all",entityStatus:"idle",isShowTasks:false} })
        })
            .addCase(addTodoLists.fulfilled,(state,action:PayloadAction<{todoList:TodoListType}>)=>{
                state.unshift({...action.payload.todoList,filter:"all",entityStatus:'idle',isShowTasks:true})
            })
            .addCase(removeTodoLists.fulfilled,(state,action:PayloadAction<{todoListId:string}>)=>{
                const index = state.findIndex(el => el.id === action.payload.todoListId)
                if (index>-1){
                    state.splice(index,1)
                }
            })
            .addCase(updateTodoLists.fulfilled,(state,action:PayloadAction<{ todoListId: string, title: string }>)=>{
                const index = state.findIndex(el => el.id === action.payload.todoListId);
                if (index>-1){
                    state[index].title=action.payload.title;
                }
            })
            .addCase(reorderTodolistTC.fulfilled,(state,action)=>{
                const {startDragId,endShiftId } = action.payload;
                const dragIndex = state.findIndex(el => el.id === startDragId);
                const targetIndex = state.findIndex(el => el.id === endShiftId);

                if (dragIndex > -1 && targetIndex > -1) {
                    const draggedItem = state.splice(dragIndex, 1)[0];
                    state.splice(targetIndex, 0, draggedItem);
                }
            })
    }
})

export const TodoListSlice = slice.reducer;



export const {changeFilterAC,setEntityStatusAc,setEntityStatusAfterLoading,setIsShowTasks} = slice.actions;


const fetchTodoListsTC = createAppAsyncThunk<{todoList: TodoListType[]}>(
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

            return {todoList: res.data}
        }
        catch (e) {
            networkError(e,dispatch)
            return rejectWithValue(null)
        }
        finally {
            dispatch(setAppStatusAC({status:"succeeded"}))
            dispatch(setEntityStatusAfterLoading({status:"idle"}))
        }
    })


const addTodoLists = createAppAsyncThunk<{todoList:TodoListType},{title:string}>(
    `${slice.name}/addTodoLists`,
    async (arg, thunkAPI) => {
        const {dispatch,rejectWithValue} = thunkAPI;
        try {
       const res= await todoListAPI.createTodoList(arg.title);

            if (res.data.resultCode===0){
                return {todoList:res.data.data.item}
            }else {
                errorFunctionMessage<{item:TodoListType}>(res.data,dispatch)
                return rejectWithValue(null)
            }

        }
        catch (e){
            networkError(e,dispatch)
            return rejectWithValue(null)
        }

    })


export const removeTodoLists = createAppAsyncThunk<{todoListId:string}, { todoListId: string }>(
    `${slice.name}/removeTodoLists`,
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        dispatch(setEntityStatusAc({id: arg.todoListId, status: "loading"}))
        dispatch(setAppStatusAC({status: "loading"}))
        const res = await todoListAPI.DeleteTodoList(arg.todoListId)


        dispatch(setEntityStatusAc({id: arg.todoListId, status: "succeeded"}))
        dispatch(setAppStatusAC({status: "succeeded"}))
        return {todoListId: arg.todoListId}
    })



export const updateTodoLists =  createAppAsyncThunk<{ todoListId: string, title: string }, { todoListId: string, title: string }>(
    `${slice.name}/updateTodoLists`,
    async (arg, thunkAPI) => {
        const {dispatch,rejectWithValue} = thunkAPI;
            dispatch(setEntityStatusAc({id:arg.todoListId,status:"loading"}))
            const res = await todoListAPI.UpdateTodoList(arg.todoListId,arg.title)

            dispatch(setEntityStatusAc({id:arg.todoListId,status:"succeeded"}))
            return {todoListId:arg.todoListId,title:arg.title}
    })





const reorderTodolistTC = createAppAsyncThunk<
    ReorderTodoListArgs,
    ReorderTodoListArgs
>(
  `  ${slice.name}/reorderTodolist`,
async(args, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    const todolists = getState().TodoListReducer

    const idToServer = DragAndDropChangeTodoId(todolists, args)
    const res = await todoListAPI.reorderTodolist({startDragId: args.startDragId, endShiftId: idToServer})
    return args
}
)


export const TodoListThunk = {fetchTodoListsTC,addTodoLists,removeTodoLists,updateTodoLists,reorderTodolistTC}
