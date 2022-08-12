
import React, { FC } from "react";
import { getTimePastIfLessThanDay } from "../../../common/dates";

interface UserNameAndTimeProps{
    userName?: string;
    lastModifiedOn?: Date;
}

const UserNameAndTime: FC<UserNameAndTimeProps> =({
    userName,
    lastModifiedOn,
}) =>{
    let date :string = "";
    if( lastModifiedOn){
        date =  getTimePastIfLessThanDay(lastModifiedOn);
    }
    
    return(
        <span>
            <strong>{userName}</strong>
            <label style={{marginLeft: "1em"}}>
                {date}
            </label>
        </span>
    );
};

export default UserNameAndTime;