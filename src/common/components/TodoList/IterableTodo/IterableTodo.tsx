import React, {useCallback, useState} from "react";
import {Grid, Paper} from "@mui/material";
import ToDoList from "./ToDoList";
import {useSelector} from "react-redux";
import {AddItemForm} from "../../AddItemForm/AddItemForm";
import {Navigate} from "react-router";
import {RootStateType, useAppDispatch} from "../../../../App/store/store";
import {
    changeFilterAC,
    ChoseType,
    TodoListDomainType,
    TodoListThunk,
} from "./TodoListSlice";






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

    const [dropId, setDropId] = useState("");


    if (!isLoginIn) {
        return <Navigate to={'/login'} />
    }

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, startDragId: string) {
        setDropId(startDragId)
        console.log('DRAGGING-ID', startDragId)
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
    }

    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
    }

    function dropHandler(e: React.DragEvent<HTMLDivElement>, endShiftId: string) {
        e.preventDefault()
        dispatch(TodoListThunk.reorderTodolistTC({endShiftId: endShiftId, startDragId: dropId}))
    }

    return (
        <>
            <Grid item xs={12} mt={"30px"} display={"flex"} justifyContent={"center"}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            {todoLists.map(tl => (
                <Grid key={tl.id} item
                      draggable={true}
                      onDragStart={(e) => dragStartHandler(e, tl.id)}
                      onDragLeave={(e) => dragEndHandler(e)}
                      onDragEnd={(e) => dragEndHandler(e)}
                      onDragOver={(e) => dragOverHandler(e)}
                      onDrop={(e) => dropHandler(e, tl.id)}
                >
                    <Paper sx={{ padding: '15px'}}>
                        <ToDoList
                            NameToDO={tl.title}
                            removeTodoList={removeTodoList}
                            changeFilter={changeFilter}
                            todoList={tl}
                            updateTodoLists={updateTodoLists}
                        />
                    </Paper>
                </Grid>
            ))}
        </>
    );
};