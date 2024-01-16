import React from "react"

import { styled } from "@mui/system";
import Card from "@mui/material/Card";

const ForecastCard = styled(Card)(({ theme }) => ({
    textAlign: "center",
    fontSize: "20px",
    margin: theme.spacing(2),
    padding: theme.spacing(1.5)
}));

export const Forecast = (props) => {
    return (
        <ForecastCard>
            <div>
                {props.date}
            </div>
            <div>
                <img src={`${props.icon}`} alt={props.condition} />
            </div>
            <div>
                {props.condition}
            </div>
            <div>
                {props.text}
            </div>
            <div>
                High: {props.high}°
            </div>
            <div>
                Low: {props.low}°
            </div>
        </ForecastCard>
    )
}