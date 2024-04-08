import React, {useCallback} from "react";
import {Grid, Paper} from "@mui/material";
import ToDoList from "./ToDoList";
import {useSelector} from "react-redux";
import {AddItemForm} from "../../AddItemForm/AddItemForm";
import {Navigate} from "react-router";
import {RootStateType, useAppDispatch} from "../../../../App/store/store";
import {changeFilterAC, ChoseType, TodoListDomainType, TodoListThunk} from "./TodoListSlice";





export const IterableTodo = () => {

    const dispatch = useAppDispatch();

    const todoLists = useSelector<RootStateType, Array<TodoListDomainType>>(state => state.TodoListReducer);

    const isLoginIn = useSelector<RootStateType,boolean>(state =>state.auth.isLoginIn );



    const addTodoList = useCallback((text: string) => {
        dispatch(TodoListThunk.addTodoLists({title:text}))
    }, [dispatch])


    const changeFilter = useCallback((filter: ChoseType, todoListId: string) => {
        dispatch(changeFilterAC({filter,todoListId}));
    }, [dispatch])


    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(TodoListThunk.removeTodoLists({todoListId}))
    }, [dispatch])

    const updateTodoLists = useCallback((todoListId: string, title: string) => {
        dispatch(TodoListThunk.updateTodoLists({todoListId, title}))
    }, [dispatch])



    if (!isLoginIn) {
        return <Navigate to={'/login'} />
    }


    return (
        <>
            <Grid item xs={12} mt={"30px"} display={"flex"} justifyContent={"center"}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            {todoLists.map(e => (
                <Grid key={e.id} item>
                    <Paper sx={{ padding: '15px'}}>
                        <ToDoList
                            NameToDO={e.title}
                            removeTodoList={removeTodoList}
                            changeFilter={changeFilter}
                            todoList={e}
                            updateTodoLists={updateTodoLists}
                        />
                    </Paper>
                </Grid>
            ))}
        </>
    );
};