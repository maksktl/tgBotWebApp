import React from 'react';
import Box from '@mui/material/Box';

export const LogoHeading: React.FC = () => {
    return (
        <Box className="LogoHeader">
            <img className="Logo" alt="logo" />
            <h1 className="Header">Автоматизация поиска актуальных связок</h1>
        </Box>
    )
};