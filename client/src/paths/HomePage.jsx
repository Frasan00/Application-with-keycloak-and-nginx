import { keycloak } from "../keycloakConf";
import { useEffect, useState } from "react";
import axios from "axios";

export const HomePage = ({setAuthenticated, jwt}) => {

    const [value, setValue] = useState(0);
    useEffect(()=>console.log("token: "+jwt))

    const handleClick = ()=>{
        axios.post("http://localhost:5000/api/auth", {}, {
            headers: {
                authorization: `Bearer ${keycloak.token}`,
            }})
        .then(() => {
            setValue(value + 1);
        })
        .catch(err => console.error(err));
    }

    const handleLogOut = () => {
        localStorage.clear();
        keycloak.init()
        keycloak.logout({redirectUri: "http://localhost/"})
        .then(() => {
            keycloak.clearToken();
        })
        .catch(err => console.error(err));
    } 

    return(
        <div>
            <h2>Logged in the application <button onClick={ () => handleLogOut() }>Logout</button> </h2>
            <p>This action is protected with jsonwebtoken {value}<button type="submit" onClick={() => handleClick()}>+</button></p>
        </div>   
    )
}