import  {useState, useEffect} from 'react'

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
        const weatherRes = await fetch('https://api.openweathermap.org/data/2.5/weather?zip='+ homeZip + '&appid=081d7ce868e31cc11d40458c3ae5b77d&units=imperial')
        const weatherData = await weatherRes.json()
        if (await weatherData.cod != '200'){
            setError(true)
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
                            <div style={{fontSize: "3em", marginTop: "10%"}}>{weather.name}</div>
                            <div><img width="20%" src={`http://openweathermap.org/img/wn/${icon}@2x.png`}></img></div>
                            <div style={{fontSize: "2em"}}>{parseInt(weather.main?.temp)}&#176;</div>
                            <div style={{fontSize: "1.25em"}}>{weather.weather[0]?.description}</div>
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
