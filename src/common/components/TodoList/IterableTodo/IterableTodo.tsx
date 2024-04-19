import React, {useCallback, useEffect, useState} from "react";
import {ClassNameMap, createStyles, Grid, Pagination, Paper} from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
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
import {useSearchParams} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import {CSSProperties} from "@mui/material/styles/createMixins";


export const IterableTodo = () => {


    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const todoLists = useSelector<RootStateType, Array<TodoListDomainType>>(state => state.TodoListReducer);

    const isLoginIn = useSelector<RootStateType,boolean>(state =>state.auth.isLoginIn );

    const theme = useTheme()



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

    const useStyles = makeStyles(() =>
        createStyles({
            ul: {
                '& .MuiPaginationItem-root': {
                    backgroundColor: '#151515',
                    color: 'white',

                    '&.Mui-selected': {
                        backgroundColor: '#6c00ea',
                    },
                } as CSSProperties,
            },
        })
    );
    const classes: ClassNameMap<string> = useStyles();

    const useStyles1 = makeStyles(() =>
        createStyles({
            ul: {
                '& .MuiPaginationItem-root': {
                    backgroundColor: '#ffffff',
                    color: '#000000',

                    '&.Mui-selected': {
                        backgroundColor: '#6c00ea',
                    },
                } as CSSProperties,
            },
        })
    );
    const classes1: ClassNameMap<string> = useStyles1();

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
        <div >
        <Grid container xs={12} gap={"20px"} display={"flex"} justifyContent={"center"}>
            <Grid item xs={12} mt={"10px"} display={"flex"} justifyContent={"center"}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            {todoLists.filter(e=>searchParams.get("search")?e.title.includes(searchParams.get("search")??""):e).map(tl => (
                <Grid key={tl.id} item
                      draggable={true}
                      onDragStart={(e) => dragStartHandler(e, tl.id)}
                      onDragLeave={(e) => dragEndHandler(e)}
                      onDragEnd={(e) => dragEndHandler(e)}
                      onDragOver={(e) => dragOverHandler(e)}
                      onDrop={(e) => dropHandler(e, tl.id)}
                >
                    <Paper sx={{ padding: '15px',boxShadow: " -3px -3px 57px -16px rgba(0,0,0,0.88)"}}>
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
        </Grid>
            <div style={{display:"flex",justifyContent:"center",marginTop:"20px"}}>
            {
                theme.palette.mode === "dark" ?
                    <div className={classes.ul}>
                        <Pagination count={6} variant="outlined" shape="circular"/>
                    </div>
                    :
                    <div className={classes1.ul}>
                        <Pagination count={6} variant="outlined" shape="circular"/>
                    </div>
            }
            </div>
        </div>
    );
};