import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import { AuthPage } from "./paths/AuthPage";
import { HomePage } from "./paths/HomePage";
import React, {useEffect, useState} from "react";


function App() {

  const [jwt, setJwt] = useState(() => {
    const storedJwt = localStorage.getItem("jwt");
    return storedJwt ? storedJwt : "";
  });

  useEffect(() => {
    localStorage.setItem("jwt", jwt);
  }, [jwt])


  return (
    <Router>
        <div className="App">
        <Switch>

          <Route exact path = "/" >
            <AuthPage setJwt={setJwt} />
          </Route>


          <Route path = "/home">
            <HomePage jwt={jwt}/>
          </Route>

        </Switch>
      </div>
    </Router>

  );
}

export default App;