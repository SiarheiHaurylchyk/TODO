import React, {ChangeEvent, useState} from "react";
import {Input} from "@mui/material";
import {RequestStatusType} from "../../../App/AppSlice";



type EditableSpanProps = {
    oldTitle: string,
    updateTasksCallbackHandler:(title:string)=>void,
    disabled?:RequestStatusType
}

export const EditableSpan = React.memo((props: EditableSpanProps)=> {

    const [changeInputOrSpan, setChangeInputOrSpan] = useState(false);
    const [title,setTitle] = useState(props.oldTitle)
    function onDoubleClick() {
        if (props.disabled !=="loading") {
            setChangeInputOrSpan(!changeInputOrSpan);
        }
    }
    const onBlur=()=> {
        if(changeInputOrSpan)props.updateTasksCallbackHandler(title);
        setChangeInputOrSpan(false);
    }
    function onChange(e:ChangeEvent<HTMLInputElement>){
        setTitle( e.currentTarget.value)
    }

    return changeInputOrSpan?
        <Input onChange={onChange} value={title} onBlur={onBlur} autoFocus disabled={props.disabled==="loading"}/> :
        <span onDoubleClick={onDoubleClick}>{props.oldTitle}</span>
})