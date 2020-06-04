import React from "react";
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';

interface Props {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handleLastChange: (event: any) => void;
    ticker: string;
};

export const Search: React.FC<Props> = ({handleChange, handleClick, handleLastChange, ticker }) => {

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
                    <Form.Control as="select" onChange={handleLastChange}>
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

