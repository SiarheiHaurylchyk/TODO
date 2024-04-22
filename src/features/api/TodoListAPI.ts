import axios from "axios";


export const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "6195860a-4d93-4a68-a26f-ccf3ee414204"
    }
}

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    ...settings
})


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




export type LoginParamsType = {
    email:string,
    password:string,
    rememberMe?:boolean,
    captcha?:boolean
}

type getResponseAuth = {
    id: number,
    email: string,
    login: string
}

export type ReorderTodoListArgs = {
    startDragId: string,
    endShiftId: string | null
    startTodoDragId?: string,
    endTodoShiftId?: string | null
}


export const authApi = {
    login(data:LoginParamsType){
       return  instance.post<ResponseType<{userId:number}>>('/auth/login',data);
    },
    getAuth(){
        return instance.get<ResponseType<getResponseAuth>>('/auth/me')
    },
    logOut(){
        return instance.delete<ResponseType>('/auth/login');
    }
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

    reorderTodolist(args: ReorderTodoListArgs) {
        return instance.put<ResponseType>(`todo-lists/${args.startDragId}/reorder`, {putAfterItemId: args.endShiftId})
    }


}


