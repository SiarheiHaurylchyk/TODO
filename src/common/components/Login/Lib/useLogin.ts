import {useFormik} from "formik";
import {AuthSliceThunk} from "../AuthSlice";
import {FormikErrorType} from "../Login";
import {useAppDispatch} from "../../../../App/store/store";

export const useLogin = ()=>{
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password:'',
            rememberMe:false
        },
        onSubmit: (values) => {
            dispatch(AuthSliceThunk.loginTc({data:values}))
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
    return {
        formik,
        dispatch
    }
}