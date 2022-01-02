import React, {useEffect, useState} from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {Alert} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default React.memo(function Reddit() {
    const subs: string[] = JSON.parse(localStorage.getItem('subs') || '[]')
    const [errorSubs, setErrorSubs] =  useState<string[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)
    const postArr: [] = []
    const [posts, setPosts] = useState([{
        data:{
            author: "",
            title: "",
            selftext: "",
            subreddit: "",
            created: 0,
            score: 0,
            num_comments: 0,
            domain: '',
            url: "",
            permalink: '',
            url_overridden_by_dest: "",
            thumbnail: "",
            secure_media: {
                reddit_video:{
                    fallback_url: "",
                    is_gif: false
                },
                oembed:{
                    provider_name: ""
                }
            },
            is_video: false,
        }
    }])

    async function fetchData(){
        // Fetch data from each sub in the subs array, then push the top 11 post objects from each sub
        for (let i = 0; i < subs.length; i++){
            try {
                const res = await fetch(`https://www.reddit.com/r/${subs[i]}.json`)
                const data = await res.json()
                const arr: [] = await data.data?.children
                if (arr.length === 0){
                    throw  new Error('Invalid subreddit!')
                } 
                for (let j = 0; j < 10; j++){
                    postArr.push(arr[j])
                }
            }catch(e: any){
                setErrorSubs(errorSubs => [...errorSubs, subs[i]])
                console.log(`Subreddit ${subs[i]} is private or invalid!`)
            }
        }
        // Shuffle the post array, then set the post state to it for rendering
        for (let i = postArr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = postArr[i];
            postArr[i] = postArr[j];
            postArr[j] = temp;
        }
        setPosts(postArr)
        console.log(postArr)
        setLoading(false)
    }


    useEffect(()=>{
        if (subs[0]) fetchData()
    }, [])

    if (isLoading){
        return(
            <div className='loader'>
                {subs[0] ? <CircularProgress/> : <h3>You have not set up your Reddit tablet!</h3>}
            </div>
        )
    }else{
        return (
            <div className = "redditTablet">
                {errorSubs ? errorSubs.map( sub => {
                    return <Alert severity="warning" className="redditPost">You have provided an invalid or private subreddit: {sub}</Alert>
                }): null}
                {posts.map((post, index)=>{

                    const data = post.data

                    return(

                        <div onClick={()=>window.open(`https://www.reddit.com${data.permalink}`, "_blank" )} className= "redditPost" key={data.title + "-" + index}>

                            <p style={{margin: "0", color: "#D3D3D3"}}>r/{data.subreddit}</p>
                            <p style={{margin: "0", color: "#D3D3D3"}}>u/{data.author}</p>
                            <h4 style={{ margin: "0"}}>{data.title}</h4>
                            
                            {data.selftext ? 
                                <p style={{margin: "0", maxHeight:"5em", overflow: "hidden", fontSize: "1.07em"}}>{data.selftext}</p>
                                :
                                data.is_video ?
                                    <video  style={{width: "100%", height: "auto", maxHeight: "40em"}} controls>
                                        <source src={data.secure_media.reddit_video.fallback_url} type="video/mp4"/>
                                    </video>
                                    :
                                    data.domain !== 'i.redd.it'?
                                        <p style={{margin: "0", color: "#51aec9"}}>Link to {data.domain}</p>
                                        :
                                        <img src={data.url_overridden_by_dest} style={{width: "100%", height: "auto", maxHeight: "40em"}} onClick={()=>window.open(data.url_overridden_by_dest, "_blank")}/>    
                            }

                            <div style={{marginTop: "0.4em", color: "#D3D3D3", paddingBottom: "0.3em"}}>

                                <ArrowUpwardIcon fontSize="inherit" style={{ marginBottom:"-0.15em"}}/> {data.score < 1000 ? data.score : (data.score/1000).toFixed(1) + "k"} <ArrowDownwardIcon fontSize="inherit" style={{ marginBottom:"-0.5%"}}/>
                                <ChatBubbleOutlineIcon fontSize="inherit" style={{marginLeft: "10%", marginBottom:"-0.15em"}}/> {data.num_comments}

                            </div>
                            
                        </div>
                )
            })}
            </div>
        )
    }
})