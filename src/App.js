import axios from "axios"
import React, { useState } from "react"

//https://material-ui.com/getting-started/installation/

//https://www.weatherapi.com/docs/

export const App = () => {
    
    const [ weather, setWeather ] = useState("")

    const getWeather = () => {
        axios.get(`https://vschool-cors.herokuapp.com?url=http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_APIKEY}&q=Utah`)
        .then((response) => {
        //    
        console.log(response.data)
            // setWeather(response.data.current.feelslike_f)
        })
        .catch((error => console.log(error)))
    }

    return(
        <>
        <div>
            It's the weather, man. We'll use an api. Also MUI, so make sure we're not using the divs
            <button onClick={()=> getWeather()}>GET IT</button>
        </div>
        <div>

            {weather}
        </div>
        </>
    )
}