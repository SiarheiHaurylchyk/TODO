import React, {useCallback, useEffect, useState} from "react";
import {Grid, Pagination, Paper, Stack} from "@mui/material";
import ToDoList from "./ToDoList";
import {useSelector} from "react-redux";
import {AddItemForm} from "../../AddItemForm/AddItemForm";
import {Navigate} from "react-router";
import {RootStateType, useAppDispatch} from "../../../../App/store/store";
import {changeFilterAC, ChoseType, TodoListDomainType, TodoListThunk,} from "./TodoListSlice";
import {useSearchParams} from "react-router-dom";
import {useTheme} from "@mui/material/styles";


export const IterableTodo = () => {


    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const todoLists = useSelector<RootStateType, Array<TodoListDomainType>>(state => state.TodoListReducer);

    const isLoginIn = useSelector<RootStateType,boolean>(state =>state.auth.isLoginIn );

    const theme = useTheme()

    const [page,setPage]=useState("1");
    const [query,setQuery]=useState("");
    const [pageCount,setPageCount]=useState(4);

    const search = useSelector<RootStateType,string>(state => state.app.search)


    useEffect(() => {
        let PageQueryParams:{pageQ?:string} = page==="1" ? {} : {pageQ:page}
        let SearchQueryParams:{searchQ?:string} = search==="" ? {} : {searchQ:search}
        setSearchParams({...PageQueryParams, ...SearchQueryParams});
    }, [page,search]);


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

    const styles = {
        ul: {
            "& .MuiPaginationItem-root": {
                backgroundColor: theme.palette.mode === "dark" ? "#1c1c1c" : "#eeeeee",
                color: theme.palette.mode === "dark" ? "#eeeeee" : "#1c1c1c",

                "&.Mui-selected": {
                    backgroundColor: "#6c00ea",
                },
            },
        },
    };



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


    const displayedTodoLists = todoLists.slice((Number(page) - 1) * pageCount, Number(page) * pageCount);

    return (
        <div style={{display:"flex",justifyContent:"center", flexWrap:"nowrap" }}>
            <Grid container item xs={8} gap={"20px"} display={"flex"} justifyContent={"center"}>
                <Grid item xs={12} mt={"10px"} display={"flex"} justifyContent={"center"}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                {displayedTodoLists.filter((e, id) => id !== pageCount).filter(e => searchParams.get("search") ? e.title.includes(searchParams.get("search") ?? "") : e).map(tl => (
                    <Grid key={tl.id} item
                          draggable={true}
                          onDragStart={(e) => dragStartHandler(e, tl.id)}
                          onDragLeave={(e) => dragEndHandler(e)}
                          onDragEnd={(e) => dragEndHandler(e)}
                          onDragOver={(e) => dragOverHandler(e)}
                          onDrop={(e) => dropHandler(e, tl.id)}
                    >
                        <Paper sx={{padding: '15px', boxShadow: " -3px -3px 57px -16px rgba(0,0,0,0.88)"}}>
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
                <div style={{display: "flex", justifyContent: "center", marginTop: "5%", width: "100%"}}>
                    {
                        theme.palette.mode === "dark" ?
                            <Stack sx={styles.ul}>
                                <Pagination showFirstButton={true} showLastButton={true}
                                            count={Math.ceil(todoLists.length / pageCount)} hidePrevButton={true}
                                            hideNextButton={true} variant="outlined" shape="circular"
                                            onChange={(_, number) => {
                                                setPage(String(number))
                                            }}/>
                            </Stack>
                            :
                            <Stack sx={styles.ul}>
                                <Pagination showFirstButton={true} showLastButton={true}
                                            count={Math.ceil(todoLists.length / pageCount)} hidePrevButton={true}
                                            hideNextButton={true} variant="outlined" shape="circular"
                                            onChange={(_, number) => {
                                                setPage(String(number))
                                            }}/>
                            </Stack>
                    }
                </div>
            </Grid>


        </div>
    );
};