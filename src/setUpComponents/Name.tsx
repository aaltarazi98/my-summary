import {useState} from 'react'
import {Button, TextField} from '@mui/material'
import {Link} from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export function Name() {
    const [name, setName] = useState(localStorage.getItem('name') || '')

    return (
        <div className='flexCol'>
            <h2>What is your name?</h2>
            <TextField value={name} onChange={(e)=>setName(e.target.value)} size="small" autoComplete="off" sx={{mb: 2}} inputProps={{maxLength: 12}}/>
            <h3 className='tooltip'>Information you enter is saved locally on your device. Clearing your cache or changing browsers will require set up again.</h3>
            <div className = "flexRow">
                <Button component={Link} to="/SetUp" variant="text" color="secondary" size="large" startIcon={<ArrowBackIosNewIcon/>} sx={{mr: 6}}>Back</Button>
                <Button component={Link} to="/SetUp/Socials" variant="text" color="secondary" size="large" endIcon={<ArrowForwardIosIcon/>} onClick={(e: any) :void=>localStorage.setItem('name', name)}>Next</Button>
            </div>
        </div>
    )
}
