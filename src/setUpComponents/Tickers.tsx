import {useState} from 'react'
import {Button, TextField } from '@mui/material'
import {Link} from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export function Tickers() {
    const list: string = JSON.parse(localStorage.getItem('tickers') || '[]').join(', ')
    const [tickers, setTickers] = useState(list)

    function handleNext():void{
        const tickersArr: string[] = tickers.split(",").map( ticker=>{
            if (ticker[0]===" ") return ticker.slice(1)
            else return ticker
        })
        const tickersJSON: string = JSON.stringify(tickersArr)
        localStorage.setItem('tickers', tickersJSON)
    }

    return (
        <div>
            <h2>Tickers</h2>
            <h3 style={{inlineSize: '40vw', overflowWrap: 'break-word'}}>Which stock market tickers are you interested in monitoring? Enter them below, separated by commas (e.g. META, GME, AMZN)</h3>
            <TextField value={tickers} onChange={(e)=>setTickers(e.target.value)} size="small" autoComplete="off" sx={{mb: 3}}/>
            <br/>
            <Button component={Link} to="/SetUp/Socials/finished" variant="text" color="secondary" size="large" startIcon={<ArrowBackIosNewIcon/>} sx={{mr: 6}}>Back</Button>
            <Button component={Link} to="/SetUp/Home" variant="text" color="secondary" size="large" endIcon={<ArrowForwardIosIcon/>} onClick={handleNext}>Next</Button>
        </div>
    )
}
