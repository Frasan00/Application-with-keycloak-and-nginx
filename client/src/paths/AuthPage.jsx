import { useEffect } from "react";
import { keycloak } from "../keycloakConf";

export const AuthPage = ({setJwt}) => {

    // env variales controller
    useEffect(() => {
        if (!process.env.REACT_APP_URL){ console.log("REACT_APP_URL env variable not set in .env"); }
        if (!process.env.REACT_APP_REALM){ console.log("REACT_APP_REALM env variable not set in .env"); }
        if (!process.env.REACT_APP_CLIENTID){ console.log("REACT_APP_CLIENTID env variable not set in .env"); }

        setJwt("");

        // keycloak config
        
        keycloak.init({ 
        onLoad: 'login-required',
        promiseType: 'native',
        "checkLoginIframe": true,
        redirectUri: "http://localhost/home"
        }).then((res) => {
            if (res) {
            console.log('User is authenticated');
            console.log("token: "+keycloak.token);
            setJwt(keycloak.token);
        } else {
            console.log('User is not authenticated');
            }
        });
    })

    return(
        <h1>Please refresh the page untill keycloak is active to authenticate </h1>
    )
}