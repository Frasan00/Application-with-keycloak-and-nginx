import { useEffect, useRef, useContext } from "react";
import React, { AuthContext } from "../App";

export const AuthPage = () => {

    // since in restrict mode useEffect runs twice, we use a useRef  to return as soon as the second useEffect runs
    const { setAuthenticated, setJwt, keycloak } = useContext(AuthContext);
    const isRun = useRef(false);

    useEffect(() => {
        if (isRun.current) return;
        isRun.current = true;
        keycloak.init({ onLoad: 'login-required', checkLoginIframe: false })
        .then(() => {
            console.log("Authenticated");
            setJwt(keycloak.token);
            setAuthenticated(true);
        })
        .catch((err) => console.error(err))
    }, []);

    return(
        <h1>Please refresh the page untill keycloak is running to authenticate </h1> 
    )
}
