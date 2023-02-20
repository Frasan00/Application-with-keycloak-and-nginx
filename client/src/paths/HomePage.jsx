import { keycloak } from "../keycloakConf";
import { useState, useEffect } from "react";
import axios from "axios";

export const HomePage = ({jwt}) => {

    const [value, setValue] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            console.log("Token: "+keycloak.getToken());
        }, 1000)
    }, [])

    const handleClick = ()=>{
        axios.post("http://localhost/api/auth", {}, {
            headers: {
              Authorization: `Bearer ${jwt}`,
            }})
        .then(() => {
            setValue(value + 1);
        })
        .catch(err => console.error(err));
    }

    /*const handleLogOut = () => {
        localStorage.clear();
        keycloak.init()
        keycloak.logout({redirectUri: "http://localhost:3000/"})
        .then(() => {
            keycloak.clearToken();
        })
        .catch(err => console.error(err));
    } */

    return(
        <div>
            <h2>Logged in the application <button onClick={ () => handleLogOut() }>Logout</button> </h2>
            <p>This action is protected with jsonwebtoken {value}<button onClick={() => handleClick()}>+</button></p>
        </div>   
    )
}