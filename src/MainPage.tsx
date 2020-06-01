import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import axios from 'axios'

function MainPage() {

    const token = process.env.REACT_APP_api_token
    const [ticker, setTicker] = useState("")
    
    function handleClick(event: React.MouseEvent<HTMLButtonElement>){
        axios.get("https://cloud.iexapis.com/stable/stock/" + ticker + "/news?last=5&token=" + token)
        .then(response => {
            console.log(response)
        })
        .catch(error =>{
            console.log(error)
        })
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        setTicker(event.target.value);
    }

    return (
    <div className="page">
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
    )
}

export default MainPage;
