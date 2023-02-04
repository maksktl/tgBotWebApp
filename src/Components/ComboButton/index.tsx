import React, {useCallback} from "react";
import {Button} from "@mui/material";
import {selectedItems} from "../../constants/typings";

interface Props {
    value: selectedItems;
    className: string;
    onClick: (value: string, isActive: boolean) => void;
}
export const ComboButton: React.FC<Props> = ({value, className, onClick}) => {
    const handleClick = useCallback(() => {
        onClick(value.value, !value.selected);
    },[onClick, value]);

    return (
        <Button
            className={value.selected ? `active ${className}` : className }
            onClick={handleClick}
        >
            {value.value}
        </Button>
    )
};