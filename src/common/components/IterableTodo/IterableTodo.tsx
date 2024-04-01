import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@mui/material";
import ToDoList from "../TodoList/ToDoList";
import {useSelector} from "react-redux";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Navigate} from "react-router";
import {RootStateType, useAppDispatch} from "../../../store/store";
import {
    addTodoListsTC,
    changeFilterAC,
    ChoseType,
    fetchTodoListsTC,
    removeTodoListsTC,
    TodoListDomainType,
    updateTodoListsTC
} from "../../../store/slice/TodoListSlice";


export const IterableTodo = () => {

    const dispatch = useAppDispatch();

    const todoLists = useSelector<RootStateType, Array<TodoListDomainType>>(state => state.TodoListReducer);

    const isLoginIn = useSelector<RootStateType,boolean>(state =>state.auth.isLoginIn );



    // useEffect(() => {
    //     if (isLoginIn){
    //         dispatch(fetchTodoListsTC())
    //     }
    // }, []);


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