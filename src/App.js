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
        padding: "20px"
    },
    background: {
        backgroundColor: "#ffffff",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' %3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%231928ff'/%3E%3Cstop offset='1' stop-color='%2314e4ff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpattern id='b' width='24' height='24' patternUnits='userSpaceOnUse'%3E%3Ccircle fill='%23ffffff' cx='12' cy='12' r='12'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23b)' fill-opacity='0.1'/%3E%3C/svg%3E")`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
    }
}))

//TODO MVP
//Need to submit form if enter key is pressed
//Need to alert user to errors caused by entering invalid information
//Need to make it so that the submit button is a button and not an input
//On top of making things look nice in MUI, you need to add a cool background so I don't want to vomit anymore
//before deployment make sure to move API key to Netlify's key stuff

//TODO BONUS
//theme checkbox
//celcius/fahrenheit checkbox



export const App = () => {
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
        < div className={styles.background}>
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
                            <Input type="submit">Submit</Input>
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