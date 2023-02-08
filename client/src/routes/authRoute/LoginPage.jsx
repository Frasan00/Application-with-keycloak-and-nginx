import React, { useState, useEffect } from "react";
import axios from "axios";
import loginStyle from "./authStyle.css";

export const LoginPage = ({setUserName, setJwt, setIsLogged, userName }) => {

    const [password, setPassword] = useState("");
    // errors
    const [noCredential, setNoCredential] = useState(null); // error if !userName or !password
    const [invalidCredential, setInvalidCredential] = useState(null);
    const [wrongPassword, setWrongPassword] = useState(null);
    const [userDoesentExists, setUserDoesentExists] = useState(null);

    // When you are in the login page everything is resetted to avoid conflicts with local storage
    useEffect(() => {
        localStorage.clear();
        setUserName("");
        setJwt("");
        setIsLogged(false);
    }, []);

    // handlers
    const handleLogIn = () => {
        setWrongPassword(null);
        setNoCredential(null);
        setInvalidCredential(null);
        setUserDoesentExists(null);
        if (userName === "" || password === "") return setNoCredential(true);
        const data = {
            userName: userName,
            password: password
        };
        axios.post("http://localhost:5000/auth/login", data)
        .then((res) => {
            setJwt(res.data);
            setIsLogged(true);
        })
        .catch((err) => {
            console.log(err);
            if (err.response.data === "Invalid Password") setWrongPassword(true);
            else if (err.response.data === "User doesn't exist") setUserDoesentExists(null);
            else setInvalidCredential(true);
        });
    };

    const handleUserName = (event) => { setUserName(event.target.value); };
    const handlePassword = (event) => { setPassword(event.target.value); };

    return (
        <div className="AuthBlock">
            <h3 className="LogIn">Log in to your account</h3>
            <p>New to File Share? <a className="NewUser" href="/register">Sign up here!</a></p>

            <p className="UserNameLabel">Username </p>
            <input type="text" className="form-control" placeholder="Enter your username... " onChange={handleUserName}/>

            <p className="PasswordLabel">Password </p>
            <input type="password" className="form-control" placeholder="Enter your password... " onChange={handlePassword}/>

            <button className="btn btn-primary" onClick={() => handleLogIn()}>Log In</button>
            {noCredential && <p className="Error">Please enter all fields</p>}
            {invalidCredential && <p className="Error">Invalid Username or Passoword</p>}
            {wrongPassword && <p className="Error">Wrong password</p>}
            {userDoesentExists && <p className="Error">User name doesn't exists</p>}
        </div>
    );
};