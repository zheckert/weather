import axios from "axios"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import { Forecast } from "./Forecast"

const MainContainer = styled(Container)(({ theme }) => ({
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
}));

const MainCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(3),
    margin: theme.spacing(3)
}));

const RadioGroupWrapper = styled(RadioGroup)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    flexDirection: "row"
}));

export const Main = () => {
    const { register, handleSubmit, errors } = useForm()
    const [setCity] = useState()
    const [temperature, setTemperature] = useState("Fahrenheit")
    const [weather, setWeather] = useState(undefined)

    const isWeatherLoaded = () => !!weather

    const onSubmit = (data) => {
        setCity(data.city)
        getWeather(data.city)
    }

    const getWeather = (city) => {
        const apiKey = process.env.REACT_APP_APIKEY;
        const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`;

        axios.get(apiUrl)
            .then((response) => {
                setWeather(response.data)
            })
            .catch((error => console.log(error)))
    }

    const forecast = isWeatherLoaded() && weather.forecast.forecastday.map((forecastData) =>
        <Forecast
            key={forecastData.date}
            date={forecastData.date}
            icon={forecastData.day.condition.icon}
            text={forecastData.day.condition.text}
            condition={forecastData.condition}
            high={temperature === "Fahrenheit" ? forecastData.day.maxtemp_f : forecastData.day.maxtemp_c}
            low={temperature === "Fahrenheit" ? forecastData.day.mintemp_f : forecastData.day.mintemp_c}
        />
    )

    const handleChange = (e) => {
        setTemperature(e.target.value);
    };

    return (
        <MainContainer>
            <MainCard>
                <RadioGroupWrapper aria-label="temperature" name="temperature1" value={temperature} onChange={handleChange}>
                    <FormControlLabel value="Fahrenheit" control={<Radio />} label="Fahrenheit" />
                    <FormControlLabel value="Celcius" control={<Radio />} label="Celcius" />
                </RadioGroupWrapper>
                <Typography>Please enter the city you'd like data for below:</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="city"
                        placeholder="What city?"
                        name="city"
                        {...register('city', { required: true })}
                        style={{
                            paddingTop: '6px',
                            paddingBottom: '9px',
                            marginTop: '10px',
                            marginRight: '5px',
                            fontSize: '15px',
                        }}
                    />
                    {errors?.city && <p>Please enter a city!</p>}
                    <Button variant="contained" color="primary" disableElevation type="submit">Submit</Button>
                </form>
                {isWeatherLoaded() &&
                    <Card>
                        In {weather.location.name}, {weather.location.name === weather.location.region ? weather.location.country : weather.location.region}, it's currently {temperature === "Fahrenheit" ? weather.current.temp_f : weather.current.temp_c}° {temperature}.
                        <MainContainer>{forecast}</MainContainer>
                    </Card>
                }
            </MainCard>
        </MainContainer>
    )
}
