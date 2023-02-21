import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { AuthPage } from "./paths/AuthPage";
import { HomePage } from "./paths/HomePage";
import React, { useState } from "react";

function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [jwt, setJwt]  = useState("");

  return (

    <Router>
      <div className='App'>
        <Switch>

          <Route exact path="/">
              {authenticated === false ? 
              <AuthPage setAuthenticated={setAuthenticated} setJwt={setJwt}/>
              :     
              <HomePage setAuthenticated={setAuthenticated} jwt={jwt}/>}
          </Route>

          <Route exact path="/home">
            {authenticated === true ?     
            <HomePage setAuthenticated={setAuthenticated} jwt={jwt}/>
            : 
            <AuthPage setAuthenticated={setAuthenticated} setJwt={setJwt}/>}
          </Route>

      </Switch>
    </div>
  </Router>

  );
}

export default App;