import React from "react";
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import axios, {AxiosResponse} from 'axios';
import {Station} from "./MainPage"; 

interface Props {
    setStation: React.Dispatch<React.SetStateAction<Station>>;
    setZipcode: React.Dispatch<React.SetStateAction<string>>;
    setLast: React.Dispatch<React.SetStateAction<string>>;
    zipcode: string;
    last: string;
};

export const Search: React.FC<Props> = ({setStation, setZipcode, setLast, zipcode, last }) => {

    function handleClick(event: React.MouseEvent<HTMLButtonElement>){
        axios.get("http://localhost:5000/api/stations/zipcode=" + zipcode)
        .then(response => {
            processStations(response);
        })
        .catch(error =>{

            setStation({name:"", url:"", active: "", address:{street:"", city:"", zipcode:"", state:""}});
        })
    };

    function processStations(resp: AxiosResponse<any> ) {
        console.log(resp.data)
        setStation({
                    name: resp.data.name,
                    url: resp.data.url,
                    active: resp.data.active,
                    address: {
                        street: resp.data.address.street,
                        city: resp.data.address.city, 
                        zipcode: resp.data.address.zipcode,
                        state: resp.data.address.state 
                    }
            })
    };

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        setZipcode(event.target.value.toUpperCase());
    };

    return (
        <div>
            <label>Enter Zipcode:</label>
            <InputGroup className="mb-3" onChange={handleChange}>
                <FormControl
                placeholder="Zipcode"
                aria-label="Zipcode"
                aria-describedby="basic-addon1"
                value={zipcode}
                /> 
            </InputGroup>
            <div className="float-right mb-3">
                <Link to="/news">
                    <Button variant="primary" onClick={handleClick}>Search</Button>
                </Link>
            </div>
        </div>
    )

};

