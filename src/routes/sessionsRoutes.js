import { Router } from "express";
import SessionController from "../controllers/sessionController.js";
import { AuthHandler } from "../middlewares/auth.js";

const authHandler = new AuthHandler();

const router = Router();

router.post('/register', authHandler.passportCallMiddleware("register", { session: false }), (req, res) => SessionController.register(req, res));

router.post('/login', authHandler.passportCallMiddleware("login", { session: false }), (req, res) => SessionController.login(req, res));

router.get("/logout", (req, res) => SessionController.logout(req, res));

export default router;