import React, { useState } from "react";
import { Search } from "./Search";
import { Route } from "react-router-dom";
import { NewsHeader } from "./NewsHeader";
import { Error } from "./Error";
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import TabContent from 'react-bootstrap/TabContent'

export interface Station {
    name: string;
    url: string;
    active: string; 
    address: Address;
}

export interface Address {
    city: string; 
    street: string;
    zipcode: string;
    state: string; 
}

export const MainPage: React.FC = () => {

    const [last, setLast] = useState("5")
    const [zipcode, setZipcode] = useState("");
    const [station, setStation] = useState<Station>({name:"", url:"", active: "", address:{street:"", city:"", zipcode:"", state:""}});

    return (

        <div className="page">
            <Route path="/index.html">

                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Search">
                    <TabContent >
                    <Search 
                            last={last} 
                            zipcode={zipcode} 
                            setStation={setStation} 
                            setZipcode={setZipcode} 
                            setLast={setLast}
                        />
                        </TabContent>
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    "temp"
                </Tab>
                </Tabs>
                
            </Route>

            <Route exact path="/news">
                {station.url.length >= 1 ?

                    // if request was succesful, display news page. 
                    <div> 
                        <NewsHeader station={station}/>
                    </div>
                : 

                    // if request did not return a valid result, display error page. 
                    <div>
                        <Error ticker={zipcode}/>
                    </div>
                }
            </Route>
        </div>

    )
}

export default MainPage;
