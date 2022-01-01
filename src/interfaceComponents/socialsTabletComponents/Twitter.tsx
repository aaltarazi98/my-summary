import React, {useState} from 'react'
// @ts-ignore
import { TwitterTimelineEmbed } from 'react-twitter-embed'


export default React.memo(function Twitter() {
    const twitObj = JSON.parse(localStorage.getItem('twit') || '{}')
    const account: string | null = twitObj.account
    const type: string | null = twitObj.type
    const author: string | null = twitObj.author
    const list: string | null = twitObj.list
    const [error, setError] = useState<boolean>(false)

    if(error){
        return(
            <div className="loader">
                <h3>The Twitter information provided was invalid!</h3>
            </div>
        )
    }else if (type === 'list' && list){
        return(
            <TwitterTimelineEmbed
                sourceType = "list"
                ownerScreenName= {author}
                slug = {list}
                theme = "dark"
                autoHeight = {true}
                borderColor = "#FFFFFF"
                onLoad = { (res: any) =>{
                    if (!res){
                        setError(true)
                    }
                }}
            />
        )
    }else if (type === 'account' && account){
        return(
            <TwitterTimelineEmbed
                sourceType = "profile"
                screenName= {account}
                theme = "dark"
                autoHeight = {true}
                borderColor = "#FFFFFF"
            />
        )
    }else{
        return(
            <div className="loader">
                <h3>You have not yet set up a Twitter timeline!</h3>
            </div>
        )
    }
})
