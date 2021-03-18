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
    whatever: {
        padding: "20px"
    }
}))

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
            // console.log(response.data)
        })
        .catch((error => console.log(error)))
    }

    return(    
        <>
            <Container className={styles.root}>
                    <Card className={styles.whatever}>
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
                                In {weather.location.name}, it's currently {weather.current.temp_f}° Fahrenheit.                    
                            </Card>
                        }
                    </Card>
                {/* <Paper>
                    <Button onClick={()=> getWeather()}>Get It!</Button>
                </Paper> */}
            </Container>
        </>
    )
}