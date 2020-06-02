import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { NewsTable } from './NewsTable'
import axios, {AxiosResponse} from 'axios';
import { Search } from "./Search";

export interface Article {
    headline: string;
    source: string;
    url: string;
}

export interface Articles {
    ticker: string;
    articles: Article[];
}

export const MainPage: React.FC = () => {

    const token = process.env.REACT_APP_api_token;
    const [ticker, setTicker] = useState("");
    const [articles, setArticles] = useState<Articles>({ticker:"", articles:[]});

    function handleClick(event: React.MouseEvent<HTMLButtonElement>){
        axios.get("https://cloud.iexapis.com/stable/stock/" + ticker + "/news?last=5&token=" + token)
        .then(response => {
            processArticles(response);
            console.log(ticker)
        })
        .catch(error =>{
            console.log(error);
        })
    }
    
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
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        setTicker(event.target.value);
    }

    return (

        <div className="page">
            <Search handleChange={handleChange} handleClick={handleClick} />
            <NewsTable news={articles}/>
        </div>

    )
}

export default MainPage;
