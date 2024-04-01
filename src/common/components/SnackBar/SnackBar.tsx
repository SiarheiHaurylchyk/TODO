import * as React from 'react';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useSelector} from "react-redux";
import {RootStateType, useAppDispatch} from "../../../store/store";
import {setAppErrorAC} from "../../../store/slice/AppSlice";


export default function CustomizedSnackbars() {
    // const [open, setOpen] = React.useState(false);
    const error = useSelector<RootStateType,null|string>(state=>state.app.error);
    const dispath = useAppDispatch();


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispath(setAppErrorAC({error:null}))
    };


    return (
        <div>

            <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose} >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%'}}
                >
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}