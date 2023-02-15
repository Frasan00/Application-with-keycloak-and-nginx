import { keycloak } from "../keycloakConf";
import { useState } from "react";
import axios from "axios";

export const HomePage = ({jwt}) => {

    const [value, setValue] = useState(0);

    const handleClick = () => {
        axios.post("http://localhost:5000/api/auth", {
            headers: {
              Authorization: `Bearer ${jwt}`,
            }})
        .then(() => {
            setValue(value + 1);
        })
        .catch(err => console.error(err));
    }


    return(
        <div>
            <h2>Logged in the application <a href='/#' onClick={() => keycloak.logout({ redirectUri: 'http://localhost/', prompt: 'none' })}>Logout</a></h2>
            <p>This action is protected with jsonwebtoken {value}<button onClick={() => handleClick()}>+</button></p>
        </div>   
    )
}