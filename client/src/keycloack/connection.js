import Keycloak from "keycloak-js";

export function connect({setIsLogged, setJwt}){
    const keycloak = new Keycloak({
        url: process.env.REACT_APP_URL,
        realm: process.env.REACT_APP_REALM,
        clientId: process.env.REACT_APP_CLIENTID,
      });

    keycloak.init({ onLoad: 'login-required', checkLoginIframe: false, redirect_uri: "http://localhost:3000/" }).then((res) => {
        if (res) {
        console.log('User is authenticated');
        console.log("token: "+keycloak.token);
        setJwt(keycloak.token);
        setIsLogged(true);
    } else {
        console.log('User is not authenticated');
        }
    });
}