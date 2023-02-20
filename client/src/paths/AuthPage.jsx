import { useEffect, useState } from "react";
import { keycloak } from "../keycloakConf";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

export const AuthPage = ({setJwt}) => {

    const [logged, setLogged] = useState(false);

    useEffect(() => {
        keycloak.loginReact(setLogged);
    }, []);

    return(
        <Router>
            <div>
                <Switch>    
                    {logged === true ? 
                    <Route exact path = "http://localhost/">
                        <Redirect to="http://localhost:3000/home" />
                    </Route>
                    :
                    <Route exact path = "http/">
                        <Redirect to="http://localhost:3000/home" />
                    </Route>
                    }
                    <h1>Please refresh the page untill keycloak is running to authenticate </h1> 
                </Switch>
            </div>
        </Router>

    )
}