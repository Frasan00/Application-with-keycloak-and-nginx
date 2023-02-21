import Keycloak from "keycloak-js";

if (!process.env.REACT_APP_URL){ console.log("REACT_APP_URL env variable not set in .env"); }
if (!process.env.REACT_APP_REALM){ console.log("REACT_APP_REALM env variable not set in .env"); }
if (!process.env.REACT_APP_CLIENTID){ console.log("REACT_APP_CLIENTID env variable not set in .env"); }

const url = process.env.REACT_APP_URL;
const realm = process.env.REACT_APP_REALM;
const clientId = process.env.REACT_APP_CLIENTID;

export const keycloak = new Keycloak({
    url: url,
    realm: realm,
    clientId: clientId,
});