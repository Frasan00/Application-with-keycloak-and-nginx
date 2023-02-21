import Keycloak from "keycloak-js";

if (!process.env.REACT_APP_REALM){ console.log("REACT_APP_REALM env variable not set in .env"); }
if (!process.env.REACT_APP_CLIENTID){ console.log("REACT_APP_CLIENTID env variable not set in .env"); }

const realm = process.env.REACT_APP_REALM;
const clientId = process.env.REACT_APP_CLIENTID;

export const keycloak = new Keycloak({
    url: "http://keycloak:8080/auth",
    realm: realm,
    clientId: clientId,
});