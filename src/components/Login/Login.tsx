import React from "react";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useFormik} from "formik";


export const Login = () => {

        const formik = useFormik({
            initialValues: {
                email: '',
                pasword:'',
                rememberMe:false
            },
            onSubmit: values => {
                alert(JSON.stringify(values));
            },
        });


        return (
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'}>
                    <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered
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
                            <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps("password")}/>
                            <FormControlLabel label={'Remember me'} control={<Checkbox/>} {...formik.getFieldProps("remember me")}/>
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                    </form>
                </Grid>
            </Grid>
        )
}
