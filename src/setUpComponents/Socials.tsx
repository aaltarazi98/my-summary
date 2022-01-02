import {useState} from 'react'
import {Button} from '@mui/material'
import {Link, Routes, Route} from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {Twitter} from './socialsComponents/Twitter'
import {News} from './socialsComponents/News'
import {Reddit} from './socialsComponents/Reddit'
import {Finished} from './socialsComponents/Finished'

export function Socials() {

    return (
        <Routes>
            <Route path="/" element={<div className='flexCol'>
                <h2 className='tooltip'>Set up your socials & news tablet</h2>
                <h3 className='tooltip'>This displays your favorite media sources and news about topics you are interested in</h3>
                <div className = "flexRow">
                    <Button component={Link} to="/Setup/Name" variant="text" color="secondary" size="large" startIcon={<ArrowBackIosNewIcon/>} sx={{mr: 6}}>Back</Button>
                    <Button component={Link} to="twitter" variant="text" color="secondary" size="large" endIcon={<ArrowForwardIosIcon/>}>Next</Button>
                </div>
            </div>}/>
            <Route path="twitter" element={<Twitter/>}/>
            <Route path="news" element={<News/>}/>
            <Route path="reddit" element={<Reddit/>}/>
            <Route path="finished" element={<Finished/>}/>

        </Routes>
    )
}
