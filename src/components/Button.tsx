import React from 'react';

type ButtonType ={
    text:string
}
function Button(props:ButtonType) {
    return (
        <button>
            {props.text}
        </button>
    );
}

export default Button;