import React, {useCallback, useState} from 'react';
import {ComboBox} from './Components/ComboBox';
import {initialFiat, initialCrypto, initialBanks, initialAggregators} from './constants';
import './App.scss';
import {Inputs} from './Components/Inputs';
import {Aggregator} from "./Components/Aggreagtor";
import {LogoHeading} from "./Components/LogoHeading";
import {ResetSetButtons} from "./Components/ResetSetButtons";
import {useTelegram} from './hooks/useTelegram';

function App() {
    const {tg, onClose} = useTelegram();
    const [isActive1, setIsActive1] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [banks, setBanks] = useState(initialBanks);
    const [banks1, setBanks1] = useState(initialBanks);
    const [fiat, setFiat] = useState(initialFiat);
    const [crypto, setCrypto] = useState(initialCrypto);
    const [cryptoAggregators, setCryptoAggregators] = useState(initialAggregators);
    const [cryptoAggregators1, setCryptoAggregators1] = useState(initialAggregators);
    const [makerTaker, setMakerTaker] = useState('Мейкер');
    const [makerTaker1, setMakerTaker1] = useState('Мейкер');
    const [deposit, setDeposit] = useState<string>();
    const [spreadFrom, setSpreadFrom] = useState<string>();
    const [spreadTo, setSpreadTo] = useState<string>();
    const [error, setError] = useState('');

    const validateNumber = useCallback( (value: string | undefined, min: number) => {
        return value !== undefined && value.match(/^\d{1,}(\.\d{0,4})?$/) && Number(value) >= min;
    }, []);

    const handleIsActive = useCallback((index: number) => {
        if (index === 0) {
            setIsActive1(true);
            setIsActive2(false)
        } else {
            setIsActive2(true);
            setIsActive1(false);
        }
    },[setIsActive1, setIsActive2]);

    const handleClick = useCallback(
        (selected: boolean, index: number, type: 'bank' | 'crypto', aggreg: 'aggreg1' | 'aggreg2') => {
            const setArray = type === 'bank' ? (aggreg === 'aggreg1' ? setBanks : setBanks1) : (aggreg === 'aggreg1' ? setCryptoAggregators : setCryptoAggregators1);
            setArray((prev) =>
                prev.map((item, i) => {
                    if (i !== index) {
                        return item;
                    }
                    const temp = Object.assign({}, item, { selected: selected });
                    return temp;
                })
            );
        }, [setBanks, setCryptoAggregators, setBanks1, setCryptoAggregators1]
    );

    const handleClickCombo = useCallback(
        (type: 'crypto' | 'fiat' | 'buy-sell', value: string, isActive: boolean, aggreg?: 'aggreg1' | 'aggreg2') => {
            const changeSelection = (selectedItems: any[], setSelected: any, item_name: string) => {
                if(isActive === false && selectedItems.filter(item => item.selected === true).length < 2) {
                    alert('Вы должны выбрать хотя бы ' + item_name);
                } else {
                    setSelected(selectedItems.map((p) =>
                        p.value === value
                            ? {...p, selected: isActive}
                            : p
                    ));
                }
            }

            if(type === 'crypto') {
                changeSelection(crypto, setCrypto, 'одну криптовалюту');
            } else if(type === 'fiat') {
                changeSelection(fiat, setFiat, 'один фиат');
            } else if(type === 'buy-sell') {
                if(aggreg === 'aggreg1') {
                    setMakerTaker(value);
                }
                if(aggreg === 'aggreg2') {
                    setMakerTaker1(value);
                }
            }
        },
        [setMakerTaker, setMakerTaker1, crypto, fiat, setFiat, setCrypto]
    );

    const handleInputChange = useCallback((value: string, type: "deposit" | "spread_from" | "spread_to") => {
        let errorMessage = '';

        if (type === 'deposit') {
            if (!validateNumber(value, 0)) {
                errorMessage = 'Депозит может содержать только число, превышающее 0';
            } else {
                setDeposit(value);
            }
        } else if (type === 'spread_from') {
            if (!validateNumber(value, 0)) {
                errorMessage = 'Спред от может содержать только число, превышающее 0';
            } else if (Number(value) > Number(spreadTo)) {
                errorMessage = 'Спред до должен превышать спред от';
            } else {
                setSpreadFrom(value);
            }
        } else if (type === 'spread_to') {
            if (!validateNumber(value, 0)) {
                errorMessage = 'Спред до может содержать только число, превышающее 0';
            } else if (Number(value) <= Number(spreadFrom)) {
                errorMessage = 'Спред до должен превышать спред от';
            } else {
                setSpreadTo(value);
            }
        }

        setError(errorMessage);
    }, [setDeposit, setSpreadFrom, setSpreadTo, spreadFrom, spreadTo, validateNumber]);

    const handleResetClick = useCallback(() => {
        setBanks(initialBanks);
        setBanks1(initialBanks);
        setCryptoAggregators(initialAggregators);
        setCryptoAggregators1(initialAggregators);
        setMakerTaker('Мейкер');
        setMakerTaker1('Мейкер');
        setFiat(initialFiat);
        setCrypto(initialCrypto);
        setDeposit('0');
        setSpreadFrom('0');
        setSpreadTo('0');
    }, [setCryptoAggregators, setCryptoAggregators1, setMakerTaker, setMakerTaker1,
        setFiat, setCrypto, setDeposit, setSpreadFrom, setSpreadTo]);


    const validateInputs = useCallback(() => {
        if (!cryptoAggregators.find(e => e.selected)) return 'Пожалуйста выберите первую биржу';
        if (!cryptoAggregators1.find(e => e.selected)) return 'Пожалуйста выберите вторую биржу';
        if (!fiat.find(e => e.selected)) return 'Пожалуйста выберите фиат';
        if (!crypto.find(e => e.selected)) return 'Пожалуйста выберите криптовалюту';
        if (!validateNumber(deposit, 0)) return 'Пожалуйста заполните депозит числом больше 0';
        if (!validateNumber(spreadFrom, 0)) return 'Пожалуйста заполните спред от числом больше 0';
        if (!validateNumber(spreadTo, 0)) return 'Пожалуйста заполните спред до числом больше 0';
        if (Number(spreadFrom) >= Number(spreadTo)) return 'Спред до должен превышать спред от';
        return '';
    }, [cryptoAggregators, cryptoAggregators1, fiat, crypto, deposit, spreadFrom, spreadTo, validateNumber]);

    const handleSaveClick = useCallback(() => {
        const error = validateInputs();
        if (error) {
            alert(error);
            return;
        }

        const data = {
            fiatSend: fiat.filter(a => a.selected),
            cryptoSend: crypto.filter(a => a.selected),
            deposit,
            spreadFrom,
            spreadTo,
            cryptoAggregatorsSend: cryptoAggregators.filter(a => a.selected),
            makerTaker,
            banksSend: banks.filter(a => a.selected),
            cryptoAggregatorsSend1: cryptoAggregators1.filter(a => a.selected),
            makerTaker1,
            banksSend1: banks1.filter(a => a.selected)
        };
        tg.sendData(JSON.stringify(data));
        alert('Saved');
    }, [
        cryptoAggregators,
        cryptoAggregators1,
        fiat,
        crypto,
        deposit,
        spreadFrom,
        spreadTo,
        makerTaker,
        makerTaker1,
        banks,
        banks1,
        tg,
        validateInputs
    ]);

    const handleCloseButton = useCallback(() => {
        onClose();
    },[onClose]);

    return (
        <div className="App">
            <LogoHeading />
            <p className="label">Фиат</p>
            <ComboBox values={fiat} className={'fiat'} type={'fiat'} onClick={handleClickCombo}/>
            <p className="label">Криптовалюта</p>
            <ComboBox values={crypto} className={'crypto'} type={'crypto'} onClick={handleClickCombo}/>
            <Inputs
                onChange={handleInputChange}
                deposit={deposit}
                spreadFrom={spreadFrom}
                spreadTo={spreadTo}
                error={error}
            ></Inputs>
            <Aggregator
                makerTaker={makerTaker}
                makerTaker1={makerTaker1}
                label={'aggreg1'}
                active={isActive1}
                onClick={handleIsActive}
                onClickItem={handleClick}
                banks={banks}
                index={0}
                cryptoAggregators={cryptoAggregators}
                onClickCombo={handleClickCombo}
            ></Aggregator>
            <Aggregator
                makerTaker={makerTaker1}
                makerTaker1={makerTaker1}
                label={'aggreg2'}
                active={isActive2}
                onClick={handleIsActive}
                onClickItem={handleClick}
                banks={banks1}
                index={1}
                onClickCombo={handleClickCombo}
                cryptoAggregators={cryptoAggregators1}
            ></Aggregator>
            <ResetSetButtons onClickReset={handleResetClick} onClickSave={handleSaveClick}></ResetSetButtons>
            <button className="return" onClick={handleCloseButton}>Вернуться назад</button>
        </div>
    );
}

export default App;