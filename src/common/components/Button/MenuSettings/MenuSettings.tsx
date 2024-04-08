import * as React from 'react';
import {createTheme, styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";
import {Settings} from "@mui/icons-material";
import {RootStateType, useAppDispatch} from "../../../../App/store/store";
import {logOutTc} from "../../Login/AuthSlice";

import {ThemeMode} from "App/App";
import LightOfDark from "common/LightOrDark/LightOfDark";
import {ClickAwayListener, CssBaseline} from "@mui/material";




type PropsType = {
    themeMode: ThemeMode,
    setThemeMode:(themeMode:ThemeMode)=>void
}


const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft({themeMode,setThemeMode}:PropsType) {

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const dispatch = useAppDispatch();
    const isLoginIn = useSelector<RootStateType, boolean>(state => state.auth.isLoginIn)


    const logOut = () => {
        dispatch(logOutTc())
    }



    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }


    return (
        <ClickAwayListener onClickAway={handleDrawerClose}>

        <Box sx={{display: 'flex'}}>
            {themeMode === "dark" ? <CssBaseline/> : ""}

            <AppBar position="fixed" open={open} >
                <Toolbar className={"boxToolbar"} style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{mr: 2, ...(open && {display: 'none'})}}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </div>

                    <div className={"login"}>

                        <div style={{display:"flex",alignItems:"center"}}>

                            <LightOfDark themeMode={themeMode} changeModeHandler={changeModeHandler}/>


                            {isLoginIn &&
                                <Button onClick={logOut} color="inherit">Log out</Button>}</div>
                        </div>


                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <div style={{fontSize:"18px"}}>Menu</div>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>

                <Divider/>
                <List>

                        <ListItemButton>
                            <Settings/>
                            <div>Settings</div>
                        </ListItemButton>

                </List>
                <Divider/>

            </Drawer>
        </Box>
        </ClickAwayListener>
    );
}