import axios from "axios";

export const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "6195860a-4d93-4a68-a26f-ccf3ee414204"
    }
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    ...settings
})

export enum TaskStatuses {
    New = 0,
    InProgress=1,
    Completed =2,
    Draft = 3,
}

export enum TaskPriorities {
    Low=0,
    InProgress=1,
    Completed=2,
    Draft=3
}

export type TodoListType = {
    id: string,
    addedDate: string,
    order: number,
    title: string
}


export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

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

export const todoListAPI = {
    getTodoListAPI() {
        return instance.get<Array<TodoListType>>("todo-lists");
    },
    createTodoList(Text: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>("todo-lists", {title: Text});

    },

    DeleteTodoList(TodoListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${TodoListId}`,)

    },

    UpdateTodoList(TodoListId: string, Text: string) {
        return instance.put<ResponseType>(`todo-lists/${TodoListId}`, {title: Text})

    },

    GetTasks(TodoListId: string) {
        return instance.get<GetTaskRespons>(`todo-lists/${TodoListId}/tasks`);
    },

    DeleteTasks(TodoListId: string, TaskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${TodoListId}/tasks/${TaskId}`);
    },


    CreateTask(TodoListId: string, Text: string) {
        return instance.post<ResponseType>(`todo-lists/${TodoListId}/tasks`, {title: Text})
    },

    UpdateTask(TodoListId: string, TaskId: string, model:UpdateTaskType) {
        return instance.put<ResponseType>(`todo-lists/${TodoListId}/tasks/${TaskId}`, model)
    }


}
