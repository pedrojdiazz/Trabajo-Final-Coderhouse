// src/routes/sessionsRoutes.js
import { Router } from "express";
import SessionController from "../controllers/sessionController.js";

const router = Router();

router.post('/register', SessionController.authHandler.passportCallMiddleware("register", { session: false }), (req, res) => SessionController.register(req, res));

router.post('/login', SessionController.authHandler.passportCallMiddleware("login", { session: false }), (req, res) => SessionController.login(req, res));

router.get("/logout", (req, res) => SessionController.logout(req, res));

export default router;