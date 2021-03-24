import axios from "axios"
import React, { useState } from "react"
import { useForm } from "react-hook-form"

import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import Container from "@material-ui/core/Container"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

// import Input from "@material-ui/core/Input"

import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";

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
}))

export const Main = () => {
    const styles = useStyles()

    const { register, handleSubmit, errors } = useForm()
    const [ city, setCity ] = useState()
    const [ temperature, setTemperature ] = useState("Fahrenheit")
    
    const onSubmit = (data) => {
        setCity(data.city)
        getWeather(city)
    }
    
    const [ weather, setWeather ] = useState("")

    const getWeather = (city) => {
        
        axios.get(`https://vschool-cors.herokuapp.com?url=http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_APIKEY}&q=${city}&days=1&aqi=no&alerts=no`)
        .then((response) => {
                setWeather(response.data)
                console.log("response.data", response.data)
            })
        .catch((error => console.log(error)))
    }

    // const getWeather = (city) => {
    //     axios.get(`https://vschool-cors.herokuapp.com?url=http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_APIKEY}&q=${city}`)
    //     .then((response) => {
    //             console.log("response.data", response.data)
    //         })
    //     .catch((error => console.log(error)))
    // }

    const handleChange = (e) => {
        setTemperature(e.target.value);
    };

    return(    
        <div>
            <Container className={styles.root}>
                    <Card className={styles.mainCard}>
                        {/* <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }}
                        /> */}
                        <RadioGroup aria-label="temperature" name="temperature1" value={temperature} onChange={handleChange}>
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
                        { weather && 
                            <Card>
                                In {weather.location.name}, {weather.location.name === weather.location.region ? weather.location.country : weather.location.region}, it's currently {temperature === "Fahrenheit" ? weather.current.temp_f : weather.current.temp_c}° {temperature}.                    
                            </Card>
                        }
                    </Card>
            </Container>
        </div>
    )
}