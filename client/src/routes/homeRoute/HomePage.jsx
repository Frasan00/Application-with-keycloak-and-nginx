import axios from "axios";
import { useState } from "react";

export const HomePage = ({userName, jwt, setIsLogged}) => {

    // used for jwt authentication, making a request with jwt token
    const [counter, setCounter] = useState(0);
    
    // handlers
    const handleLogOut = () => {
        setIsLogged(false);
        axios.delete("http://localhost:5000/auth/logout/"+userName)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    };

    return (
        <div className="Homepage">
            <h1>Welcome {userName}</h1><button>Log out</button>
        </div>
    );
};