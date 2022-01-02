import {Button} from '@mui/material'
import {Link, Routes, Route} from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


export function Complete(){

    return (
        <Routes>
            <Route path="/" element={<div className='flexCol'>
                <h2>Set up complete.</h2>
                <h3 className='tooltip'>To change any set up information, click the cog on the top right to navigate to this page</h3>
                <h3>Click below to navigate to interface</h3>
            </div>}/>    
        </Routes>
    )
}
