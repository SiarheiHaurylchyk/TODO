import {RequestStatusType, setAppErrorAC, setStatusAddAC, setStatusTaskAC} from "../../../../../App/AppSlice";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodoListThunk} from "../TodoListSlice";
import {TasksAPI, TaskType, UpdateTaskType} from "../../../../../features/api/TasksAPI";
import {TodoListType} from "../../../../../features/api/TodoListAPI";
import {createAppAsyncThunk} from "../../../../utils/createAsyncThunk";
import {networkError} from "../../../../utils/utils";
import {DragAndDropChangeTaskId} from "common/utils/DragAndDropChangeId";




export type TaskTypeEntity = TaskType & {
    entityStatus: RequestStatusType
}
export type TaskStateType = {
    [key: string]: Array<TaskTypeEntity>
}

const initTasksState: TaskStateType = {}

const slice = createSlice({
    name: "Task",
    initialState: initTasksState,
    reducers: {

        changeEntityStatusAc(state, action: PayloadAction<{
            todoListId: string,
            id: string,
            status: RequestStatusType
        }>) {
            const { todoListId, id, status } = action.payload;
            state[todoListId] = state[todoListId].map(el => {
                if (el.id === id) {
                    return { ...el, entityStatus: status };
                }
                return el;
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todoListId] = action.payload.task.map(el => ({...el, entityStatus: "idle"}))
            })
            .addCase(addTasks.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })
            .addCase(deleteTasks.fulfilled, (state, action) => {
                const index = state[action.payload.todoListId].findIndex(el => el.id === action.payload.id);
                if (index > -1) {
                    state[action.payload.todoListId].splice(index, 1)
                }
            })
            .addCase(changeTaskStatusAndTitle.fulfilled,(state, action)=>{
                    const index = state[action.payload.todoListId].findIndex(el => el.id === action.payload.taskId);
                    if (index > -1) {
                        state[action.payload.todoListId][index] = {...state[action.payload.todoListId][index], ...action.payload.model}
                    }
            })
            .addCase(TodoListThunk.addTodoLists.fulfilled, (state, action: PayloadAction<{ todoList: TodoListType }>) => {
                state[action.payload.todoList.id] = [];
            })
            .addCase(TodoListThunk.removeTodoLists.fulfilled, (state, action: PayloadAction<{ todoListId: string }>) => {
                delete state[action.payload.todoListId]

            })
            .addCase(DragAndDropUpdateTask.fulfilled,(state,action)=>{
                const {todoListId,dragID,TaskId } = action.payload;
                const dragIndex = state[todoListId].findIndex(el => el.id === dragID);
                const targetIndex = state[todoListId].findIndex(el => el.id === TaskId);

                if (dragIndex > -1 && targetIndex > -1) {
                    const draggedItem = state[todoListId].splice(dragIndex, 1)[0];
                    state[todoListId].splice(targetIndex, 0, draggedItem);
                }
            })

    }
})


export const TaskSlice = slice.reducer;


export const { changeEntityStatusAc} = slice.actions;


const fetchTasks = createAppAsyncThunk<{ todoListId: string, task: TaskType[]},string>(
    `${slice.name}/fetchTasks`,
    async (todoListId: string, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
        // dispatch(setStatusTaskAC({status: "loading"}));
        const res = await TasksAPI.GetTasks(todoListId);
        const task = res.data.items;
        // dispatch(setStatusTaskAC({status: "succeeded"}));
        return {task, todoListId}
    } catch (e) {
        networkError(e, dispatch)
        return rejectWithValue(null)
    }

})


const addTasks = createAppAsyncThunk<{ task: TaskTypeEntity }, {
    todoListId: string,
    title: string
}>
(`${slice.name}/addTask`, async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
        const res = await TasksAPI.CreateTask(arg.todoListId, arg.title);

        if (res.data.resultCode === 0) {
            let resTask: TaskTypeEntity = {...res.data.data.item, entityStatus: "idle"}

            return {task: resTask}
        } else {
            if (res.data.messages.length) {
                dispatch(setAppErrorAC({error: res.data.messages[0]}))
            } else {
                dispatch(setAppErrorAC({error: "ErrorTask"}))
            }
            return rejectWithValue(null)
        }

    } catch (e) {
        networkError(e, dispatch)
        return rejectWithValue(null)
    }
})


const deleteTasks = createAppAsyncThunk<{todoListId:string,id:string}, {todoListId:string,id:string}>(`${slice.name}/deleteTasks`, async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
        // dispatch(setStatusAddAC({status: "loading"}))
        dispatch(changeEntityStatusAc({status: "loading", todoListId: arg.todoListId, id: arg.id}))
        await TasksAPI.DeleteTasks(arg.todoListId, arg.id)
        // dispatch(setStatusAddAC({status: "succeeded"}));
        dispatch(changeEntityStatusAc({todoListId: arg.todoListId, id: arg.id, status: "succeeded"}))
        return {todoListId: arg.todoListId, id: arg.id};
    } catch (e) {
        networkError(e, dispatch)
        return rejectWithValue(null)
    }
})


export const changeTaskStatusAndTitle = createAppAsyncThunk<
    { todoListId: string, taskId: string, model: UpdateTaskType },
    { TodoListId: string, id: string, domainModel: UpdateTaskDomainType }>

    (`${slice.name}/changeTaskStatus`, async (arg, thunkAPI) => {

    const {dispatch, rejectWithValue, getState} = thunkAPI;
    try {
        dispatch(changeEntityStatusAc({todoListId: arg.TodoListId, id: arg.id, status: 'loading'}))
        const state = getState();
        const task = state.TaskReducer[arg.TodoListId].find((t:TaskType) => t.id === arg.id);
        if (!task) {
            return rejectWithValue(null)
        }

        let apiMod: UpdateTaskType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline, ...arg.domainModel
        }

        const res = await TasksAPI.UpdateTask(arg.TodoListId, arg.id, apiMod);

        if (res.data.resultCode === 0) {
            dispatch(changeEntityStatusAc({todoListId: arg.TodoListId, id: arg.id, status: "succeeded"}))
            return {todoListId: arg.TodoListId, taskId: arg.id, model: apiMod}
        } else {
            if (res.data.messages.length) {
                dispatch(setAppErrorAC({error: res.data.messages[0]}))
            } else {
                dispatch(setAppErrorAC({error: "ErrorTask"}))
            }
            return rejectWithValue(null)
        }

    } catch (e) {
        networkError(e, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(changeEntityStatusAc({todoListId: arg.TodoListId, id: arg.id, status: "succeeded"}))
    }

})


export type UpdateTaskDomainType = {
    title?: string,
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}


const DragAndDropUpdateTask = createAppAsyncThunk<{todoListId: string, TaskId: string, dragID:string},{todoListId: string, TaskId: string, dragID:string}>(
    `${slice.name}/DragAndDropUpdateTask`,
    async (arg, thunkAPI)=>{


    const {dispatch,getState} = thunkAPI;

    const tasks = getState().TaskReducer[arg.todoListId]


        const idToServer =  DragAndDropChangeTaskId(tasks,arg)

        // arg.todoListId, arg.dragID, idToServer
    const res = await TasksAPI.DragAndDropUpdate({todoListId:arg.todoListId,TaskId:arg.TaskId,putAfterItemId:idToServer})


    return {todoListId:arg.todoListId,TaskId:arg.TaskId,dragID:arg.dragID}
})


export const taskThunk = {fetchTasks, addTasks, deleteTasks,changeTaskStatusAndTitle,DragAndDropUpdateTask}