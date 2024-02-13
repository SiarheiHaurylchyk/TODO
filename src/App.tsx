import React, {useCallback} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./components/ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./store/store";
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

const App = React.memo(() => {
    console.log("APP")

    const dispatch = useDispatch()
    const todoLists = useSelector<RootReducerType, Array<TodoListType>>(state => state.TodoListReducer)
    const tasksObj = useSelector<RootReducerType, TaskStateType>(state => state.TaskReducer)


    const changeFilter = useCallback((filter: ChoseType, todoListId: string) => {
        dispatch(changeFilterAC(filter, todoListId));
    }, [dispatch])


    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListAc(todoListId));
    }, [dispatch])

    const addTodoList = useCallback((text: string) => {
        const myId = v1();
        dispatch(addTodoListAc(myId, text))
    }, [dispatch])


    const updateTodoLists = useCallback((todoListId: string, title: string) => {
        dispatch(updateTodoListsAc(todoListId, title))
    }, [dispatch])


    return (

        <div className="App">

            <ButtonAppBar/>
            <Container fixed>
                <Grid container>
                    <Grid item xs={12} mt={"30px"} display={"flex"} justifyContent={"center"}>
                        <AddItemForm addItem={addTodoList}/>
                    </Grid>

                    <Grid container spacing={3} mt={"20px"}>
                        {
                            todoLists.map(e => {

                                let taskForToDOList = tasksObj[e.id];


                                return (<Grid key={e.id} item>
                                        <Paper sx={{padding: "15px"}}>
                                            <ToDoList
                                                key={e.id}
                                                NameToDO={e.title}
                                                tasks={taskForToDOList}
                                                removeTodoList={removeTodoList}
                                                changeFilter={changeFilter}
                                                filter={e.filter}
                                                todoListId={e.id}

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
})

export default App;
