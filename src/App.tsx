import React, {useCallback, useEffect, useState} from 'react';
import {ComboBox} from './Components/ComboBox';
import {
    initialFiat,
    initialCrypto,
    initialBanks,
    initialAggregators,
    initialAggregators1
} from './constants';
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
    const [cryptoAggregators1, setCryptoAggregators1] = useState(initialAggregators1);
    const [makerTaker, setMakerTaker] = useState('Мейкер');
    const [makerTaker1, setMakerTaker1] = useState('Мейкер');
    const [deposit, setDeposit] = useState<string>();
    const [spreadFrom, setSpreadFrom] = useState<string>();
    const [spreadTo, setSpreadTo] = useState<string>();
    const [error, setError] = useState('');

    const validateNumber = useCallback((value: string | undefined, min: number) => {
        return value !== undefined && value.match(/^-?(0|[1-9]\d*)(\.\d*)?$/) && Number(value) >= min;
    }, []);

    const handleIsActive = useCallback((index: number) => {
        if (index === 0) {
            setIsActive1(true);
            setIsActive2(false)
        } else {
            setIsActive2(true);
            setIsActive1(false);
        }
    }, [setIsActive1, setIsActive2]);

    useEffect(() => {
        const selectedFiat = fiat.find((fiat) => fiat.selected)?.value;
        if (!selectedFiat) {
            console.log('No fiat selected');
            return;
        }
        const exchangeValues = cryptoAggregators
            .filter((exchange) => exchange.selected)
            .map((exchange) => exchange.value)
            .join(',');
        const apiUrl = `/banks?exchanges=${exchangeValues}&fiat=${selectedFiat}`;
        console.log(`${process.env.REACT_APP_API_URL}`)

        fetch(apiUrl)
            .then((response) => response.json())
            .then((bankList) => {
                const newBanks = bankList.map((bank: string) => ({ value: bank, selected: false }));
                setBanks(newBanks);
            })
            .catch((error) => {
                console.error('Error fetching bank list:', error);
            });

        const exchangeValues1 = cryptoAggregators1
            .filter((exchange) => exchange.selected)
            .map((exchange) => exchange.value)
            .join(',');
        const apiUrl1 = `/banks?exchanges=${exchangeValues1}&fiat=${selectedFiat}`;

        fetch(apiUrl1)
            .then((response) => response.json())
            .then((bankList) => {
                const newBanks = bankList.map((bank: string) => ({ value: bank, selected: false }));
                setBanks1(newBanks);
            })
            .catch((error) => {
                console.error('Error fetching bank list:', error);
            });
    }, [cryptoAggregators, cryptoAggregators1, fiat]);


    const handleClick = useCallback(
        (selected: boolean, index: number, type: 'bank' | 'crypto', aggreg: 'aggreg1' | 'aggreg2') => {
            console.log(index + ' ' + selected + ' ' + type)
            const setArray = type === 'bank' ? (aggreg === 'aggreg1' ? setBanks : setBanks1) : (aggreg === 'aggreg1' ? setCryptoAggregators : setCryptoAggregators1);
            setArray(prev => {
                const updatedPrev = [...prev];
                updatedPrev[index].selected = selected;
                return updatedPrev;
            });
        }, [setBanks, setCryptoAggregators, setBanks1, setCryptoAggregators1]
    );

    const handleClickCombo = useCallback(
        (type: 'crypto' | 'fiat' | 'buy-sell', value: string, isActive: boolean, aggreg?: 'aggreg1' | 'aggreg2') => {
            const changeSelection = (selectedItems: any[], setSelected: any, item_name: string) => {
                if (isActive === false && selectedItems.filter(item => item.selected === true).length < 2) {
                    tg.showAlert('Вы должны выбрать хотя бы ' + item_name);
                } else {
                    setSelected(selectedItems.map((p) =>
                        p.value === value
                            ? {...p, selected: isActive}
                            : p
                    ));
                }
            }
            const changeSingleSelection = (selectedItems: any[], setSelected: any, item_name: string) => {
                const newSelection = selectedItems.map((p) =>
                    p.value === value
                        ? { ...p, selected: true }
                        : { ...p, selected: false }
                );
                setSelected(newSelection);
                if (!isActive && newSelection.filter((item) => item.selected).length === 0) {
                    tg.showAlert('Вы должны выбрать хотя бы ' + item_name);
                }
            };

            if (type === 'crypto') {
                changeSelection(crypto, setCrypto, 'одну криптовалюту');
            } else if (type === 'fiat') {
                changeSingleSelection(fiat, setFiat, 'один фиат');
            } else if (type === 'buy-sell') {
                if (aggreg === 'aggreg1') {
                    setMakerTaker(value);
                }
                if (aggreg === 'aggreg2') {
                    setMakerTaker1(value);
                }
            }
        },
        [setMakerTaker, setMakerTaker1, crypto, fiat, setFiat, setCrypto, tg]
    );

    const handleInputChange = useCallback((value: string, type: "deposit" | "spread_from" | "spread_to") => {
        const setValue = type === 'deposit' ? setDeposit : (type === 'spread_from' ? setSpreadFrom : setSpreadTo);
        const lastValue = type === 'deposit' ? deposit : (type === 'spread_from' ? spreadFrom : spreadTo);

        if (value === '') {
            setValue(value);
        } else if (!validateNumber(value, 0)) {
            setValue(lastValue);
        } else {
            setValue(value);
        }
    }, [setDeposit, setSpreadFrom, setSpreadTo, spreadFrom, spreadTo, validateNumber, deposit]);

    const handleInputBlur = useCallback((value: string, type: "deposit" | "spread_from" | "spread_to") => {
        let errorMessage = '';
        const setValue = type === 'deposit' ? setDeposit : (type === 'spread_from' ? setSpreadFrom : setSpreadTo);
        let textError = type === 'deposit' ? '"Депозит"' : (type === 'spread_from' ? '"Спред от"' : '"Спред до"');
        value = value === '' ? '0' : value;
        if (!validateNumber(value, 0)) {
            errorMessage = textError + ' может содержать только положительное число';
            value = '0';
        }
        setValue(value);
        if (Number(spreadFrom) > Number(spreadTo)) {
            setSpreadTo(spreadFrom);
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
            tg.showAlert(error);
            return;
        }

        const data = {
            fiatSend: fiat.filter(a => a.selected).map(a => a.value),
            cryptoSend: crypto.filter(a => a.selected).map(a => a.value),
            deposit,
            spreadFrom,
            spreadTo,
            cryptoAggregatorsSend: cryptoAggregators.filter(a => a.selected).map(a => a.value),
            makerTaker,
            banksSend: banks.filter(a => a.selected).map(a => a.value),
            cryptoAggregatorsSend1: cryptoAggregators1.filter(a => a.selected).map(a => a.value),
            makerTaker1,
            banksSend1: banks1.filter(a => a.selected).map(a => a.value)
        };
        tg.sendData(JSON.stringify(data));
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
    }, [onClose]);

    return (
        <div className="App">
            <LogoHeading/>
            <p className="label">Фиат</p>
            <ComboBox values={fiat} className={'fiat'} type={'fiat'} onClick={handleClickCombo}/>
            <p className="label">Криптовалюта</p>
            <ComboBox values={crypto} className={'crypto'} type={'crypto'} onClick={handleClickCombo}/>
            <Inputs
                onChange={handleInputChange}
                onBlur={handleInputBlur}
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