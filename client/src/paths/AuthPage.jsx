import { useEffect, useRef } from "react";
import { keycloak } from "../keycloakConf";
import React from "react";


export const AuthPage = ({setAuthenticated, setJwt}) => {

    // since in restrict mode useEffect runs twice, we use a useRef  to return as soon as the second useEffect runs
    const isRun = useRef(false);

    useEffect(() => {
        if (isRun.current) return;
        isRun.current = true;
        keycloak.init({ onLoad: 'login-required' })
        .then(() => {
            console.log("Authenticated");
            setJwt(keycloak.token);
            setAuthenticated(true);
        })}, []);

    return(
        <h1>Please refresh the page untill keycloak is running to authenticate </h1> 
    )
}