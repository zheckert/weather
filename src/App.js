import axios from "axios"
import React, { useState } from "react"
import { useForm } from "react-hook-form"

import Card from "@material-ui/core/Card"
import Container from "@material-ui/core/Container"
// import Button from "@material-ui/core/Button"
// import Paper from "@material-ui/core/Paper"

//https://material-ui.com/getting-started/installation/

//https://www.weatherapi.com/docs/

export const App = () => {
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
        })
        .catch((error => console.log(error)))
    }

    return(    
        <>
            <Container>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input
                                type="city"
                                placeholder="What city?"
                                name="city"
                                ref={register({required: true})}
                            >
                            </input>
                            {errors.city && <p>Please enter a city!</p>}
                            <input type="submit"/>
                        </form>
                    </div>
                {/* <Paper>
                    <Button onClick={()=> getWeather()}>Get It!</Button>
                </Paper> */}
                { weather && 
                    <Card>
                        In {weather.location.name}, it's currently {weather.current.temp_f}° Fahrenheit.                    
                    </Card>
                }
            </Container>
        </>
    )
}