import React from 'react';
import Box from '@mui/material/Box';

interface Props {
    onClickReset(): void;
    onClickSave(): void;
}
export const ResetSetButtons: React.FC<Props> = ({onClickReset, onClickSave}) => {
    return (
        <Box className="ResetSave"
             sx={{
                 mt: '30px',
                 display: 'flex',
                 justifyContent: 'space-between',
                 alignItems: 'center'
            }
        }>
            <button className="reset" onClick={onClickReset}>Сбросить фильтр</button>
            <button className="save" onClick={onClickSave}>Сохранить связку</button>
        </Box>
    )
};