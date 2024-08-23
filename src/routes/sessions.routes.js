import { Router } from "express";
import { AuthHandler } from "../utils.js";
import ProductManager from "../dao/db/product-manager.js";
import CartManager from "../dao/db/cart-manager.js";
const router = Router();
const authHandler = new AuthHandler();


router.post('/register', authHandler.passportCallMiddleware("register", { session: false }), async (req, res) => {
    try {
        authHandler.createUserToken(req.user, res);
    } catch (error) {
        return res.status(500).json({ message: 'Error en el registro', error });
    }
});


router.post('/login', authHandler.passportCallMiddleware("login", { session: false }), (req, res) => {
    try {
        authHandler.createUserToken(req.user, res);
    } catch (error) {
        return res.status(500).json({ message: 'Error en el login', error });
    }
});


router.get("/logout", (req, res) => {
    res.clearCookie("pepeCookieToken");
    res.redirect("/login"); 
})

export default router;