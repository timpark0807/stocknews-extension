import React from "react";
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import axios, {AxiosResponse} from 'axios';
import {Article, Articles, Profile} from "./MainPage"; 

interface Props {
    setArticles: React.Dispatch<React.SetStateAction<Articles>>;
    setTicker: React.Dispatch<React.SetStateAction<string>>;
    setProfile: React.Dispatch<React.SetStateAction<Profile>>;
    setLast: React.Dispatch<React.SetStateAction<string>>;
    ticker: string;
    last: string;
};

export const Search: React.FC<Props> = ({setArticles, setTicker, setProfile, setLast, ticker, last }) => {

    const token = process.env.REACT_APP_api_token;

    function handleClick(event: React.MouseEvent<HTMLButtonElement>){
        axios.get("https://cloud.iexapis.com/stable/stock/" + ticker + "/news?last=" + last + "&token=" + token)
        .then(response => {
            processArticles(response);
            console.log(response);
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

    function handleLastChange(event: any) {
        setLast(event.target.value.toString());
    };

    return (
        <div>
            <label>Enter Ticker:</label>
            <InputGroup className="mb-3" onChange={handleChange}>
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                placeholder="Ticker"
                aria-label="Ticker"
                aria-describedby="basic-addon1"
                value={ticker}
                /> 
            </InputGroup>
            <Form>
                <FormGroup>
                    <Form.Label>Display Last: </Form.Label>
                        <Form.Control as="select" onChange={handleLastChange} value={last}>
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        </Form.Control>
                </FormGroup>
            </Form>

            <div className="float-right mb-3">
                <Link to="/news">
                    <Button variant="primary" onClick={handleClick}>Search</Button>
                </Link>
            </div>
        </div>
    )

};

