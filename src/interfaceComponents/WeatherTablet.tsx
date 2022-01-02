import  {useState, useEffect} from 'react'
const API_KEY: string = process.env.REACT_APP_WEATHER_KEY!

export function WeatherTablet() {
    const homeZip: string | null = JSON.parse(localStorage.getItem('home') || '{}').zipcode
    const [error, setError] = useState<boolean>(false)
    const [icon, setIcon] = useState<string>()
    const [weather, setWeather] = useState({
        name: null,
        weather: [{
            main: null,
            description: '',
            icon: ''
        }],
        main: {
            temp: ""
        }
    })


    async function fetchData(){
        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${homeZip}&appid=${API_KEY}&units=imperial`)
        const weatherData = await weatherRes.json()
        if (await weatherData.cod != '200'){
            setError(true)
            console.log(weatherData)
            return
        }
        setWeather(weatherData)
        console.log(weatherData)
        setIcon(weatherData.weather[0]?.icon)
    }

    useEffect(() => {
        if (homeZip){
            fetchData()
        }
    }, [])
    if (error){
        return(
            <>
            <h2 style={{textAlign: "center", marginBottom: "2vh", lineHeight: "1vh", marginTop:"3vh"}}>Weather</h2>
            <div className = "weather">
                <div className='loader'>
                    <h3>Home zipcode is invalid!</h3>
                </div>
            </div>
        </>
        )
    }else{
        return (
            <>
                <h2 style={{textAlign: "center", marginBottom: "2vh", lineHeight: "1vh", marginTop:"3vh"}}>Weather</h2>
                <div className = "weather">
                    {homeZip?
                        <>
                            <h1 style={{marginTop: '1em', fontWeight: 'normal'}}>{weather.name}</h1>
                            <img width="20%" src={`http://openweathermap.org/img/wn/${icon}@2x.png`}></img>
                            <h3 style={{margin: '0', fontWeight: 'normal'}}>{parseInt(weather.main?.temp)}&#176;</h3>
                            <h3 style={{margin: '0', fontWeight: 'normal'}}>{weather.weather[0]?.description}</h3>
                        </>
                        :
                        <div className="loader">
                            <h3>You have not set up your home zip!</h3>
                        </div>
                    }
    
                </div>
            </>
        )
    }
}
