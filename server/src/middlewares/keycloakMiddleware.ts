import { getPublicKey } from "./keycloakConf";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const keycloakMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log(await getPublicKey())
    console.log(req.headers["authorization"])
    if (!req.headers["authorization"]) return res.status(400).send({auth: false, description: "No header provided"});
    const token = req.headers["authorization"].split(" ")[1];
    const realmPublicKey = await getPublicKey();

    const validation = jwt.verify(token, realmPublicKey,  (err: any) => {
        if(err) res.status(400).send({auth: false, description: "Token not valid"});
        next();
    });
}