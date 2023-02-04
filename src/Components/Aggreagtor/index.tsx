import React, {useCallback} from 'react';
import Box from '@mui/material/Box';
import {Stock} from '../../Components/Stock';
import {ComboBox} from "../ComboBox";
import {selectedItems} from "../../constants/typings";
import {aggreg1, aggreg2} from '../../constants';

interface Props {
    label: 'aggreg1' | 'aggreg2';
    banks: selectedItems[];
    cryptoAggregators: selectedItems[];
    index: number;
    onClick: (index: number) => void;
    onClickItem: (selected: boolean, index: number, type: 'bank' | 'crypto', aggreg: 'aggreg1' | 'aggreg2') => void;
    active: boolean;
    onClickCombo: (type: 'crypto' | 'fiat' | 'buy-sell', value: string, isActive: boolean) => void;
}
export const Aggregator: React.FC<Props> = (
    {label, active,banks,cryptoAggregators, onClickItem, onClick, index, onClickCombo }
) => {

    const handleClick = useCallback(() => {
        index === 0 ? onClick(0) : onClick(1);
    },[onClick, index])

    const handleItemClick = useCallback((selected: boolean, index: number, type: 'bank' | 'crypto') => {
        onClickItem(selected, index, type, label);
    }, [onClickItem, label])

    return (
        <Box className={active ? "activeAggregator" : "Aggregator"} onClick={handleClick}>
            <p className="label">{label === 'aggreg1' ? aggreg1[0] : aggreg2[0]}</p>
            <Stock values={cryptoAggregators} type={'crypto'} onClick={handleItemClick}></Stock>
            <p className="label">{label === 'aggreg2' ? aggreg1[1] : aggreg2[1]}</p>
            <ComboBox aggreg={label} values={[{value: 'Мейкер', selected: false}, {value: 'Тейкер', selected: false}]}
                      className={'buy-sell'} type={'buy-sell'} onClick={onClickCombo}/>
            <p className="label">Способ оплаты</p>
            <Stock values={banks} type={'bank'} onClick={handleItemClick}></Stock>
        </Box>
    )
};