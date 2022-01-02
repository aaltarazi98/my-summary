import {useState} from 'react'
import {Button, FormControl, FormControlLabel, Radio, RadioGroup, InputLabel, Input} from '@mui/material'
import {Link} from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface Twitter{
    type: string,
    account?: string,
    list?: string,
    author?: string
}

export function Twitter() {
    const json: string | null = localStorage.getItem('twit')
    const twitObj = JSON.parse(json || '{}')
    const [type, setType] = useState(twitObj ? twitObj.type :'account')
    const [account, setAccount] = useState(twitObj.account ? twitObj.account : "")
    const [list, setList] = useState(twitObj.list ? twitObj.list : "")
    const [author, setAuthor] = useState(twitObj.author ? twitObj.author: "")

    function handleClick(): void{
        const twit: Twitter={
            type,
            account,
            list,
            author
        }

        localStorage.setItem('twit', JSON.stringify(twit))

    }

    return (
        <div className='flexCol'>
            <h2>Twitter</h2>
            <h3>Provide a Twitter list or an account you'd like to keep up with:</h3>

            <RadioGroup value={type} onChange={(e: any):void => setType(e.target.value)} style={{display: "flex", alignItems: "center", justifyContent:"center", marginBottom: "1.5em"}} row defaultValue="account">
                <FormControlLabel value="account" control ={<Radio color="secondary" size="medium"/>} label= "Account"/>
                <FormControlLabel value="list" control ={<Radio color="secondary" />} label= "List"/>
            </RadioGroup>

            {type === 'account' ? 
                <>
                    <FormControl style={{width: '20vh'}} sx={{mb: 2}} size='small'>
                        <InputLabel htmlFor="account">Account Name</InputLabel>
                        <Input id="account" value={account} onChange = {(e: any) => setAccount(e.target.value)} fullWidth={true}/>
                    </FormControl>
                    <br/><br/><br/><br/><br/><br/>
                </>
                :
                <>
                    <FormControl style={{width: '20vh'}} sx={{mb: 2}} size='small'>
                        <InputLabel htmlFor="list">List Name</InputLabel>
                        <Input id="list" value={list} onChange = {(e: any) => setList(e.target.value)} fullWidth={true}/>
                    </FormControl>
                    <br/>
                    <FormControl style={{width: '20vh'}} sx={{mb: 2}} size='small'>
                        <InputLabel htmlFor="author">List Author</InputLabel>
                        <Input id="author" value={author} onChange = {(e: any) => setAuthor(e.target.value)} fullWidth={true}/>
                    </FormControl>
                    <p>To learn more about Twitter lists, click <a href="https://help.twitter.com/en/using-twitter/twitter-lists" target="_blank">here</a></p>
                </>
            }
            <br/>
            <div className = "flexRow">

                <Button component={Link} to="/SetUp/Socials" variant="text" color="secondary" size="large" startIcon={<ArrowBackIosNewIcon/>} sx={{mr: 6}}>Back</Button>
                <Button component={Link} to="/SetUp/Socials/news" variant="text" color="secondary" size="large" endIcon={<ArrowForwardIosIcon/>} onClick={handleClick}>Next</Button>

            </div>
        </div>
    )
}
