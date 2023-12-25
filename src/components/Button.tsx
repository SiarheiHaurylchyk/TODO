import React,{MouseEvent} from 'react';


type ButtonType = {
    onClick?: () => void,
    isDisabled?: boolean,
    children?: string,
    isActive?: boolean,
    activeClass?: string
}

function Button({onClick, isDisabled,  children,isActive, activeClass}: ButtonType) {

    return (
        <button disabled={isDisabled}
                className={isActive? activeClass : ""}
                onClick={onClick}>{children}</button>
    );
}

export default Button;