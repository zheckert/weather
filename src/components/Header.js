import React from "react"

import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        fontSize: "40px",
        margin: theme.spacing(2)
    }
}))

export const Header = () => {
    const styles = useStyles()

    return(
        <Typography className={styles.root}>
            Weather App
        </Typography>
    )
}