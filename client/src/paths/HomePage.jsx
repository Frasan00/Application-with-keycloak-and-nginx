import { keycloak } from "../keycloakConf";
import { useState, useEffect } from "react";
import axios from "axios";

export const HomePage = ({jwt}) => {

    const [value, setValue] = useState(0);

    useEffect(() => {
        keycloak.init();
    }, [])

    const handleClick = () => {
        console.log("token: "+jwt)
        axios.post("/api/auth", {
            headers: {
              Authorization: `Bearer ${jwt}`,
            }})
        .then(() => {
            setValue(value + 1);
        })
        .catch(err => console.error(err));
    }

    const handleLogOut = () => {
        localStorage.clear();
        keycloak.logout({redirectUri: "http://localhost:80/"})
        .then(() => {
            keycloak.clearToken();
        })
        .catch(err => console.error(err));
    } 

    return(
        <div>
            <h2>Logged in the application <button onClick={ () => handleLogOut() }>Logout</button> </h2>
            <p>This action is protected with jsonwebtoken {value}<button onClick={() => handleClick()}>+</button></p>
        </div>   
    )
}