
import { Request, Response, NextFunction } from "express";
import request from "request";


// middleware to validate tokens from keycloak
export const keycloakMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if(!token) return res.status(400).send("No token provided to the server by the client");
    const parts = token.split('.');
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    const issuer = payload.iss;
 
    const config = {
        method: 'GET',
        url: `${issuer}/protocol/openid-connect/userinfo`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    request(config, (error: any, response: any, body: any) => {
        console.log(`Request sent to: ${issuer}/protocol/openid-connect/userinfo`);
        console.log(config);
        if (error) { 
          return res.status(400).json(error);
        }
  
        // invalid token
        if (response.statusCode !== 200) {
          console.log("Not authorized transaction");
          return res.status(401).json(body);
        }
        next();
      });
}