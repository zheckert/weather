import React from "react"

import { Header } from "./components/Header"
import { Main } from "./components/Main"

//https://material-ui.com/getting-started/installation/

//https://www.weatherapi.com/docs/

//TODO MVP

//before deployment make sure to move API key to Netlify's key stuff
//add the ability to adjust how many days forecast you'd like

function App() {
    return(    
        <>
            <Header />
            <Main />
        </>
    )
}

export default App;