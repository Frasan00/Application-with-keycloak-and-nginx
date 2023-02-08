import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute";
import Keycloak from "keycloak-js";

dotenv.config();

const app = express();
// keycloack initialization
export const keycloack = new Keycloak({
    url: process.env.KEYCLOACK_URL,
    realm: process.env.KEYCLOACK_REALM || "my-realm",
    clientId: process.env.KEYCLOACK_CLIENTID || "user"
})
  
  

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute)

app.get('/api', (req, res) => {
    res.send("Nodejs Api");
})


app.listen(PORT, () => console.log("Listening on port "+PORT));
