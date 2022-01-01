import React, {useEffect, useState} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import LinkIcon from '@mui/icons-material/Link';



export function News() {
    const topics: string[] = JSON.parse(localStorage.getItem('topics') || '[]')
    const [isLoading, setLoading] = useState(true)
    const articleArr: [] = []

    const [articles, setArticles] = useState([{
        source: {
            id: 0,
            name: ""
        },
        author: "",
        title: "",
        description: "",
        url: "",
        urlToImage: "",
        publishedAt: "",
        content: ""
    }])

    async function fetchData(){
        // Fetch data from each category in the topics array, then push the top 10 article objects from each response
        for (let i = 0; i < topics.length; i++){
            try{
                const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${topics[i]}&apiKey=f60cab6809d34ebd8a5dfe4119cd1e86`)
                const data = await res.json()
                console.log(data)
                const arr: [] = await data.articles
                for (let j = 0; j < 9; j++){
                    articleArr.push(arr[j])
                }
            }catch(err){
                console.log(err)
            }
        }
        // Shuffle the post array, then set the post state variable to it for rendering
        for (let i = articleArr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = articleArr[i];
            articleArr[i] = articleArr[j];
            articleArr[j] = temp;
        }
        setArticles(articleArr)
        setLoading(false)
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
                {articles.map((article, index) =>{
                    return(
                        <div onClick={()=>window.open(article.url, "_blank" )} className= "article" key={article.title + "-" + index}>
                            <p style={{margin: "0", color: "#D3D3D3"}}>{article.source.name}</p>
                            <p style={{margin: "0", color: "#D3D3D3"}}>{article.author}</p>
                            <h1 style={{fontSize: "1.4em", margin: "0"}}>{article.title}</h1>
                            <div style={{position: "relative"}}>
                                <img src={article.urlToImage} style={{width: "100%", height: "auto", maxHeight: "40em"}}/>
                                <p style={{position: "absolute", backgroundColor: "#070720", opacity: "70%", width: "100%", bottom:"-0.6em"}}>{article.url.slice(0,30)}...<LinkIcon style={{marginBottom: '-0.3em', padding: '0'}}/></p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
