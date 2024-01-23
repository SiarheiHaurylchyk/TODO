import {Button, styled} from "@mui/material";
import React from "react";

type PropsType = {
    onClick:string
}
export const DemoPageMUI:React.FC<PropsType> = (props) =>{
    const DemoButton =styled(Button)(()=>({
        backgroundColor:"black",
        fontSize:"1em",
        borderRadius:"50%",
        "&:hover": {backgroundColor: "blue"}
    }))
    return(
        <>
        <DemoButton onClick={()=>alert("Hello world!!!")}>Click Me!</DemoButton>
        </>
    )
}