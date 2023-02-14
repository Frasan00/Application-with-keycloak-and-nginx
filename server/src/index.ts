import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/authRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", router); // auth route, it just authenticates an action with jwt

app.get('/api', (req, res) => {
    res.send("Nodejs Api");
})


app.listen(PORT, () => console.log("Listening on port "+PORT));
