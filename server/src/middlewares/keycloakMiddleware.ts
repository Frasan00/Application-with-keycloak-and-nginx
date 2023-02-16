
import { Request, Response, NextFunction } from "express";
import request from "request";


// middleware to validate tokens from keycloak
export const keycloakMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log(token)

    const config = {
        method: 'GET',
        url: "/auth/token",
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