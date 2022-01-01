import {useState} from 'react'
import {Button, Checkbox, FormControlLabel, FormGroup} from '@mui/material'
import {Link} from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface Topics{
    business: boolean,
    entertainment: boolean,
    general: boolean,
    health: boolean,
    science: boolean,
    sports: boolean,
    technology: boolean
}

export function News() {
    const [checked, setChecked] = useState(0)
    const topicsArr: string[] = []
    const [state, setState] = useState({
        business: false,
        entertainment: false,
        general: false,
        health: false,
        science: false,
        sports: false,
        technology: false,
    })

    function handleChange(e: any): void{

        if (e.target.checked === true){
            setChecked(checked+1)
        }else  if (e.target.checked === false){
            setChecked(checked-1)
        }
        console.log(checked)
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
        <div>
            <h2>News</h2>
            <h3 style={{inlineSize: '40vw', overflowWrap: 'break-word'}}>Which of the following news topics interest you? Please select up to 3:</h3>

            <FormGroup style={{marginBottom: "1.5em", marginLeft: "10%"}}>
                <FormControlLabel control={<Checkbox disabled ={!state.business && checked >= 3} color="secondary" name="business" checked={state.business} onChange={handleChange} />} label="Business" />
                <FormControlLabel control={<Checkbox disabled ={!state.entertainment && checked >= 3} color="secondary" name="entertainment" checked={state.entertainment} onChange={handleChange} />} label="Entertainment" />
                <FormControlLabel control={<Checkbox disabled ={!state.general && checked >= 3} color="secondary" name="general" checked={state.general} onChange={handleChange} />} label="General" />
                <FormControlLabel control={<Checkbox disabled ={!state.health && checked >= 3} color="secondary" name="health" checked={state.health} onChange={handleChange} />} label="Health" />
                <FormControlLabel control={<Checkbox disabled ={!state.science && checked >= 3} color="secondary" name="science" checked={state.science} onChange={handleChange} />} label="Science" />
                <FormControlLabel control={<Checkbox disabled ={!state.sports && checked >= 3} color="secondary" name="sports" checked={state.sports} onChange={handleChange} />} label="Sports" />
                <FormControlLabel control={<Checkbox disabled ={!state.technology && checked >= 3} color="secondary" name="technology" checked={state.technology} onChange={handleChange} />} label="Technology"/>
            </FormGroup>

            <Button component={Link} to="/SetUp/Socials/twitter" variant="text" color="secondary" size="large" startIcon={<ArrowBackIosNewIcon/>} sx={{mr: 6}}>Back</Button>
            <Button component={Link} to="/SetUp/Socials/reddit" variant="text" color="secondary" size="large" endIcon={<ArrowForwardIosIcon/>} onClick={handleNext}>Next</Button>
        </div>
    )
}
