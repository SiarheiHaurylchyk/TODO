import * as React from 'react';
import {useContext} from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import {RootStateType, useAppDispatch} from "App/store/store";
import {useSelector} from "react-redux";
import LightOfDark from "common/LightOrDark/LightOfDark";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {ColorModeContext} from "App/ThemeTogglerHOC/ThemeTogglerHOC";
import {AuthSliceThunk} from "common/components/Login/AuthSlice";


export default function AccountMenu() {
    const colorMode = useContext(ColorModeContext);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const dispatch = useAppDispatch();
    const isLoginIn = useSelector<RootStateType, boolean>(state => state.auth.isLoginIn)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        dispatch(AuthSliceThunk.logOutTc());
        handleClose();
    }
    const changeTheme = () =>{
        colorMode.toggleColorMode()
    }
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                {isLoginIn && <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ml: 2}}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{width: 42, height: 42}}/>
                    </IconButton>
                </Tooltip>}
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 20,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                </MenuItem>

                <Divider />
                <Box  onClick={changeTheme}>
                    <MenuItem onClick={handleClose}>

                        <LightOfDark />

                    </MenuItem>
                </Box>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <InfoOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    About
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                   <div onClick={logOut} >Logout</div>
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}