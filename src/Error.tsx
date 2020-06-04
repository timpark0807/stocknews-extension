import React from "react";

interface Props {
    ticker: string;
};

export const Error: React.FC<Props> = ({ticker }) => {
    return (
        <div style={{textAlign:"center"}}>
            <h1>404 Error</h1>
            <label> We couldn't find anything for that ticker.</label>
            <br/>
            <label>Please try another search.</label>             
        </div>        
    )
};
