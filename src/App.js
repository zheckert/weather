import React from "react"

import { Header } from "./components/Header"
import { Main } from "./components/Main"

//https://material-ui.com/getting-started/installation/

//https://www.weatherapi.com/docs/

//TODO MVP

//ENCRYPT THE API KEY. ON FAILED CALLS ITS VISIBLE. omg
//restructure app so it makes sense and isn't goofy


//Need to submit form if enter key is pressed <= this works, but NOT ON FIRST ATTEMPT for some reason. Not sure why that would be! ATTN ATTN ATTN THIS IS A HUGE ISSUE I THINK ITS BREAKING EVERYTHING GOTTA FIX THIS FIRST


//Need to alert user to errors caused by entering invalid information
//Need to make it so that the submit button is a button and not an input (or just style it in general so it doesn't look horrendous)
//before deployment make sure to move API key to Netlify's key stuff
//need to establish app wide color palette and shift to that
//It would seem that most people like to predict the weather with their app, so maybe I should offer a similar feature (wtf have I been doing with my life)
//I think I really need to generate a specific component instead of just dumping info. It would be a card that would list out various properties, etc. I can move the celcius/fahrenheit thingy in there, too. it will be a prop fest but it's for the best
//add the ability to adjust how many days forecast you'd like

//TODO BONUS
//theme checkbox (ie dark or light)

export const App = () => {
    return(    
        <>
            <Header />
            <Main />
        </>
    )
}