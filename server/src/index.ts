import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Response, Request } from "express";
import { keycloakMiddleware } from "./middlewares/keycloakMiddleware";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// authenticated action
app.post("/api/auth", keycloakMiddleware, (req: Request, res: Response) => {
    console.log("An action was authenticated");
    res.send("Operation authenticated");
})

app.get('/api', (req: Request, res: Response) => {
    res.send("Nodejs Api");
})


app.listen(PORT, () => console.log("Listening on port "+PORT));
