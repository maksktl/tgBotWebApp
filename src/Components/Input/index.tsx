import React, {useCallback} from "react";
import {Grid} from "@mui/material";

interface Props {
    value: string | undefined;
    label: string;
    type: "deposit" | "spread_from" | "spread_to";
    onChange: (value: string, type: "deposit" | "spread_from" | "spread_to") => void;
}


export const Input: React.FC<Props> = ({label, type, onChange, value}) => {

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value, type);
    },[onChange, type]);

    return (
        <Grid item>
            <p className="label">{label}</p>
            <input onChange={handleChange} value={value}/>
        </Grid>
    )
};