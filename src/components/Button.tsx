import React from 'react';

type ButtonType = {
    onClick?: () => void,
    isDisabled?: boolean,
    children?: string,
    isActive?: boolean,
    activeClass?: string
}

function Button({onClick, isDisabled,  children,isActive}: ButtonType) {

    return (
        <button disabled={isDisabled}
                className={isActive? "active" : ""}
                onClick={onClick}>{children}</button>
    );
}

export default Button;