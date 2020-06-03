import React from "react";
import { Profile } from "./MainPage";

interface Props {
    profile: Profile;
};

export const NewsHeader: React.FC<Props> = ({ profile }) => {
    return (
        <div>
            <div>
                <label style={{fontSize:"x-large", fontWeight:"bold"}}>
                    {profile.companyName} 
                </label>
            </div>

            <div>
                <label>
                    Latest Price: ${profile.latestPrice}
                </label>
            </div>

            <div>
                <label>
                    Displaying news articles for ${profile.symbol}
                </label>
            </div>
        </div>
    )
};