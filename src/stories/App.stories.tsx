import {Meta, StoryObj} from "@storybook/react";
import App from "../App";
import {useEffect, useState} from "react";
import {GetTaskRespons, ResponseType, todoListAPI, TodoListType} from "../api/TodoListAPI";


const meta: Meta<typeof App> = {
    title: "App",
    component: App,
    tags: ['autodocs'],

}

export default meta;


export type Story = StoryObj<typeof App>


export const GetTodoList = () => {

    const [state, setState] = useState<Array<TodoListType>>()

    useEffect(() => {
        todoListAPI.getTodoListAPI()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodoList = () => {

    const [state, setState] = useState<ResponseType<{ item: TodoListType }>>()

    const [Text, setText] = useState("");

    const onClickHandler = () =>{
        todoListAPI.createTodoList(Text)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{
        JSON.stringify(state)}
        <div>

            <input type="text" placeholder={"Text"} value={Text} onChange={(event)=>setText(event.currentTarget.value)}/>
            <button onClick={onClickHandler}>Create</button>
        </div>
    </div>
}


export const DeleteTodoList = () => {

    const [state, setState] = useState<ResponseType>()
    const [TodoListId, setTodoListId] = useState("")

    const onClickHandler = () =>{
        todoListAPI.DeleteTodoList(TodoListId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{
        JSON.stringify(state)}
        <div>
            <input type="text" placeholder={"TodoListId"} value={TodoListId} onChange={(event)=>setTodoListId(event.currentTarget.value)}/>
            <button onClick={onClickHandler}>Delete</button>
        </div>
            </div>
}

export const UpdateTodoList = () => {

    const [state, setState] = useState<ResponseType>()
    const [TodoListId, setTodoListId] = useState("");
    const [Text, setText] = useState("");

    const onClickHandler = () =>{
        todoListAPI.UpdateTodoList(TodoListId,Text)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{
        JSON.stringify(state)}
        <div>
            <input type="text" placeholder={"TodoListId"} value={TodoListId} onChange={(event)=>setTodoListId(event.currentTarget.value)}/>
            <input type="text" placeholder={"Text"} value={Text} onChange={(event)=>setText(event.currentTarget.value)}/>
            <button onClick={onClickHandler}>Update</button>
        </div>
    </div>
}


export const GetTasks = () => {

    const [state, setState] = useState<GetTaskRespons>()
    const [TodoListId, setTodoListId] = useState("");


    const onClickHandler = () =>{
        todoListAPI.GetTasks(TodoListId)
            .then((res) => {
                console.log(res)
                setState(res.data)
            })
        setTodoListId("")
    }

    return <div>{
        JSON.stringify(state)}
        <div>
            <input type="text" placeholder={"TodoListId"} value={TodoListId} onChange={(event)=>setTodoListId(event.currentTarget.value)}/>

            <button onClick={onClickHandler}>Get</button>
        </div>
    </div>
}
export const DeleteTasks = () => {

    const [state, setState] = useState<ResponseType>()
    const [TodoListId, setTodoListId] = useState("")
    const [TaskId, setTaskId] = useState("")

    const onClickHandler = () => {
        todoListAPI.DeleteTasks(TodoListId, TaskId)
            .then((res) => {

                setState(res.data)
            })
        setTodoListId("");
        setTaskId("");
    }
    return (

        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text" placeholder={"TodoListId"} value={TodoListId}
                       onChange={(event) => setTodoListId(event.currentTarget.value)}/>
                <input type="text" placeholder={"TaskId"} value={TaskId}
                       onChange={(event) => setTaskId(event.currentTarget.value)}/>
                <button onClick={onClickHandler}>Delete</button>
            </div>
        </div>


    )
}

export const CreateTasks = () =>{
    const [state, setState] = useState<ResponseType>()
    const [TodoListId, setTodoListId] = useState<string>("")
    const [Text, setText] = useState<string>("");


    const onClickHandler = () =>{

        todoListAPI.CreateTask(TodoListId,Text)
            .then((res) => {
                setState(res.data)
            })
        setTodoListId("");
        setText("");
    }
    return <div>{
        JSON.stringify(state)}
        <div>
            <input type="text" placeholder={"TodoListId"} value={TodoListId}
                   onChange={(event) => setTodoListId(event.currentTarget.value)}/>

            <input type="text" placeholder={"Text"} value={Text}
                   onChange={(event) => setText(event.currentTarget.value)}/>

            <button onClick={onClickHandler}>Create</button>
        </div>
    </div>
}


export const UpdateTasks = () =>{
    const [state, setState] = useState<ResponseType>()
    const [TodoListId, setTodoListId] = useState("")
    const [TaskId, setTaskId] = useState("")
    const [Text, setText] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState(0)
    const [priority, setPriority] = useState(0)

    const onClickHandler = () =>{
        todoListAPI.UpdateTask(TodoListId, TaskId, {
            title: Text,
            description: description,
            status: status,
            priority: priority,
            startDate: "",
            deadline: ""
        })
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{
        JSON.stringify(state)}
        <div>
            <input type="text" placeholder={"TodoListId"} value={TodoListId}
                   onChange={(event) => setTodoListId(event.currentTarget.value)}/>

            <input type="text" placeholder={"TaskId"} value={TaskId}
                   onChange={(event) => setTaskId(event.currentTarget.value)}/>

            <input type="text" placeholder={"Text"} value={Text}
                   onChange={(event) => setText(event.currentTarget.value)}/>

            <input type="text"  placeholder={"description"} value={description}
                   onChange={(event) => setDescription(event.currentTarget.value)}/>

            <input type="number"  placeholder={"status"} value={status}
                   onChange={(event) => setStatus(+event.currentTarget.value)}/>

            <input type="number"  placeholder={"priority"} value={priority}
                   onChange={(event) => setPriority(+event.currentTarget.value)}/>


            <button onClick={onClickHandler}>Create</button>
        </div>
    </div>
}