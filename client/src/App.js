import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Keycloak from "keycloak-js"
import './App.css';
import { AuthPage } from "./paths/AuthPage";
import { HomePage } from "./paths/HomePage";
import React, { useState } from "react";

if (!process.env.REACT_APP_REALM){ console.log("REACT_APP_REALM env variable not set in .env"); }
if (!process.env.REACT_APP_CLIENTID){ console.log("REACT_APP_CLIENTID env variable not set in .env"); }
if (!process.env.REACT_APP_AUTH_SERVER_URL){ console.log("REACT_APP_URL env variable not set in .env"); }
const realm = process.env.REACT_APP_REALM;
const clientId = process.env.REACT_APP_CLIENTID;
const url = process.env.REACT_APP_AUTH_SERVER_URL;

export const AuthContext = React.createContext();

function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [jwt, setJwt]  = useState("");
  const keycloak = new Keycloak({
    url: url,
    realm: realm,
    clientId: clientId,
  });

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, jwt, setJwt, keycloak }}>
      <Router>
        <div className='App'>
          <Switch>
            <Route exact path="/">
              {authenticated === false ? 
                <AuthPage />
              :     
                <HomePage />
              }
            </Route>
            <Route exact path="/home">
              {authenticated === true ?     
                <HomePage />
              : 
                <AuthPage />
              }
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;