import {useState, useEffect} from 'react'
import {Button, Checkbox, FormControlLabel, FormGroup} from '@mui/material'
import {Link} from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface Topics{
    business: boolean,
    entertainment: boolean,
    health: boolean,
    science: boolean,
    sports: boolean,
    technology: boolean
}

export function News() {
    const topics: string[] = JSON.parse(localStorage.getItem('topics') || "[]")
    const topicsArr: string[] = []
    const [state, setState] = useState<Topics>({
        business: topics.includes('business'),
        entertainment: topics.includes('entertainment'),
        health: topics.includes('health'),
        science: topics.includes('science'),
        sports: topics.includes('sports'),
        technology: topics.includes('technology'),
    })

    function handleChange(e: any): void{

        setState({
            ...state,
            [e.target.name]: e.target.checked
        })
    }

    function handleNext():void{
        Object.keys(state).forEach(topic =>{
            if (state[ topic as keyof Topics]) topicsArr.push(topic)
        })
        localStorage.setItem('topics', JSON.stringify(topicsArr))
    }
    return (
        <div className='flexCol'>
            <h2>News</h2>
            <h3>Select news topics that interest you:</h3>

            <FormGroup style={{display: "flex", flexDirection: 'column', marginBottom: "1.5em", marginLeft: "0"}}>
                <FormControlLabel control={<Checkbox color="secondary" name="business" checked={state.business} onChange={handleChange} />} label="Business" />
                <FormControlLabel control={<Checkbox color="secondary" name="entertainment" checked={state.entertainment} onChange={handleChange} />} label="Entertainment" />
                <FormControlLabel control={<Checkbox color="secondary" name="health" checked={state.health} onChange={handleChange} />} label="Health" />
                <FormControlLabel control={<Checkbox color="secondary" name="science" checked={state.science} onChange={handleChange} />} label="Science" />
                <FormControlLabel control={<Checkbox color="secondary" name="sports" checked={state.sports} onChange={handleChange} />} label="Sports" />
                <FormControlLabel control={<Checkbox color="secondary" name="technology" checked={state.technology} onChange={handleChange} />} label="Technology"/>
            </FormGroup>
            <div className = "flexRow">

                <Button component={Link} to="/SetUp/Socials/twitter" variant="text" color="secondary" size="large" startIcon={<ArrowBackIosNewIcon/>} sx={{mr: 6}}>Back</Button>
                <Button component={Link} to="/SetUp/Socials/reddit" variant="text" color="secondary" size="large" endIcon={<ArrowForwardIosIcon/>} onClick={handleNext}>Next</Button>

            </div>
        </div>
    )
}
