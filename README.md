### App with keylockr and nginx as a reverse proxy ###

- This is a simple authentication app that focuses on keycloack and nginx as a reverse proxy integration
- The simplest way to run this application is via docker-compose with "bash run.sh"

### keycloak setup ###

- In order to setup keycloak you have to those actions in keycloak dashboard on "localhost/auth" or "localhost:2000/auth":

1) Create a realm (remember to change env var properly to match your realm name, default: react-realm)
2) Create a client (remember to change env var properly to match your client name, default: user)
3) Set up client valid_redirect_uri to "localhost/client/"
4) Set up the kind of authentication you want (register, email, remember me etc.)
