import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { NewsTable } from './NewsTable'
import axios, {AxiosResponse} from 'axios';
import { Link } from "react-router-dom";

interface Props {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const Search: React.FC<Props> = ({handleChange, handleClick}) => {

    return (
    <div>
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
            <Link to="/news">
            <Button variant="primary" onClick={handleClick}>Search</Button>
            </Link>
        </InputGroup>
    </div>
    )

};

