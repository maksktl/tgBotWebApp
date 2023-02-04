import React, {useCallback, useState} from "react";
import {Button} from "@mui/material";
import {selectedItems} from "../../constants/typings";

interface Props {
    values: selectedItems[];
    className: string;
    aggreg?: 'aggreg1' | 'aggreg2';
    onClick: (value: string, isActive: boolean,  aggreg: 'aggreg1' | 'aggreg2') => void;
}
export const ComboRadio: React.FC<Props> = ({values, className, onClick, aggreg}) => {
    const [isActive, setIsActive] = useState(true);

    const handleClick = useCallback(() => {
        setIsActive(((prevValue) => !prevValue));
        if(isActive) {
            onClick(values[1].value, isActive, aggreg!);
        } else {
            onClick(values[0].value, !isActive, aggreg!);
        }
    },[onClick, values, isActive, aggreg]);

    return (
        <>
            <Button
                className={isActive ? `active ${className}` : className }
                onClick={handleClick}
            >
                {values[0].value}
            </Button>
            <Button
                className={!isActive ? `active ${className}` : className }
                onClick={handleClick}
            >
                {values[1].value}
            </Button>
        </>
    )
};