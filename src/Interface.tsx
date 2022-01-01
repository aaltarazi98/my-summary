import React, {useState, useEffect} from 'react'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';
import { MapTablet } from './interfaceComponents/MapTablet';
import { SocialsTablet } from './interfaceComponents/SocialsTablet';
import { TickersTablet } from './interfaceComponents/TickersTablet';
import { WeatherTablet } from './interfaceComponents/WeatherTablet';


export default function Interface() {
    const name: string | null = localStorage.getItem('name')
    const [time, setTime] = useState (new Date())
    const [greeting, setGreeting] = useState(true)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(()=>{
        setInterval(()=>{
            setTime(new Date())
        }, 1000)
        setTimeout(()=>{
            setGreeting(false)
        },5000)
    }, [])
    
    const hrs: number = time.getHours()
    const mins: number = time.getMinutes()


        return(
            <>
                {greeting?
                    <div className="intro">
                        <p style = {{fontSize: '11vh', margin: "0"}}>{ hrs > 13 ? hrs - 12 : hrs === 0 ? 12 : hrs }:{mins < 10 ? '0' + mins : mins} { hrs >= 12 ? 'pm' : 'am'}</p>
                        <p style ={{fontSize: '6vh', margin: "0"}}>{ hrs > 17 ? 'Good evening' : hrs > 14 ? 'Good afternoon' : hrs > 10 ? 'Good day' : hrs > 4 ? 'Good morning' : 'Hello' }, {name}</p>
                        <p style = {{fontSize: '4vh', margin: '0'}}>Welcome to My Summary</p>
                    </div>
                    :
                    null
                }
                <>
                    <Box className='toolbar'>
                        <p style={{margin:'0', fontSize: '1.8em', marginLeft: '2em'}}>{ hrs > 13 ? hrs - 12 : hrs === 0 ? 12 : hrs }:{mins < 10 ? '0' + mins : mins} { hrs >= 12 ? 'pm' : 'am'}</p>
                        <IconButton  style={{textAlign: 'right', marginRight: '2em'}} color='secondary' onClick={handleClick}>
                            <SettingsIcon style={{fontSize:'1.5em'}}/>
                        </IconButton>
                    </Box>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem component={Link} to="/SetUp/Name" onClick={handleClose}>Name</MenuItem>
                        <MenuItem component={Link} to="/SetUp/Socials" onClick={handleClose}>Socials</MenuItem>
                        <MenuItem component={Link} to="/SetUp/Tickers" onClick={handleClose}>Tickers</MenuItem>
                        <MenuItem component={Link} to="/SetUp/Home" onClick={handleClose}>Address</MenuItem>
                    </Menu>
                    <div className = "interface-container">
                        <div className = "left-container">
                            <WeatherTablet/>
                            <MapTablet/>
                        </div>
                        <SocialsTablet/>
                        <TickersTablet/>
                    </div>
                </>
            </>
        )    
}
