/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, ChangeEvent } from "react";
import burger from "../../../assets/burger.svg";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function LandingPage() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [user, setUser] = useState<any>({ name: '' });
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        getUser();
    }, [])

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/adminlogin");
    };

    const getUser = async () => {
        try {
            const response = await fetch("https://convincing-mab-justinganteng-781d7896.koyeb.app/api/v1/whoami", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error("Authorization failed");
            }
            const data = await response.json();
            setUser(data);

            if (data.role === "user") {
                navigate("/unauthorized");
            }
        }
        catch (error) {
            console.log(error);
            navigate("/adminlogin");
        }
    }



    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

   
    return (
        <>
            <div className="headerAdmin">
                    <div className="rectangleAdmin">
                    </div>
                    <div className="burgerIcon">
                        <img src={burger} alt="Burger Icon" />
                    </div>
                    <form className="d-flex" role="search">
                        <input type="search" placeholder="Search" aria-label="Search" onChange={handleSearchChange} value={searchTerm} />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <div className="currentUser">
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem key='Logout' onClick={handleLogout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        <div className="userName font">
                            {user.name}
                        </div>
                    </div>
                </div>
        </>)
}