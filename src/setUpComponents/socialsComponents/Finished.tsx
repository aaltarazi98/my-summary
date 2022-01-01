import {Button} from '@mui/material'
import {Link, Routes, Route} from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


export function Finished(){

    return (
        <Routes>
            <Route path="/" element={<div>
                <h2 style={{inlineSize: '40vw', overflowWrap: 'break-word'}}>That wraps up your socials tablet. Let's set up your tickers tablet</h2>
                <h3 style={{inlineSize: '40vw', overflowWrap: 'break-word'}}>This section will display prices and price changes of tickers you are interested in</h3>
                <Button component={Link} to="/SetUp/Socials/reddit" variant="text" color="secondary" size="large" startIcon={<ArrowBackIosNewIcon/>} sx={{mr: 6}}>Back</Button>
                <Button component={Link} to="/SetUp/Tickers" variant="text" color="secondary" size="large" endIcon={<ArrowForwardIosIcon/>}>Next</Button>
            </div>}/>    
        </Routes>
    )
}
