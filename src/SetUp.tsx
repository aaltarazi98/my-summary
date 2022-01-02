import {Button} from '@mui/material'
import { Link, Route, Routes } from 'react-router-dom'
import {Name} from './setUpComponents/Name'
import {Socials} from './setUpComponents/Socials'
import {Tickers} from './setUpComponents/Tickers'
import {Home} from './setUpComponents/Home'
import {Work} from './setUpComponents/Work'
import {Complete} from './setUpComponents/Complete'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function SetUp() {
    const setUp: boolean = JSON.parse(localStorage.getItem('setUp') || 'false')

    return(
        <>
            <Routes>
                <Route path="/" element={<>
                    <h1>Welcome to My Summary, looks like it's your first time here. Let's get you set up.</h1>
                    <Button component={Link} to="Name" variant="text" color="secondary" size="large" endIcon={<ArrowForwardIosIcon/>}>Get Started</Button>
                    </>}
                />
                <Route path ="Name" element={<Name/>}/>
                <Route path ="Socials/*" element={<Socials/>}/>
                <Route path ="Tickers" element={<Tickers/>}/>
                <Route path ="Home" element={<Home/>}/>
                <Route path ="Work" element={<Work/>}/>
                <Route path ="Complete" element={<Complete/>}/>
            </Routes>
            {setUp? <Button component={Link} to="/Interface"  color="secondary" size="large" sx={{my: 2}}>Return to Interface</Button> : null}
        </>
    )
}
