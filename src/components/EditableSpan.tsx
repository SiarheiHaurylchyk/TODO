import React, {ChangeEvent, useState} from "react";
import {Input} from "@mui/material";

type EditableSpanProps = {
    oldTitle: string,
    updateTasksCallbackHandler:(title:string)=>void,
}

export const EditableSpan = React.memo((props: EditableSpanProps)=> {
    console.log("EditableSpan")
    const [changeInputOrSpan, setChangeInputOrSpan] = useState(false);
    const [title,setTitle] = useState(props.oldTitle)
    function onDoubleClick() {
        setChangeInputOrSpan(!changeInputOrSpan);
    }
    const onBlur=()=> {
        if(changeInputOrSpan)props.updateTasksCallbackHandler(title);
        setChangeInputOrSpan(false);
    }
    function onChange(e:ChangeEvent<HTMLInputElement>){
        setTitle( e.currentTarget.value)
    }

    return changeInputOrSpan?
        <Input onChange={onChange} value={title} onBlur={onBlur} autoFocus/> :
        <span onDoubleClick={onDoubleClick}>{props.oldTitle}</span>
})