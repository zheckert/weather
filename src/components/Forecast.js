import React from "react"

import { Card } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        fontSize: "20px",
        margin: theme.spacing(2),
        padding: theme.spacing(1.5)
    }
}))

export const Forecast = (props) => {
    const styles = useStyles()

    return(

        <Card className={styles.root}>
            <div>
                {props.date}
            </div>
            <div>
                <img src={`${props.icon}`} alt={props.condition}/>
            </div>
            <div>
                {props.condition}
            </div>
            <div>
                {props.text}
            </div>                
                <div>
                High: {props.high}°
                </div>            
            <div>
                Low: {props.low}°
            </div>
        </Card>
    )
}