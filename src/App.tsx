import React, {useCallback} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./components/ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./store/store";
import {addTaskAc, changeTaskStatusAc, removeTaskAc, updateTasksAc} from "./state/TaskReducer";
import {addTodoListAc, changeFilterAC, removeTodoListAc, updateTodoListsAc} from "./state/TodoListReducer";

export type ChoseType = "all" | "completed" | "active";

export type TodoListType = {
    id: string,
    title: string,
    filter: ChoseType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    console.log("APP")
    const dispatch = useDispatch()
    const todoLists = useSelector<RootReducerType, Array<TodoListType>>(state=>state.TodoListReducer)
    const tasksObj = useSelector<RootReducerType, TaskStateType>(state=>state.TaskReducer)



    const changeFilter=useCallback((filter: ChoseType, todoListId: string)=> {
        // setTodoList(todoLists.map(e => e.id === todoListId ? {...e, filter} : e));
        dispatch(changeFilterAC(filter,todoListId));
    },[dispatch])


    const removeTodoList=useCallback((todoListId: string)=> {
        // let dellTodo = todoLists.filter(e => e.id !== todoListId);
        // setTodoList(dellTodo)
        dispatch(removeTodoListAc(todoListId));
        // delete tasksObj[todoListId];
        // setTasksObj(tasksObj);
    },[dispatch])

    const addTodoList=useCallback((text: string)=> {
        const myId = v1();
        // let todo: TodoListType = {id: myId, title: text, filter: "all"};
        // setTodoList([todo, ...todoLists]);
        // setTasksObj({...tasksObj, [todo.id]: []})
        dispatch(addTodoListAc(myId,text))
    },[dispatch])


    const updateTodoLists=useCallback((todoListId: string, title: string)=> {
        // setTodoList(todoLists.map(el => el.id === todoListId ? {...el, title} : el))
        dispatch(updateTodoListsAc(todoListId,title))
    },[dispatch])



    return (

        <div className="App">
            <ButtonAppBar/>
            <Container fixed >
                <Grid container >
                    <Grid item xs={12} mt={"30px"} display={"flex"} justifyContent={"center"}>
                        <AddItemForm addItem={addTodoList}/>
                    </Grid>

                        <Grid container spacing={3} mt={"20px"} >
                        {
                            todoLists.map(e => {

                                let taskForToDOList = tasksObj[e.id];


                                return (<Grid item >
                                        <Paper sx={{padding:"15px"}}>
                                <ToDoList NameToDO={e.title}
                                                 tasks={taskForToDOList}
                                          removeTodoList={removeTodoList}
                                                 changeFilter={changeFilter}
                                                 filter={e.filter}
                                                 todoListId={e.id}
                                                 key={e.id}
                                                 updateTodoLists={updateTodoLists}
                                />
                                        </Paper>
                                    </Grid>
                                )
                            })
                        }
                        </Grid>
                    </Grid>

            </Container>
        </div>
    );
}

export default App;
