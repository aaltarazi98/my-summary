import  {useState} from 'react'
import {Button, TextField} from '@mui/material'
import {Link} from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export function Reddit() {
    const list: string = JSON.parse(localStorage.getItem('subs') || '[]').join(', ')
    const [subs, setSubs] = useState(list)

    function handleNext():void{
        const subsArr: string[] = subs.split(",").map( sub=>{
            if (sub[0]===" ") return sub.slice(1)
            else return sub
        })
        const subsJSON: string = JSON.stringify(subsArr)
        localStorage.setItem('subs', subsJSON)
    }

    return (
        <div>
            <h2>Reddit</h2>
            <h3 style={{inlineSize: '40vw', overflowWrap: 'break-word'}}>What subreddits are you interested in? Add as many as you like below, separated by commas (e.g. r/learnprogramming, r/react, r/cscareerquestions):</h3>
            <TextField value={subs} onChange={(e)=>setSubs(e.target.value)} size="small" autoComplete="off" sx={{mb: 3}}/>
            <br/>
            <Button component={Link} to="/SetUp/Socials/news" variant="text" color="secondary" size="large" startIcon={<ArrowBackIosNewIcon/>} sx={{mr: 6}}>Back</Button>
            <Button component={Link} to="/SetUp/Socials/finished" variant="text" color="secondary" size="large" endIcon={<ArrowForwardIosIcon/>} onClick={handleNext}>Next</Button>
        </div>
    )
}
