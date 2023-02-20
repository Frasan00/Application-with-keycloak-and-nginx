import Keycloak from "keycloak-js";

if (!process.env.REACT_APP_URL){ console.log("REACT_APP_URL env variable not set in .env"); }
if (!process.env.REACT_APP_REALM){ console.log("REACT_APP_REALM env variable not set in .env"); }
if (!process.env.REACT_APP_CLIENTID){ console.log("REACT_APP_CLIENTID env variable not set in .env"); }

class KeycloakReact{

    keycloak = null
    url = process.env.REACT_APP_URL;
    realm = process.env.REACT_APP_REALM;
    clientId = process.env.REACT_APP_CLIENTID;
    token = "";

    constructor(){
        // keycloak initialization
        this.keycloak = new Keycloak({
            url: this.url,
            realm: this.realm,
            clientId: this.clientId
        });
        this.start();
    }

    start(){
        this.keycloak.init()
    }

    loginReact(setLogged){
        this.keycloak.login()
        .then(() => {
            console.log("Authenticated");
            this.token = this.keycloak.token;
            setLogged(true);
        })
    }

    getToken(){
        return this.token || "no token registed";
    }
}


export const keycloak = new KeycloakReact();