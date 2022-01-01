import { useState } from 'react'
import { IconButton } from '@mui/material'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Twitter  from './socialsTabletComponents/Twitter';
import { News } from './socialsTabletComponents/News';
import Reddit  from './socialsTabletComponents/Reddit';
import Box from '@mui/material/Box';


export function SocialsTablet() {
    const [path, setPath] = useState("/")
    const navigate: Function = useNavigate()

    function handleRight(): any{
        if (path === "/"){
            navigate("news")
            setPath('news')
        }else if (path === "news"){
            navigate("reddit")
            setPath('reddit')
        }else if (path === "reddit"){
            navigate("/Interface")
            setPath("/")
        }
    }

    function handleLeft(): any{
        if (path === "/"){
            navigate("reddit")
            setPath('reddit')
        }else if (path === "news"){
            navigate("/Interface")
            setPath('/')
        }else if (path === "reddit"){
            navigate("news")
            setPath("news")
        }
    }

    return (
        <>
            <div className = "socials">
                <h2 style={{textAlign: "center", marginBottom: "3vh", lineHeight: "1vh", marginTop:"0.5vh"}}>Socials</h2>
                <Box className = "socialsContainer">
                    <IconButton  onClick={handleLeft} style={{marginRight: "0.5vh"}} color='secondary'>
                        <ArrowBackIosNewIcon/>
                    </IconButton>

                            <div className = "socialsDisplay">
                                <Routes>
                                    <Route path = "/" element={<Twitter/>}/>
                                    <Route path = "/news" element={<News/>}/>
                                    <Route path = "/reddit" element = {<Reddit/>}/>
                                </Routes>
                            </div>

                    <IconButton  onClick ={handleRight} style={{marginLeft: "0.5vh"}} color='secondary'>
                        <ArrowForwardIosIcon/>
                    </IconButton>
                </Box>
            </div>
        </>
    )
}
