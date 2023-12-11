import React from 'react';

type ButtonType ={
    text:string
    changeFilter?:Function
}
function Button(props:ButtonType) {
    return (
        <button onClick={()=> {
            if (!props.changeFilter) return
            props.changeFilter(props.text.toLowerCase())
            // if (props.changeFilter) {
            //     props.changeFilter(props.text.toLowerCase())
            // }
            // props.changeFilter?.(props.text.toLowerCase())
        }}>
            {props.text}
        </button>
    );
}

export default Button;