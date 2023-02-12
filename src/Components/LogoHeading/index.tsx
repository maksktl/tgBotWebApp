import React from 'react';
import Box from '@mui/material/Box';

export const LogoHeading: React.FC = () => {
    return (
        <Box className="LogoHeader">
            <img className="Logo" alt="logo" />
            <h1 className="Header">АКТУАЛЬНЫЕ СВЯЗКИ ДЛЯ АРБИТРАЖА НА P2P ПЛАТФОРМАХ</h1>
        </Box>
    )
};