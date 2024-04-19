import React from 'react';
import './App.css';
import {CircularProgress, Container, Grid,} from "@mui/material";
import {IterableTodo} from "../common/components/TodoList/IterableTodo/IterableTodo";
import CustomizedSnackbars from "../common/components/SnackBar/SnackBar";
import {BrowserRouter, Route} from "react-router-dom";
import {Login} from "../common/components/Login/Login";
import {Navigate, Routes} from "react-router";
import Error from "../common/components/NavigateError/Error";
import {useSelector} from "react-redux";
import AnchorTemporaryDrawer from "../common/components/ButtonAndMenu/MenuSettings/MenuSettings";
import {RootStateType} from "./store/store";

export type ThemeMode = 'dark' | 'light'





const App = React.memo(() => {

    const isInitiolized = useSelector<RootStateType, boolean>(state => state.app.setInitiolized)


    if (!isInitiolized) {
        return <div style={{position: 'fixed', top: '40%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (

        <BrowserRouter>
            <div className="App">
                <AnchorTemporaryDrawer />
                <CustomizedSnackbars/>


                <Container fixed>

                    <Grid container>
                        <Grid container spacing={3} mt={"10%"} justifyContent={"center"}>
                            <Routes>
                                <Route path={"/"} element={<IterableTodo/>}/>
                                <Route path={"/login"} element={<Login/>}/>
                                <Route path={'404'} element={<Error/>}/>
                                <Route path={'*'} element={<Navigate to={'404'}/>}/>
                            </Routes>

                        </Grid>
                    </Grid>

                </Container>
            </div>

        </BrowserRouter>

    )

})
export default App;



