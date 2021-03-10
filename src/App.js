import axios from "axios"
import React from "react"
require('dotenv').config()

//https://material-ui.com/getting-started/installation/

//https://www.weatherapi.com/docs/

const getWeather = () => {
    axios.get("http://api.weatherapi.com/", {key: process.env.APIKEY})
    .then((response) => {
        console.log(response.data)
    })
    .catch((error => console.log(error)))
}

export const App = () => {
    return(
        <div>
            It's the weather, man. We'll use an api. Also MUI, so make sure we're not using the divs
            <button onClick={()=> getWeather()}>GET IT</button>
        </div>
        
    )
}