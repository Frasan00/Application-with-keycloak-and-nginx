
import { Request, Response, NextFunction } from "express";
import axios from "axios";


// middleware to validate tokens from keycloak
export const keycloakMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if(!token) return res.status(400).send("No token provided to the server by the client");
    const parts = token.split('.');
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    const issuer = payload.iss;
 
    try {
      console.log(`Sending request to: ${issuer}/protocol/openid-connect/userinfo`);
      const response = await axios.get(`${issuer}/protocol/openid-connect/userinfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(JSON.stringify(response.data));
      next();
    } catch (error: any) {
      console.error(error);
      return res.status(401).json(error);
    }
}