import React from "react";
import {Grid} from "@mui/material";
import {Input} from '../Input';

interface Props {
    deposit: string | undefined;
    spreadFrom: string | undefined;
    spreadTo: string | undefined;
    error: string;
    onChange: (value: string, type: "deposit" | "spread_from" | "spread_to") => void;
}

export const Inputs: React.FC<Props> = ({onChange, deposit, spreadFrom, spreadTo, error}) => {

    return (
        <>
            <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Input label={'Депозит'} type={"deposit"} onChange={onChange} value={deposit}/>
                <Input label={'Спред от'} type={"spread_from"} onChange={onChange} value={spreadFrom}/>
                <Input label={'Спред до'} type={"spread_to"} onChange={onChange} value={spreadTo}/>
            </Grid>
            {error.length > 1 && <p className="error">{error}</p>}
        </>
    )
};