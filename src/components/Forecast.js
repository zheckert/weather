import React from "react"

import { Card } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        fontSize: "40px",
        margin: theme.spacing(2)
    }
}))

export const Forecast = (props) => {
    // const styles = useStyles()

    return(

        <Card>
            <div>
                {props.date}
            </div>
            <div>
                <img src={`${props.icon}`} />
            </div>
            <div>
                {props.condition}
            </div>
            <div>
                {props.text}
            </div>
            <div>
                {props.high}
            </div>
            <div>
                {props.low}
            </div>
        </Card>
    )
}