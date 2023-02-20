
import { Request, Response, NextFunction } from "express";
import request from "request";


// middleware to validate tokens from keycloak
export const keycloakMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    const realm = process.env.REALM || "";
    console.log("token: "+token);

    const config = {
        method: 'GET',
        url: `http://keycloak:8080/auth/realms/${realm}/protocol/openid-connect/userinfo`,
        headers: {
          Authorization: token
        },
    }

    request(config, (error, response, body) => {
        if (error) return res.status(400).json(error);
  
        // invalid token
        if (response.statusCode !== 200) {
          return res.status(401).json({
            error: `unauthorized`,
          });
        }
        next();
      });
}