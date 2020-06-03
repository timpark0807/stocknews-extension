import React, { useState } from "react";
import { NewsTable } from './NewsTable'
import axios, {AxiosResponse} from 'axios';
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

    const token = process.env.REACT_APP_api_token;
    const [ticker, setTicker] = useState("");
    const [articles, setArticles] = useState<Articles>({ticker:"", articles:[]});
    const [profile, setProfile] = useState<Profile>({companyName:"", latestPrice:"", symbol:""});

    function handleClick(event: React.MouseEvent<HTMLButtonElement>){
        axios.get("https://cloud.iexapis.com/stable/stock/" + ticker + "/news?last=5&token=" + token)
        .then(response => {
            processArticles(response);
        })
        .catch(error =>{
            setArticles({ticker:ticker, articles:[]});
        })

        axios.get("https://cloud.iexapis.com/stable/stock/"+ticker +"/quote?token="+token)
        .then(response => {
            processProfile(response);
        })
        .catch(error =>{
            setProfile({companyName:"", latestPrice:"", symbol:""});
        })
    };
    
    function processProfile(resp: AxiosResponse<any>) {
        setProfile({ 
            companyName: resp.data.companyName,
            latestPrice: resp.data.latestPrice,
            symbol: resp.data.symbol
        });
    };

    function processArticles(resp: AxiosResponse<any> ) {
        var arr: Article[] = []; 

        for (var item of resp.data) {
            arr.push({
                headline: item.headline,
                source: item.source, 
                url: item.url
            });
        }
        setArticles({ticker:ticker, articles:arr});
    };

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        setTicker(event.target.value.toUpperCase());
    };

    return (

        <div className="page">
            <Route path="/index.html">
                <Search handleChange={handleChange} handleClick={handleClick} />
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
