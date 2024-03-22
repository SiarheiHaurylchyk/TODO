import React, {useEffect} from 'react';
import './App.css';
import ButtonAppBar from "../Button/ButtonAppBar";
import {CircularProgress, Container, Grid, LinearProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {RootReducerType, useAppDispatch} from "../../store/store";
import {initializeAppTC, RequestStatusType} from "../../state/AppReducer";
import {IterableTodo} from "../IterableTodo/IterableTodo";
import CustomizedSnackbars from "../SnackBar/SnackBar";
import {BrowserRouter, Route} from "react-router-dom";
import {Login} from "../Login/Login";
import {Navigate, Routes} from "react-router";
import Error from "../NavigateError/Error";



const App = React.memo(() => {
    const status = useSelector<RootReducerType, RequestStatusType>(state => state.app.status)

    const isInitiolized = useSelector<RootReducerType,boolean>(state => state.app.setInitiolized )



    const dispatch = useAppDispatch()


    useEffect(() => {
            dispatch(initializeAppTC())
    }, []);

    if (!isInitiolized) {
        return <div style={{position: 'fixed', top: '40%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ButtonAppBar/>
                {status === "loading" && <LinearProgress color="secondary" /> }
            <CustomizedSnackbars/>
            <Container fixed>
                <Grid container>
                    <Grid container spacing={3} mt={"10%"} justifyContent={"center"} >
                        <Routes>
                            <Route path={"/"} element={ <IterableTodo />}/>
                            <Route path={"/login"} element={<Login/>}/>
                            <Route path={'404'} element={<Error/>}/>
                            <Route path={'*'} element={<Navigate to={'404'}/>}/>
                        </Routes>

                    </Grid>
                </Grid>

            </Container>
        </div>
        </BrowserRouter>
    );
})

export default App;



