import KeycloakAdminClient from "keycloak-admin";

// to do

export async function getPublicKey(){
    if (!process.env.URL || !process.env.REALM || !process.env.CLIENTID) return console.log();

    
    const connection = new KeycloakAdminClient({
        baseUrl: process.env.URL,
        realmName: process.env.REALM
    });
    connection.auth({
        grantType: 'client_credentials',
        clientId: 'user',
        clientSecret: '123123123',
    })
    .then(() => {
        connection.realms.getKeys({
          realm: process.env.REALM || ""
        })
        .then(realm => {
            return realm.keys;
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
}
