import {Request, Response} from "express";
import bcrypt from "bcrypt";
import client from "../database/connection";
import { keycloack } from "..";

export const register = async (req: Request, res: Response) => {
    const {userName, password} = req.body;
    // check if user exists
    const doppelganger = await client.query(`SELECT userName FROM users WHERE userName = ${userName}`);
    if(doppelganger) return res.status(400).send("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await client.query(`INSERT INTO users (email, password) VALUES (${userName}, ${password})`);
    console.log(`New user ${userName} registed`);
    return res.status(200).send("User succesfully registed");
};

export const login = async (req: Request, res: Response) => {
    const {userName, password} = req.body;
    // checks if email exists
    const user = await client.query(`SELECT userName FROM users WHERE userName = ${userName}`);
    if(!user) return res.status(400).send("User doesn't exist");

    const validatePassword = await bcrypt.compare(user.rows[0].password, password);
    if(!validatePassword) return res.status(400).send("Invalid Password");

    keycloack
    .grantManager.obtainDirectly(userName, password)
    .then(grant:any => {
        res.status(200).json({
            message: 'Login successful',
            grant
        });
    })

    res.status(200).send(`User logged in succesfully`);
};

export const logout = (req: Request, res: Response) => {

};

