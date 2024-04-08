import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootStateType, useAppDispatch} from "App/store/store";


export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootStateType,
    dispatch: useAppDispatch,
    rejectValue: string|null
}>()