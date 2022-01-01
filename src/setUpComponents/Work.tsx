import {useState} from 'react'
import {Button, FormControl, InputLabel, Input} from '@mui/material'
import {Link} from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export function Work() {
    const json: string | null = localStorage.getItem('work')
    const addressObj = JSON.parse(json || '{}')
    const [address, setAddress] = useState( addressObj ? addressObj.address : '' )
    const [city, setCity] = useState( addressObj ? addressObj.city : '' )
    const [state, setState] = useState( addressObj ? addressObj.state : '' )
    const [zipcode, setZipcode] = useState( addressObj ? addressObj.zipcode : '' )
    const [country, setCountry] = useState( addressObj ? addressObj.country : '' )

    interface Address{
        address: string,
        city: string,
        state: string,
        zipcode: string,
        country: string
    }

    function handleClick(): void{
        const work: Address = {
            address,
            city,
            state,
            zipcode,
            country
        }
        localStorage.setItem('work', JSON.stringify(work))
        localStorage.setItem('setUp', 'true')
    }
    return (
        <div>
            <h2>This section will help display information about local weather and your commute</h2>
            <h3>What is your work address?</h3>
            <FormControl style={{width: '50%'}} sx={{mb: 2}} size='small'>
                <InputLabel htmlFor="address">Address Line</InputLabel>
                <Input id="address" value={address} onChange = {(e: any) => setAddress(e.target.value)}/>
            </FormControl><br/>
            <FormControl  style={{width: '50%'}} sx={{mb: 2}} size='small'>
                <InputLabel htmlFor="city">City</InputLabel>
                <Input id="city" value={city} onChange = {(e: any) => setCity(e.target.value)}/>
            </FormControl><br/>
            <FormControl style={{width: '50%'}} sx={{mb: 2}} size='small'>
                <InputLabel htmlFor="state">State/Province</InputLabel>
                <Input id="state" value={state} onChange = {(e: any) => setState(e.target.value)}/>
            </FormControl><br/>
            <FormControl style={{width: '50%'}} sx={{mb: 2}} size='small'>
                <InputLabel htmlFor="zipcode">Zip Code</InputLabel>
                <Input id="zipcode" value={zipcode} onChange = {(e: any) => setZipcode(e.target.value)}/>
            </FormControl><br/>
            <FormControl style={{width: '50%'}} sx={{mb: 2}} size='small'>
                <InputLabel htmlFor="country">Country</InputLabel>
                <Input id="country" value={country} onChange = {(e: any) => setCountry(e.target.value)}/>
            </FormControl>
            <br/>
            <Button component={Link} to="/SetUp/Home" variant="text" color="secondary" size="large" startIcon={<ArrowBackIosNewIcon/>} sx={{mr: 6}}>Back</Button>
            <Button component={Link} to="/SetUp/Complete" variant="text" color="secondary" size="large" endIcon={<ArrowForwardIosIcon/>} onClick={handleClick}>Next</Button>
        </div>
    )
}
