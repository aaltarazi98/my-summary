import {Button} from '@mui/material'
import {Link, Routes, Route} from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


export function Complete(){

    return (
        <Routes>
            <Route path="/" element={<div>
                <h2>You are all set up.</h2>
                <h3 style={{inlineSize: '40vw', overflowWrap: 'break-word'}}>Should you feel the need to change any of your set up information, feel free to click the cog on the top right and it will bring you right back here.</h3>
                <h3>Click next to return to My Summary!</h3>
                <Button component={Link} to="/SetUp/Work" variant="text" color="secondary" size="large" startIcon={<ArrowBackIosNewIcon/>} sx={{mr: 6}}>Back</Button>
                <Button component={Link} to="/Interface" variant="text" color="secondary" size="large" endIcon={<ArrowForwardIosIcon/>}>Next</Button>
            </div>}/>    
        </Routes>
    )
}
