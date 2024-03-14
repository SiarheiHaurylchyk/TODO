
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


export type initialStateType = {
    status: RequestStatusType,
    statusTask:RequestStatusType,
    statusAdd:RequestStatusType,
    error: null|string
}

const initialState:initialStateType = {
    status:'idle',
    statusTask:"idle",
    statusAdd:"idle",
    error:null
}
export const AppReduser = (state:initialStateType=initialState,action:ActionsType)=>{
    switch (action.type) {
        case 'APP/SET-STATUS':{
            return {...state,status:action.status}
        }
        case "TASK/SET-STATUS-TASK":{
            return  {...state,statusTask:action.status}
        }
        case "SET-STATUS-ADD":{
            return  {...state,statusAdd:action.status}
        }
        case 'APP/SET-ERROR':{
            return {...state,error:action.error}
        }
        default:{
            return {...state}
        }

    }

}


export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) =>
    ({ type: 'APP/SET-STATUS', status }) as const

export type SetStatusTaskActionType = ReturnType<typeof setStatusTaskAC>
export const setStatusTaskAC = (status: RequestStatusType) =>
    ({ type: 'TASK/SET-STATUS-TASK', status }) as const

export type SetStatusAddType = ReturnType<typeof setStatusAddAC>
export const setStatusAddAC = (status: RequestStatusType) =>
    ({ type: 'SET-STATUS-ADD', status }) as const


export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: null|string) => ({ type: 'APP/SET-ERROR', error }) as const




type ActionsType = SetAppStatusActionType | SetAppErrorActionType|SetStatusTaskActionType|SetStatusAddType
