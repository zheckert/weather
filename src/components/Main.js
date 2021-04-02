import axios from "axios"
import React, { useState } from "react"
import { useForm } from "react-hook-form"

import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import Container from "@material-ui/core/Container"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";

import { Forecast } from "./Forecast"

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
    },
    mainCard: {
        padding: theme.spacing(3),
        margin: theme.spacing(3)
    },
    radio: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row"
    },
    // Not sure if I want to do this. I'd need to add mediaqueries. For now I'd rather deploy
    // forecast: {
    //     display: "flex",
    //     justifyContent: "center",
    //     flexDirection: "row"
    // },
}))

export const Main = () => {
    const styles = useStyles()

    const { register, handleSubmit, errors } = useForm()
    const [ city, setCity ] = useState()
    const [ temperature, setTemperature ] = useState("Fahrenheit")
    const [ weather, setWeather ] = useState(undefined)

    const isWeatherLoaded = () => !!weather

    const onSubmit = (data) => {
        console.log("What's coming in thru the form?", data)
        setCity(data.city)
        getWeather(data.city)
    }
    
    const getWeather = (city) => {
        axios.get(`https://vschool-cors.herokuapp.com?url=http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_APIKEY}&q=${city}&days=3&aqi=no&alerts=no`)
        .then((response) => {
            console.log("wtf is weather", weather)
            console.log("response.data", response.data)
            setWeather(response.data)
            })
        .catch((error => console.log(error)))
    }

    //also list the day
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

    return(    
        <div>
            <Container className={styles.root}>
                    <Card className={styles.mainCard}>
                        <RadioGroup className={styles.radio} aria-label="temperature" name="temperature1" value={temperature} onChange={handleChange}>
                            <FormControlLabel value="Fahrenheit" control={<Radio />} label="Fahrenheit" />
                            <FormControlLabel value="Celcius" control={<Radio />} label="Celcius" />
                        </RadioGroup>
                        <Typography>Please enter the city you'd like data for below:</Typography>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    type="city"
                                    placeholder="What city?"
                                    name="city"
                                    ref={register({required: true})}
                                >
                            </input>
                            {errors.city && <p>Please enter a city!</p>}
                            <Button variant="contained" color="primary" disableElevation type="submit">Submit</Button>
                        </form>
                        { isWeatherLoaded() && 
                            <Card>
                                In {weather.location.name}, {weather.location.name === weather.location.region ? weather.location.country : weather.location.region}, it's currently {temperature === "Fahrenheit" ? weather.current.temp_f : weather.current.temp_c}° {temperature}.
                                <Container className={styles.forecast}>{forecast}</Container>  
                            </Card> 
                        }
                    </Card>       
            </Container>
        </div>
    )
}