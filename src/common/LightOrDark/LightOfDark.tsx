import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import {ThemeMode} from "App/App";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/material/styles";


const LightOfDark = () => {

    let themeMode = useTheme()

    return (

        <div>
            {themeMode.palette.mode === "light"
                ?
                <span style={{display:"flex"}}>< LightModeIcon fontSize="small" sx={{ marginRight:"12px"}} /> <span>Change Theme</span> </span>
                :
                <span style={{display:"flex"}}> <Brightness3Icon fontSize="small" sx={{marginRight:"12px"}} color="secondary"/> <span>Change Theme</span> </span>}
        </div>
    );
};

export default LightOfDark;