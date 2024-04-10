import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import {ThemeMode} from "App/App";
import Button from "@mui/material/Button";

type LightOfDark = {
    themeMode:ThemeMode
    changeModeHandler:()=>void
}
const LightOfDark = ({themeMode,changeModeHandler}:LightOfDark) => {
    let locStore = JSON.stringify(themeMode)
    localStorage.setItem("theme",locStore)
    return (
        <div>
            {themeMode === "light"?< LightModeIcon onClick={changeModeHandler} sx={{marginRight:"20px"}} />: <Brightness3Icon onClick={changeModeHandler} sx={{marginRight:"20px"}} color="secondary"/>}
        </div>
    );
};

export default LightOfDark;