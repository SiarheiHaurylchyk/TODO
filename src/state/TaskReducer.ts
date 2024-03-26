import {TaskType, todoListAPI, TodoListType, UpdateTaskType} from "../api/TodoListAPI";
import {Dispatch} from "redux";
import {RootReducerType} from "../store/store";
import {RequestStatusType, setAppErrorAC, setStatusAddAC, setStatusTaskAC} from "./AppReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodoListAc, removeTodoListAc, setTodolistAc} from "./TodoListReducer";
import {networkError} from "../utils/utils";


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
        removeTaskAc(state, action: PayloadAction<{ todoListId: string, id: string }>) {
            const index = state[action.payload.todoListId].findIndex(el => el.id === action.payload.id);
            if (index > -1) {
                state[action.payload.todoListId].splice(index, 1)
            }
        },
        addTaskAc(state, action: PayloadAction<{ task: TaskTypeEntity }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskGlobAc(state, action: PayloadAction<{
            todoListId: string,
            taskId: string,
            model: UpdateTaskDomainType
        }>) {

            const index = state[action.payload.todoListId].findIndex(el => el.id === action.payload.taskId);
            if (index > -1) {
                state[action.payload.todoListId][index] = {...state[action.payload.todoListId][index], ...action.payload.model}
            }
        },
        setTasksAc(state, action: PayloadAction<{ task: Array<TaskType>, todoListId: string }>) {
            state[action.payload.todoListId] = action.payload.task.map(el => ({...el, entityStatus: "idle"}))
        },
        changeEntityStatusAc(state, action: PayloadAction<{
            todoListId: string,
            id: string,
            status: RequestStatusType
        }>) {

            state[action.payload.todoListId].forEach(el => {
                return el.id === action.payload.id ? {...el, entityStatus: action.payload.status} : el
            })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodoListAc, (state, action: PayloadAction<{ todoList: TodoListType }>) => {
            state[action.payload.todoList.id] = [];
        })
            .addCase(removeTodoListAc, (state, action: PayloadAction<{ todoListId: string }>) => {
                delete state[action.payload.todoListId]

            })
            .addCase(setTodolistAc, (state, action: PayloadAction<{ todoList: Array<TodoListType> }>) => {
                action.payload.todoList.forEach(t => {
                    state[t.id] = []
                })

            })
    }
})


export const TaskReducer = slice.reducer;


export const {removeTaskAc, addTaskAc, updateTaskGlobAc, setTasksAc, changeEntityStatusAc} = slice.actions;

export const fetchTasksTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusTaskAC({status: "loading"}))
        todoListAPI.GetTasks(todoListId)
            .then(res => {
                dispatch(setTasksAc({task: res.data.items, todoListId}))
                dispatch(setStatusTaskAC({status: "succeeded"}))
            }).catch(err => {
            networkError(err, dispatch)
        })
    }
}

export const thunkCreaterDeleteTask = (todoListId: string, id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAddAC({status: "loading"}))
        dispatch(changeEntityStatusAc({status: "loading", todoListId, id}))
        todoListAPI.DeleteTasks(todoListId, id)
            .then(res => {
                dispatch(removeTaskAc({todoListId, id}));
                dispatch(setStatusAddAC({status: "succeeded"}));
                dispatch(changeEntityStatusAc({todoListId, id, status: "succeeded"}))
            }).catch(err => {
            networkError(err, dispatch)
        })
    }
}


export const thunkCreatorAddTasks = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    todoListAPI.CreateTask(todoListId, title)
        .then(res => {

            if (res.data.resultCode === 0) {
                let resTask: TaskTypeEntity = {...res.data.data.item, entityStatus: "idle"}

                dispatch(addTaskAc({task: resTask}))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC({error: res.data.messages[0]}))
                } else {
                    dispatch(setAppErrorAC({error: "ErrorTask"}))
                }
            }
        }).catch(err => {
        networkError(err, dispatch)
    })
}


export type UpdateTaskDomainType = {
    title?: string,
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}


export const changeTaskStatusTC = (TodoListId: string, id: string, domainModel: UpdateTaskDomainType) => (dispatch: Dispatch, getState: () => RootReducerType) => {

    dispatch(changeEntityStatusAc({todoListId: TodoListId, id, status: 'loading'}))
    const state = getState();
    const task = state.TaskReducer[TodoListId].find(t => t.id === id);
    if (!task) {
        return
    }

    let apiMod: UpdateTaskType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline, ...domainModel
    }

    todoListAPI.UpdateTask(TodoListId, id, apiMod)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskGlobAc({todoListId: TodoListId, taskId: id, model: {...apiMod}}))
                dispatch(changeEntityStatusAc({todoListId: TodoListId, id, status: "succeeded"}))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC({error: res.data.messages[0]}))
                } else {
                    dispatch(setAppErrorAC({error: "ErrorTask"}))
                }
            }
        }).catch(err => {
        networkError(err, dispatch)
    })
        .finally(() => {
            dispatch(changeEntityStatusAc({todoListId: TodoListId, id, status: "succeeded"}))
        })
}