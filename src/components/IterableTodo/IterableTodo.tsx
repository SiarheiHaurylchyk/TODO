import {RootReducerType, useAppDispatch} from "../../store/store";
import React, {useCallback, useEffect} from "react";
import {
    addTodoListsTC,
    changeFilterAC,
    ChoseType, fetchTodoListTC,
    removeTodoListsTC,
    TodoListDomainType,
    updateTodoListsTC
} from "../../state/TodoListReducer";
import {CircularProgress, Grid, LinearProgress, Paper} from "@mui/material";
import CustomizedSnackbars from "../SnackBar/SnackBar";
import ToDoList from "../TodoList/ToDoList";
import {useSelector} from "react-redux";
import {RequestStatusType} from "../../state/AppReducer";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Navigate, useNavigate} from "react-router";


export const IterableTodo = () => {

    const dispatch = useAppDispatch();

    const todoLists = useSelector<RootReducerType, Array<TodoListDomainType>>(state => state.TodoListReducer);

    const isLoginIn = useSelector<RootReducerType,boolean>(state =>state.auth.isLoginIn );


    useEffect(() => {
        if (!isLoginIn) {
          return
        }
        dispatch(fetchTodoListTC())
    }, []);


    const addTodoList = useCallback((text: string) => {
        dispatch(addTodoListsTC(text))
    }, [dispatch])


    const changeFilter = useCallback((filter: ChoseType, todoListId: string) => {
        dispatch(changeFilterAC({filter,todoListId}));
    }, [dispatch])


    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListsTC(todoListId))
    }, [dispatch])

    const updateTodoLists = useCallback((todoListId: string, title: string) => {
        dispatch(updateTodoListsTC(todoListId, title))
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
                            key={e.id}
                            NameToDO={e.title}
                            removeTodoList={removeTodoList}
                            changeFilter={changeFilter}
                            todoLists={e}
                            updateTodoLists={updateTodoLists}
                        />
                    </Paper>
                </Grid>
            ))}
        </>
    );
};