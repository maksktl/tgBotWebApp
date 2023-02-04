import React, {useCallback} from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import { ComboButton } from '../ComboButton';
import { ComboRadio } from '../ComboRadio';
import {selectedItems} from "../../constants/typings";

interface Props {
    values: selectedItems[];
    className: string;
    aggreg?: 'aggreg1' | 'aggreg2';
    type: 'crypto' | 'fiat' | 'buy-sell';
    onClick: (type: 'crypto' | 'fiat' | 'buy-sell', value: string, isActive: boolean, aggreg?: 'aggreg1' | 'aggreg2') => void;
}

export const ComboBox: React.FC<Props> = ({values, className, type, onClick, aggreg}) => {
    const handleClick = useCallback((value: string, isActive: boolean, aggreg?: 'aggreg1' | 'aggreg2') => {
        onClick(type, value, isActive, aggreg);
    },[type,onClick]);

    return (
        <ButtonGroup className="ButtonGroup">
            {type === 'buy-sell' && <ComboRadio aggreg={aggreg} className={className} values={values} onClick={handleClick}/> }
            {type !== 'buy-sell' && values.map((value) => (
                <ComboButton key={value.value} className={className} value={value} onClick={handleClick}/>
            ))}
        </ButtonGroup>
    )
};