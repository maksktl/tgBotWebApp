import React, {useCallback} from 'react';
import Box from '@mui/material/Box';
import {DropDownItem} from "../DropDownItem";
import {selectedItems} from "../../constants/typings";
interface Props {
    values: selectedItems[];
    onClick: (selected: boolean, index: number) => void;
    onClose: () => void;
}

export const DropDown: React.FC<Props> = ({values,onClick, onClose}) => {
    const handleClick = useCallback((selected: boolean, index: number) => {
        onClick(selected, index);
    },[onClick]);

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose])

    return (
        <Box className="DropDown" sx={{ p: '20px 10px 20px 30px' }}>
            <Box className="Slider" sx={{ overflow: 'auto', maxHeight: '140px' }}>
                {values.map((value, index) => (
                    <DropDownItem
                        key={value.value}
                        value={value.value}
                        index={index}
                        selected={value.selected}
                        onClick={handleClick}
                    />
                ))}
            </Box>
            <button className="Choose" onClick={handleClose}>Выбрать</button>
        </Box>
    )
};