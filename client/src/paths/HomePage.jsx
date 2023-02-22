import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App";
import axios from "axios";

export const HomePage = () => {

    const [value, setValue] = useState(0);
    const { setAuthenticated, jwt, keycloak } = useContext(AuthContext);

    useEffect(()=> console.log("token: "+jwt))

    const handleClick = ()=>{
        axios.post("http://localhost:5000/api/auth", {}, {
            headers: {
                authorization: `Bearer ${jwt}`,
            }})
        .then(() => {
            setValue(value + 1);
        })
        .catch(err => console.error(err));
    }

    const handleLogOut = () => {
        keycloak.init()
        keycloak.logout({checkLoginIframe: false })
        .then(() => {
            keycloak.clearToken();
            setAuthenticated(false);
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