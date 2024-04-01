import { instance, ResponseType} from "./TodoListAPI";
import {TaskPriorities} from "../../common/components/enums/enums";


export type TaskType = {
    description: string
    title: string,
    status: number,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
}

export type GetTaskRespons = {
    error: string | null,
    totalCount: number,
    items: TaskType[],
}


export type UpdateTaskType = {
    title: string,
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}


export const TasksAPI = {
    GetTasks(TodoListId: string) {
        return instance.get<GetTaskRespons>(`todo-lists/${TodoListId}/tasks`);
    },

    DeleteTasks(TodoListId: string, TaskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${TodoListId}/tasks/${TaskId}`);
    },


    CreateTask(TodoListId: string, Text: string) {
        return instance.post<ResponseType<{item:TaskType}>>(`todo-lists/${TodoListId}/tasks`, {title: Text})
    },

    UpdateTask(TodoListId: string, TaskId: string, model:UpdateTaskType) {
        return instance.put<ResponseType>(`todo-lists/${TodoListId}/tasks/${TaskId}`, model)
    }
}