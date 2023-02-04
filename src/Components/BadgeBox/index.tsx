import React, {useCallback} from 'react';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';

interface Props {
    value: string;
    index: number;
    onClick: (selected: boolean, index: number) => void;
}

export const BadgeBox: React.FC<Props> = ({value, index, onClick}) => {
    const handleClick = useCallback(() => {
        onClick(false, index);
    },[onClick, index]);

    return (
        <Box sx={{ mt: '10px' }}>
            <Badge badgeContent={<Box onClick={handleClick}>{'\u2715'}</Box>} sx={{"& .MuiBadge-badge": {
                    minWidth: 16,
                    height: 16,
                    padding: 0,
                }}} >
                <Grid item className="Badge" sx={{ ml: '10px' }}>
                    {value}
                </Grid>
            </Badge>
        </Box>
    )
};