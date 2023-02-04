import React, {useCallback} from 'react';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
interface Props {
    value: string;
    selected: boolean;
    index: number;
    onClick: (selected: boolean, index: number) => void;
}

export const DropDownItem: React.FC<Props> = ({value,index, selected, onClick}) => {
    const handleClick = useCallback(() => {
        onClick(!selected, index);
    },[onClick, index, selected]);

    const mb = index === 7 ? '0px' : '10px';

    return (
        <Box
            className="dropItemBox"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                cursor: 'pointer',
                mr: '20px',
                mb: mb
            }}
            onClick={handleClick}
        >
            <li
                className={selected ? "selected menuItem" : "menuItem" }
                value={value}
            >
                {value}
            </li>
            {selected && (
                <CheckIcon className="check" sx={{ width: '10px', height: '21px' }} />
            )}
        </Box>
    )
};