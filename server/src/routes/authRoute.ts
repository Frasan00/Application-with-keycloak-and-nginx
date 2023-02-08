import express from "express";
import dataValidation from "../middlewares/validationMiddleware";
import { register, login, logout } from "../controllers/authController";

// to do keyloack middleware

const router = express.Router();
router.post("/register", dataValidation,  register);
router.post("/login", dataValidation, login);
router.post("/logout", logout);

export default router;