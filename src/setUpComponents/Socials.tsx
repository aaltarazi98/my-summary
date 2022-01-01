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
    const [twitterChecked, setTwitterChecked] = useState(false)
    const [igChecked, setIgChecked] = useState(false)
    const [redditChecked, setRedditChecked] = useState(false)

    return (
        <Routes>
            <Route path="/" element={<div>
                <h2>Let's set up your socials & news tablet</h2>
                <h3 style={{inlineSize: '40vw', overflowWrap: 'break-word'}}>This section will display your favorite media sources and news about topics you are interested in, allowing you to toggle between the various outlets.</h3>
                <Button component={Link} to="/Setup/Name" variant="text" color="secondary" size="large" startIcon={<ArrowBackIosNewIcon/>} sx={{mr: 6}}>Back</Button>
                <Button component={Link} to="twitter" variant="text" color="secondary" size="large" endIcon={<ArrowForwardIosIcon/>}>Next</Button>
            </div>}/>
            <Route path="twitter" element={<Twitter/>}/>
            <Route path="news" element={<News/>}/>
            <Route path="reddit" element={<Reddit/>}/>
            <Route path="finished" element={<Finished/>}/>

        </Routes>
    )
}
