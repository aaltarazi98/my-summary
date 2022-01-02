import {useState} from 'react'
import {Button, TextField, IconButton, Alert } from '@mui/material'
import {Link} from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearIcon from '@mui/icons-material/Clear';

export function Tickers() {
    const list: string[] = JSON.parse(localStorage.getItem('tickers') || '[]')
    const [tickers, setTickers] = useState<string[]>(list)
    const [ticker, setTicker] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    function handleAdd(): void{
        const reg: any = /^[a-z]+$/i
        const test: boolean = reg.test(ticker)
        if(test){
            setTickers([...tickers, ticker.toUpperCase()])
            setTicker('')
        }else{
            setError(true)
        }
    }

    function handleNext():void{
        const tickersJSON: string = JSON.stringify(tickers)
        localStorage.setItem('tickers', tickersJSON)
    }

    return (
        <div className='flexCol'>
            <h2>Tickers</h2>
            <h3 className='tooltip'>Provide stock symbols to track (does not include crypto, mutual funds, etc.)</h3>
            <div className="flexRow" style={{marginBottom: '1em'}}>
                <TextField error={error} value={ticker} onChange={(e)=>setTicker(e.target.value)} size="small" autoComplete="off" helperText="Text should only contain letters"/>
                <IconButton sx={{mx: 0.5, mb: 2.5}}color='secondary' onClick={handleAdd}>
                            <AddCircleIcon fontSize='large'/>
                </IconButton>
            </div>
            <div className="showItems">
                {tickers[0] ? tickers.map( (item, i) => {
                    return( 
                        <Alert key={i + "-" + item} icon={false} sx={{m: 0.5}} severity="success">
                            {item}
                            <IconButton size="small" sx={{ml: 1, p: 0, mb: 0.1}} onClick={(): void => setTickers(tickers.slice(0, i).concat(tickers.slice(i+1)))}>
                                <ClearIcon fontSize='small'/>
                            </IconButton>
                        </Alert>
                    )
                }): null}
            </div>

            <div className = "flexRow">

                <Button component={Link} to="/SetUp/Socials/finished" variant="text" color="secondary" size="large" startIcon={<ArrowBackIosNewIcon/>} sx={{mr: 6}}>Back</Button>
                <Button component={Link} to="/SetUp/Home" variant="text" color="secondary" size="large" endIcon={<ArrowForwardIosIcon/>} onClick={handleNext}>Next</Button>

            </div>
        </div>
    )
}
