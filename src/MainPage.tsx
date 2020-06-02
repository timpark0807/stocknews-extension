import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { NewsTable } from './NewsTable'
import axios from 'axios';


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
            processArticles(response.data);
            console.log(ticker)
        })
        .catch(error =>{
            console.log(error);
        })
    }

    function handleClick2(event: React.MouseEvent<HTMLButtonElement>){
        console.log(articles)
    }
    
    function processArticles(resp: any ) {
        var arr: Article[] = []; 

        for (var item of resp) {
            const temp: Article = {
                                    headline: item.headline,
                                    source: item.source, 
                                    url: item.url
                                }
            arr.push(temp);
        }
        setArticles({ticker:ticker, articles:arr});
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        setTicker(event.target.value);
    }

    return (

        <div className="page">

            <div className="search">
                <InputGroup className="mb-3" onChange={handleChange}>
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    placeholder="Ticker"
                    aria-label="Ticker"
                    aria-describedby="basic-addon1"
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <Button onClick={handleClick} variant="primary">Search</Button>{' '}
                </InputGroup>
            </div>

            <div className="results">
                <NewsTable ticker={articles.ticker} articles={articles.articles}/>
            </div>

        </div>

    )
}

export default MainPage;
