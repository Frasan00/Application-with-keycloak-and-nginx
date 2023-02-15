import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
    url: process.env.REACT_APP_URL,
    realm: process.env.REACT_APP_REALM,
    clientId: process.env.REACT_APP_CLIENTID,
});
