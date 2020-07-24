import React from "react";
import { Station } from "./MainPage";
import { Container, Row, Col } from 'react-bootstrap';

interface Props {
    station: Station;
};

export const NewsHeader: React.FC<Props> = ({ station }) => {

    const renderAddress = () => {
        return (
            <div>
                {station.address.street} 
                <br/>
                {station.address.city + ", " + station.address.state + " " + station.address.zipcode}

            </div>
        )
    }
    return (
        <div>
            <div>
                <div>
                    <label style={{fontSize:"x-large", fontWeight:"bold"}}>
                        {station.name} 
                    </label>
                </div>

                <div>
                    <label>
                        <a href={"https://www.tesla.com" + station.url}>Link</a>
                    </label>
                </div>

                <div>
                    {renderAddress()}
                </div>
    
            </div>
        </div>

    )
};