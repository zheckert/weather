import axios from "axios"
import React, { useState } from "react"
import { useForm } from "react-hook-form"

import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import Checkbox from "@material-ui/core/Checkbox"
import Container from "@material-ui/core/Container"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
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
        padding: "20px",
        backgroundColor: "#ffffff",
        margin: theme.spacing(3)
    },
}))

export const Main = () => {
    const styles = useStyles()

    const { register, handleSubmit, errors } = useForm()
    const [ city, setCity ] = useState()
    const [ temperature, setTemperature ] = useState()
    
    const onSubmit = (data) => {
        setCity(data.city)
        getWeather(city)
    }
    
    const [ weather, setWeather ] = useState("")

    const getWeather = (city) => {
        axios.get(`https://vschool-cors.herokuapp.com?url=http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_APIKEY}&q=${city}`)
        .then((response) => {
                setWeather(response.data)
                console.log("response.data", response.data)
            })
        .catch((error => console.log(error)))
    }

    let value = 9
    let handleChange = 1

    return(    
        <div>
            <Container className={styles.root}>
                    <Card className={styles.mainCard}>
                        <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <RadioGroup aria-label="temperature" name="temperature1" value={value} onChange={handleChange}>
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
                                In {weather.location.name}, {weather.location.name === weather.location.region ? weather.location.country : weather.location.region}, it's currently {weather.current.temp_f}° Fahrenheit.                    
                            </Card>
                        }
                    </Card>
            </Container>
        </div>
    )
}