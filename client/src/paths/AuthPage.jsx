import { useEffect } from "react";
import { keycloak } from "../keycloakConf";

export const AuthPage = ({setJwt}) => {

    // env variales controller
    useEffect(() => {
        if (!process.env.REACT_APP_URL){ console.log("REACT_APP_URL env variable not set in .env"); }
        if (!process.env.REACT_APP_REALM){ console.log("REACT_APP_REALM env variable not set in .env"); }
        if (!process.env.REACT_APP_CLIENTID){ console.log("REACT_APP_CLIENTID env variable not set in .env"); }

        // keycloak config
        keycloak.init({ 
        onLoad: 'login-required',   
        promiseType: 'native',
        redirectUri: "http://localhost/home"
        })
        .then((authenticated) => {
            console.log("Authenticated");
            setJwt(keycloak.token);
        })
        .catch(err => console.error(err));
    }, [])

    return(
        <h1>Please refresh the page untill keycloak is running to authenticate </h1>
    )
}