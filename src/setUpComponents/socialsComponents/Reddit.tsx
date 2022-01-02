import {useState} from 'react'
import {Button, TextField, IconButton, Alert } from '@mui/material'
import {Link} from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearIcon from '@mui/icons-material/Clear';
import Stack from '@mui/material/Stack'

export function Reddit() {
    const list: string[] = JSON.parse(localStorage.getItem('subs') || '[]')
    const [subs, setSubs] = useState<string[]>(list)
    const [sub, setSub] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    function handleAdd(): void{
        const reg: any = /^[a-z0-9]+$/i
        const test: boolean = reg.test(sub)
        if (test){
            setSubs([...subs, sub])
            setSub('')
            setError(false)
        }else if(sub.includes('r/') || sub.includes('R/')){
            setSubs([...subs, sub.slice(2)])
            setSub('')
            setError(false)
        }else{
            setError(true)
        }
    }

    function handleNext():void{
        const subsJSON: string = JSON.stringify(subs)
        localStorage.setItem('subs', subsJSON)
    }


    return (
        <div className='flexCol'>
            <h2>Reddit</h2>
            <h3>Provide subreddits that you are interested in:</h3>
            <div className="flexRow" style={{marginBottom: '1em'}}>
                <TextField error={error} value={sub} onChange={(e)=>setSub(e.target.value)} size="small" autoComplete="off" label="Add subreddit" helperText="Text should only contain letters and numbers"/>
                <IconButton sx={{mx: 0.5, mb: 2.5}}color='secondary' onClick={handleAdd}>
                            <AddCircleIcon fontSize='large'/>
                </IconButton>
            </div>
            <div className="showItems">
                {subs[0] ? subs.map( (item, i) => {
                    return( 
                        <Alert key={i + "-" + item} icon={false} sx={{m: 0.5}} severity="success">
                            {item}
                            <IconButton size="small" sx={{ml: 1, p: 0, mb: 0.1}} onClick={(): void => setSubs(subs.slice(0, i).concat(subs.slice(i+1)))}>
                                <ClearIcon fontSize='small'/>
                            </IconButton>
                        </Alert>
                    )
                }): null}
            </div>
            <div className = "flexRow">

                <Button component={Link} to="/SetUp/Socials/news" variant="text" color="secondary" size="large" startIcon={<ArrowBackIosNewIcon/>} sx={{mr: 6}}>Back</Button>
                <Button component={Link} to="/SetUp/Socials/finished" variant="text" color="secondary" size="large" endIcon={<ArrowForwardIosIcon/>} onClick={handleNext}>Next</Button>

            </div>
        </div>
    )
}
