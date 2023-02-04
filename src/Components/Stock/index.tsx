import React, {useCallback, useState} from 'react';
import Box from '@mui/material/Box';
import {BadgeBox} from "../BadgeBox";
import Grid from '@mui/material/Grid';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {DropDown} from '../DropDown';
import {selectedItems} from "../../constants/typings";

interface Props {
    values: selectedItems[];
    onClick: (selected: boolean, index: number, type: 'bank' | 'crypto') => void;
    type: 'bank' | 'crypto';
}
export const Stock: React.FC<Props> = ({values, onClick, type}) => {
    const [openDropDown, setOpenDropDown] = useState(false);

    const handleClickOpenDropDown = useCallback((event: React.MouseEvent<HTMLInputElement>) => {
        if (event.target === event.currentTarget) {
            setOpenDropDown(((prevValue) => !prevValue));
        }
    },[setOpenDropDown]);

    const handleClick = useCallback((selected: boolean, index: number) => {
        onClick(selected, index, type);
    },[onClick, type]);

    const handleClose = useCallback(() => {
        setOpenDropDown(false);
    }, [setOpenDropDown])

    return (
        <Box className="Stock">
            <Grid container sx={{ pt: '5px' }} onClick={handleClickOpenDropDown}>
                {values.map((value, index) => {
                    return value.selected && (
                        <BadgeBox value={value.value} index={index} onClick={handleClick}></BadgeBox>
                    )
                })}
            </Grid>
            {openDropDown && (
                <DropDown onClose={handleClose} onClick={handleClick} values={values} />
            )}
            <Box sx={{ display: 'inline-flex', ml: '10px', mt: '10px', mb: '10px' }}>
                <InfoOutlinedIcon className="info" sx={{ width: '10px', height: '10px', mr: '5px' }} />
                <p className="textStock">
                    Чтобы добавить биржу, нажмите на пустое место или {' '}
                    <span className="textStockButton" onClick={handleClickOpenDropDown}>
                        нажмите сюда
                    </span>
                </p>
            </Box>
        </Box>
    )
};