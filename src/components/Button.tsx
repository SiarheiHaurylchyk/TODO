import React from 'react';
import {ChoseType} from "../App";

type ButtonType ={
    text:string
    changeFilter?:(value:ChoseType)=>void
}
function Button(props:ButtonType) {
    return (
        <button onClick={()=> {
            props.changeFilter?.(props.text.toLowerCase()==="completed"? "completed" : props.text.toLowerCase()==="active"? "active": "all")
        }}>
            {props.text}
        </button>
    );
}

export default Button;