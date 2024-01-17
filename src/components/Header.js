import React from "react"
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import GitHubIcon from '@mui/icons-material/GitHub';

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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  }}>
                    <div>
                    By Zach
                    </div>
                    <div style={{ textDecoration: 'none', marginLeft: '8px', paddingTop: '6px'}}>
                    <a href="https://github.com/zheckert/weather" rel="noopener noreferrer" target="_blank" >
                        <GitHubIcon />
                    </a>
                    </div>
                </div>
            </SubheaderTypography>
        </>
    )
}