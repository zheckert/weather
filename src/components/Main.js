import axios from "axios"
import React, { useState } from "react"
import { useForm } from "react-hook-form"

import Card from "@material-ui/core/Card"
import Container from "@material-ui/core/Container"
import { Typography } from "@material-ui/core"
import Input from "@material-ui/core/Input"
// import Paper from "@material-ui/core/Paper"

import { makeStyles } from "@material-ui/core/styles";

//https://material-ui.com/getting-started/installation/

//https://www.weatherapi.com/docs/

// Next: 
// need margin
// need to fix the submit thing

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
        // backgroundImage: `url()`,
        // backgroundAttachment: "fixed",
        // backgroundSize: "cover",
        margin: theme.spacing(3,)
    },
    buttonStyling: {
        background: 'linear-gradient(45deg, #38E0B6 30%, #00C795 60%)',
        padding: theme.spacing(1),
        borderRadius: "10%",
    }
}))

//TODO MVP

//restructure app so it makes sense and isn't goofy

//Need to submit form if enter key is pressed <= this works, but NOT ON FIRST ATTEMPT for some reason. Not sure why that would be!
//Need to alert user to errors caused by entering invalid information
//Need to make it so that the submit button is a button and not an input (or just style it in general so it doesn't look horrendous)
//before deployment make sure to move API key to Netlify's key stuff

//TODO BONUS
//theme checkbox (ie dark or light)
//celcius/fahrenheit checkbox

export const Main = () => {
    const styles = useStyles()

    const { register, handleSubmit, errors } = useForm()
    const [ city, setCity ] = useState()
    
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

    return(    
        <div>
            <Container className={styles.root}>
                    <Card className={styles.mainCard}>
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
                            <Input className={styles.buttonStyling} type="submit">Submit</Input>
                        </form>
                        { weather && 
                            <Card>
                                In {weather.location.name}, {weather.location.name === weather.location.region ? weather.location.country : weather.location.region}, it's currently {weather.current.temp_f}° Fahrenheit.                    
                            </Card>
                        }
                    </Card>
                {/* <Paper>
                    <Button onClick={()=> getWeather()}>Get It!</Button>
                </Paper> */}
            </Container>
        </div>
    )
}