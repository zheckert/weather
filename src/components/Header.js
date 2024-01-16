import React from "react"
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";

const HeaderTypography = styled(Typography)(({ theme }) => ({
    textAlign: "center",
    fontSize: "40px",
    margin: theme.spacing(2)
}));

const SubheaderTypography = styled(Typography)(({ theme }) => ({
    textAlign: "center",
    fontSize: "25px",
    margin: theme.spacing(2)
}));

export const Header = () => {
    return (
        <>
            <HeaderTypography>
                Weather App
            </HeaderTypography>
            <SubheaderTypography>
                By <a href="https://zachheckert.com/" rel="noopener noreferrer" target="_blank">Zach</a>
            </SubheaderTypography>
        </>
    )
}