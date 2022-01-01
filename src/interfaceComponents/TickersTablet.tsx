import {useState, useEffect} from 'react'
import {Alert} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';

const finnhub = require('finnhub')
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c6qjubaad3i891nj55a0"
const finnhubClient = new finnhub.DefaultApi()

interface Quote{
    c: number,
    d: number,
    dp: number,
    h: number,
    l: number,
    o: number,
    pc: number
}

export function TickersTablet() {
    const list: string[] = JSON.parse(localStorage.getItem('tickers') || '[]')
    const [errorTickers, setErrorTickers] = useState<string[]>([])
    const tickerArr: Quote[] = []
    const [isLoading, setLoading] = useState(true)
    const [tickers, setTickers]= useState([{
        c: 0,
        d: 0,
        dp: 0,
        h: 0,
        l: 0,
        o: 0,
        pc: 0
    }])

    // Promisifies using the finnhub library since they resolve at different times, otherwise the returned data will be out of order of the user's array 
    const dataPromise = function(item: string){
        return new Promise((resolve, reject) =>{
            finnhubClient.quote(item, (err: any, data: any, res: any) =>{
                if (err){
                    console.log(err)
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    }

    async function fetchData() {
        for (const ticker of list){
            const data: any = await dataPromise(ticker)
            if (!data.d) setErrorTickers(errorTickers => [...errorTickers, ticker])
            tickerArr.push(data)
        }
        setTickers(tickerArr)
        setLoading(false)
    }
    
    useEffect(() => {
        if(list[0]) fetchData()
    }, [])

    if (isLoading){
        return(
            <div className= "tickersTablet">
                <h2 style={{textAlign: "center", marginBottom: "3vh", lineHeight: "1vh", marginTop:"0.5vh"}}>Tickers</h2>
                <div className='loader'>
                    {list[0] ? <CircularProgress/> : <h3>You have not set up any stock market tickers!</h3>}
                </div>
            </div>
        )
    }else{
        return (
            <div className= "tickersTablet">
                <h2 style={{textAlign: "center", marginBottom: "3vh", lineHeight: "1vh", marginTop:"0.5vh"}}>Tickers</h2>
                <div className="tickersDisplay">
                    {errorTickers ? errorTickers.map(ticker => {
                        return <Alert severity="warning" className="redditPost">You have provided an invalid or private stock market ticker: {ticker}</Alert>
                    }) : null}
                    {tickers.map((ticker, index) =>{
                        if (ticker.c){
                            return(
                                <div className= "ticker" key= { list[index] + index} onClick={ () => window.open(`https://finance.yahoo.com/quote/${list[index]}/`, "_blank")}>
                                    <h2 style={{marginLeft: "1em"}}>{list[index]}</h2>
                                    <div style={{display: "flex", flexDirection:"column", marginRight: "1em"}} >
                                        <h2 style={{margin: '0', marginTop: "0.5em", textAlign:"right"}}>{ticker.c}</h2>
                                        {ticker.d > 0 ? <h3 style={{margin: '0', textAlign:"right", color: 'green'}}> + {ticker.d}</h3>: <h3 style={{margin: '0', textAlign:"right", color: 'red'}}> {ticker.d}</h3>}
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        )
    }
}

