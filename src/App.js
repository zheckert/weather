import axios from "axios"
import React, { useState } from "react"

import Card from "@material-ui/core/Card"
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"

//https://material-ui.com/getting-started/installation/

//https://www.weatherapi.com/docs/

export const App = () => {
    
    const [ weather, setWeather ] = useState("")

    const getWeather = () => {
        axios.get(`https://vschool-cors.herokuapp.com?url=http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_APIKEY}&q=Utah`)
        .then((response) => {
            setWeather(response.data.current.feelslike_f)
        })
        .catch((error => console.log(error)))
    }

    return(
        <>
            <Container>
                <Paper>
                    <Button onClick={()=> getWeather()}>Get It!</Button>
                </Paper>
                <Card>
                    {weather}
                </Card>
            </Container>
        </>
    )
}