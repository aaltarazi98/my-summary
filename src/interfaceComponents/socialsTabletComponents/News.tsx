import {useEffect, useState} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import LinkIcon from '@mui/icons-material/Link';

const API_KEY: string = process.env.REACT_APP_NEWS_KEY!

interface Article{
    author: string
    title: string
    description: string
    url: string
    source: string
    image: string
    category: string
    language: string
    country: string
    published_at: string
}

export function News() {
    const topics: string[] = JSON.parse(localStorage.getItem('topics') || '[]')
    const [isLoading, setLoading] = useState<boolean>(true)
    const [articles, setArticles] = useState<Article[]>()

    async function fetchData(){
        const categoryReq: string = topics.join(',')

        try{
            const res = await fetch(`http://api.mediastack.com/v1/news?access_key=${API_KEY}&categories=${categoryReq}&languages=en`)
            const data = await res.json()
            console.log(data)
            setArticles(await data.data)
            setLoading(false)
        }catch(err){
            console.log(err)
        }        
    }

    useEffect(()=>{
        if (topics[0]) fetchData()
    }, [])

    if (isLoading){
        return(
            <div className='loader'>
                {topics[0] ? <CircularProgress/> : <h3>You have not set up your news!</h3>}
            </div>
        )
    }else{
        return(
            <div className= "newsTablet">
                {articles?.map((article, index) =>{
                    return(
                        <div onClick={()=>window.open(article.url, "_blank" )} className= "article" key={article.title + "-" + index}>
                            <p style={{margin: "0", color: "#D3D3D3"}}>{article.source}</p>
                            <p style={{margin: "0", color: "#D3D3D3"}}>{article.author}</p>
                            <h4 style={{margin: "0"}}>{article.title}</h4>
                            <div style={{position: "relative"}}>
                                <img src={article.image} style={{width: "100%", height: "auto", maxHeight: "40em"}}/>
                                <p style={{position: "absolute", backgroundColor: "#070720", opacity: "70%", width: "100%", bottom:"-0.6em"}}>{article.url.slice(0,30)}...<LinkIcon style={{marginBottom: '-0.3em', padding: '0'}}/></p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
