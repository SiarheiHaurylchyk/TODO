import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import ButtonAppBar from "../Button/ButtonAppBar";
import {Container, Grid, LinearProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {addTodoListsTC, fetchTodoListTC, TodoListDomainType} from "../../state/TodoListReducer";
import {RootReducerType, useAppDispatch} from "../../store/store";
import {RequestStatusType} from "../../state/AppReduser";
import {IterableTodo} from "../IterableTodo/IterableTodo";
import CustomizedSnackbars from "../SnackBar/SnackBar";
import {BrowserRouter, Route} from "react-router-dom";
import {Login} from "../Login/Login";
import {Routes} from "react-router";


const App = React.memo(() => {
    const status = useSelector<RootReducerType, RequestStatusType>(state => state.app.status)


    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodoListTC())
    }, []);


    return (
        <BrowserRouter>
        <div className="App">
            <ButtonAppBar/>
            {status === "loading" && <LinearProgress color="secondary" /> }
            <CustomizedSnackbars/>
            <Container fixed>
                <Grid container>


                    <Grid container spacing={3} mt={"20px"}>
                        <Routes>
                            <Route path={"/"} element={ <IterableTodo />}/>
                            <Route path={"/login"} element={<Login/>}/>
                        </Routes>

                    </Grid>
                </Grid>

            </Container>
        </div>
        </BrowserRouter>
    );
})

export default App;



