import React, {useState} from 'react';
import './App.css';
import {CircularProgress, Container, Grid, LinearProgress, Switch,} from "@mui/material";
import {ThemeProvider, createTheme, useTheme} from '@mui/material/styles';
import { red } from '@mui/material/colors';
import {IterableTodo} from "../common/components/TodoList/IterableTodo/IterableTodo";
import CustomizedSnackbars from "../common/components/SnackBar/SnackBar";
import {BrowserRouter, Route} from "react-router-dom";
import {Login} from "../common/components/Login/Login";
import {Navigate, Routes} from "react-router";
import Error from "../common/components/NavigateError/Error";
import {useSelector} from "react-redux";
import AnchorTemporaryDrawer from "../common/components/Button/MenuSettings/MenuSettings";
import {RootStateType} from "./store/store";
import {RequestStatusType} from "./AppSlice";
import { grey,yellow } from '@mui/material/colors';

export type ThemeMode = 'dark' | 'light'


let initThem =  localStorage.getItem("theme")===null ? localStorage.setItem("theme","light") : JSON.parse(localStorage.getItem("theme")||"none");


const App = React.memo(() => {


    const [themeMode, setThemeMode] = useState<ThemeMode>(initThem ? initThem : "light")



    const isInitiolized = useSelector<RootStateType, boolean>(state => state.app.setInitiolized)


    if (!isInitiolized) {
        return <div style={{position: 'fixed', top: '40%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    const themeGlobal = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#6205d2',
            },
            secondary: yellow,
        },
    })


    return (


        <ThemeProvider theme={themeGlobal} >
        <BrowserRouter>
            <div className="App" >

                <AnchorTemporaryDrawer themeMode={themeMode} setThemeMode={setThemeMode}/>
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
        </ThemeProvider>

    )

})
export default App;



