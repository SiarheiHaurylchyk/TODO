import React, {ChangeEvent, useState} from "react";

type EditableSpanProps = {
    oldTitle: string,
    updateTasksObjHandler:(title:string)=>void,
}

export function EditableSpan(props: EditableSpanProps) {
    const [changeInputOrSpan, setChangeInputOrSpan] = useState(false);
    const [title,setTitle] = useState(props.oldTitle)
    function onDoubleClick() {
        setChangeInputOrSpan(!changeInputOrSpan);
    }
    function onBlur() {
        if(changeInputOrSpan)props.updateTasksObjHandler(title);
        setChangeInputOrSpan(false);
    }
    function onChange(e:ChangeEvent<HTMLInputElement>){
        setTitle( e.currentTarget.value)
    }
    return changeInputOrSpan?
        <input onChange={onChange} value={title} onBlur={onBlur} autoFocus/> :
        <span onDoubleClick={onDoubleClick}>{props.oldTitle}</span>
}