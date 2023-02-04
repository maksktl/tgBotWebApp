import React, {useCallback} from "react";
import {Button} from "@mui/material";
import {selectedItems} from "../../constants/typings";

interface Props {
    values: selectedItems[];
    className: string;
    aggreg?: 'aggreg1' | 'aggreg2';
    onClick: (value: string, isActive: boolean,  aggreg: 'aggreg1' | 'aggreg2') => void;
}
export const ComboRadio: React.FC<Props> = ({values, className, onClick, aggreg}) => {
    const handleClickMaker = useCallback(() => {
        if(!values[0].selected) {
            if(values[1].selected) {
                onClick(values[0].value, values[0].selected, aggreg!);
            } else {
                onClick(values[1].value, values[1].selected, aggreg!);
            }
        }
    },[onClick, values, aggreg]);

    const handleClickTaker = useCallback(() => {
        if(!values[1].selected) {
            if(values[0].selected) {
                onClick(values[1].value, values[1].selected, aggreg!);
            } else {
                onClick(values[0].value, values[0].selected, aggreg!);
            }
        }
    },[onClick, values, aggreg]);

    return (
        <>
            <Button
                className={values[0].selected ? `active ${className}` : className }
                onClick={handleClickMaker}
            >
                {values[0].value}
            </Button>
            <Button
                className={values[1].selected ? `active ${className}` : className }
                onClick={handleClickTaker}
            >
                {values[1].value}
            </Button>
        </>
    )
};