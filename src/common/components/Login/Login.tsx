import React, {useEffect} from "react";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Paper, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";
import {Navigate} from "react-router";
import {RootStateType} from "../../../App/store/store";
import {setAppStatusAC} from "../../../App/AppSlice";
import {useLogin} from "./Lib/useLogin";


export type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {


    const isLoginIn = useSelector<RootStateType,boolean>(state => state.auth.isLoginIn)

    const {formik,dispatch} = useLogin()

    useEffect(() => {
        console.log("LOGIN-USEEFFECT")
        return ()=>{
            console.log("LOGIN-COMPONENT-UNMOUNT")
        }
    }, []);

    useEffect(() => {
        dispatch(setAppStatusAC({status:"idle"}))
    }, []);

    console.log(isLoginIn)


        if (isLoginIn){
            return <Navigate to="/" />;
        }



        return (
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'} >
                    <form onSubmit={formik.handleSubmit}>
                        <Paper sx={{padding:"80px",borderRadius:"10px"}}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered{" "}
                                <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email" margin="normal" {...formik.getFieldProps("email")}/>
                            {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
                            <TextField type="password" label="Password" margin="normal"  {...formik.getFieldProps("password")}/>
                            {formik.errors.password && <div>{formik.errors.password}</div>}
                            <FormControlLabel label={'Remember me'} control={<Checkbox/>} checked={formik.values.rememberMe} {...formik.getFieldProps("rememberMe")}/>
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                        </Paper>
                    </form>
                </Grid>
            </Grid>
        )
}
