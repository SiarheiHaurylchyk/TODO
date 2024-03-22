import React, {useEffect} from "react";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Paper, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import {RootReducerType, useAppDispatch} from "../../store/store";
import {loginTc} from "../../state/AuthReducer";
import {useSelector} from "react-redux";

import {Navigate} from "react-router";
import {setAppStatusAC} from "../../state/AppReducer";



export type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

        const dispatch = useAppDispatch();

        const isLoginIn = useSelector<RootReducerType,boolean>(state => state.auth.isLoginIn)

    useEffect(() => {
        dispatch(setAppStatusAC("idle"))
    }, []);

    console.log(isLoginIn)
        const formik = useFormik({
            initialValues: {
                email: '',
                password:'',
                rememberMe:false
            },
            onSubmit: (values) => {
                dispatch(loginTc(values))
            },
            validate:(values)=>{
                const errors:FormikErrorType = {}

                if (!values.email) {
                    errors.email = 'Required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }

                if (!values.password) {
                    errors.password = 'Required';
                } else if (values.password.length < 4) {
                    errors.password = 'Must be 4 characters or more';
                }
                return errors;
            }
        });

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
                            {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}
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
