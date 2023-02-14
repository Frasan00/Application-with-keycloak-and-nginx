import axios from "axios";
import Keycloak from "keycloak-js";
import './App.css';
import React, {useEffect, useState} from "react";


function App() {

  const [isLogged, setIsLogged] = useState(false);
  const [jwt, setJwt] = useState("");

  // env variales controller
  useEffect(() => {
    if (!process.env.REACT_APP_URL){ console.log("REACT_APP_URL env variable not set in .env"); }
    if (!process.env.REACT_APP_REALM){ console.log("REACT_APP_REALM env variable not set in .env"); }
    if (!process.env.REACT_APP_CLIENTID){ console.log("REACT_APP_CLIENTID env variable not set in .env"); }

    // keycloak config
    const keycloak = new Keycloak({
      url: process.env.REACT_APP_URL,
      realm: process.env.REACT_APP_REALM,
      clientId: process.env.REACT_APP_CLIENTID,
    });

    keycloak.init({ onLoad: 'login-required', redirectUri: 'http://localhost:/logged' }).then((res) => {
        if (res) {
        console.log('User is authenticated');
        console.log("token: "+keycloak.token);
        setJwt(keycloak.token);
        setIsLogged(true);
        return;
    } else {
        console.log('User is not authenticated');
        }
    });
  }, [])
  
  return (
    <div className="App">
      { isLogged === true &&  <h1>You're logged in the application</h1> }
      { isLogged === false &&  <h1>You're not logged in the application</h1> }
    </div>
  );
}

export default App;
