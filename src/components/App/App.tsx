import React, {useCallback, useEffect} from 'react';
import './App.css';
import ToDoList from "../TodoList/ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import ButtonAppBar from "../Button/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
    addTodoListAc, addTodoListsTC,
    changeFilterAC,
    ChoseType,
    fetchTodoListTC,
    removeTodoListAc, removeTodoListsTC,
    TodoListDomainType,
    updateTodoListsAc, updateTodoListsTC
} from "../../state/TodoListReducer";
import {RootReducerType, useAppDispatch} from "../../store/store";
import {TaskType} from "../../api/TodoListAPI";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}



const App = React.memo(() => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodoListTC())
    }, []);

    const todoLists = useSelector<RootReducerType, Array<TodoListDomainType>>(state => state.TodoListReducer)


    const changeFilter = useCallback((filter: ChoseType, todoListId: string) => {
        dispatch(changeFilterAC(filter, todoListId));
    }, [dispatch])


    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListsTC(todoListId))
    }, [dispatch])

    const addTodoList = useCallback((text: string) => {
      dispatch(addTodoListsTC(text))
    }, [dispatch])


    const updateTodoLists = useCallback((todoListId: string, title: string) => {
        dispatch(updateTodoListsTC(todoListId, title))
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



                                return (<Grid key={e.id} item>
                                        <Paper sx={{padding: "15px"}}>
                                            <ToDoList
                                                key={e.id}
                                                NameToDO={e.title}
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
