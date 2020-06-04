import React, { useState } from "react";
import { NewsTable } from './NewsTable'
import { Search } from "./Search";
import { Route } from "react-router-dom";
import {NewsHeader} from './NewsHeader';

export interface Article {
    headline: string;
    source: string;
    url: string;
}

export interface Articles {
    ticker: string;
    articles: Article[];
}

export interface Profile {
    companyName: string;
    latestPrice: string;
    symbol: string;
}

export const MainPage: React.FC = () => {

    const [last, setLast] = useState("5")
    const [ticker, setTicker] = useState("");
    const [articles, setArticles] = useState<Articles>({ticker:"", articles:[]});
    const [profile, setProfile] = useState<Profile>({companyName:"", latestPrice:"", symbol:""});

    return (

        <div className="page">
            <Route path="/index.html">
                <Search 
                    last={last} 
                    ticker={ticker} 
                    setArticles={setArticles} 
                    setProfile={setProfile} 
                    setTicker={setTicker} 
                    setLast={setLast}
                />
            </Route>

            <Route exact path="/news">
                {articles.articles.length > 1 ?

                    // if request was succesful, display news page. 
                    <div> 
                        <NewsHeader profile={profile}/>
                        <NewsTable news={articles} profile={profile}/>
                    </div>
                : 

                    // if request did not return a valid result, display error page. 
                    <div>
                        <label>Sorry! We couldn't find anything for ${ticker}.</label>
                        <br/>
                        <label>Please try another search.</label>                    
                    </div>
                }
            </Route>
        </div>

    )
}

export default MainPage;
