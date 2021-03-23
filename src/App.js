import React from "react"

import { Header } from "./components/Header"
import { Main } from "./components/Main"

//https://material-ui.com/getting-started/installation/

//https://www.weatherapi.com/docs/

//TODO MVP

//restructure app so it makes sense and isn't goofy

//Need to submit form if enter key is pressed <= this works, but NOT ON FIRST ATTEMPT for some reason. Not sure why that would be!
//Need to alert user to errors caused by entering invalid information
//Need to make it so that the submit button is a button and not an input (or just style it in general so it doesn't look horrendous)
//before deployment make sure to move API key to Netlify's key stuff
//need to establish app wide color palette and shift to that

//TODO BONUS
//theme checkbox (ie dark or light)
//celcius/fahrenheit checkbox

export const App = () => {
    return(    
        <>
            <Header />
            <Main />
        </>
    )
}