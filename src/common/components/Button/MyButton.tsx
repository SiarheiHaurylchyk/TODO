import React from 'react';
import {Button} from "@mui/material";

type ButtonType = {
    onClick?: () => void,
    isDisabled?: boolean,
    children?: string,
    isActive?: boolean,
    activeClass?: string
}

function MyButton({onClick, isDisabled,  children,isActive}: ButtonType) {

    return (
        <>
            <Button variant={isActive? "contained": "outlined"}
                    size={"small"}
                    disabled={isDisabled}
                    onClick={onClick}>{children}
            </Button>
        </>

    );
}

export default MyButton;