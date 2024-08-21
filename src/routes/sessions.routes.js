import { Router } from "express";
import { passportCall, authorization, handleLogin} from "../utils.js";
const router = Router();


router.post('/register', passportCall("register", { session: false }), async (req, res) => {
    try {
        handleLogin(req.user, res);
    } catch (error) {
        return res.status(500).json({ message: 'Error en el registro', error });
    }
});


router.post('/login', passportCall("login", { session: false }), (req, res) => {
    try {
        handleLogin(req.user, res);
    } catch (error) {
        return res.status(500).json({ message: 'Error en el login', error });
    }
});


router.get("/current", passportCall("jwt", { session: false }), authorization("user"), (req, res) => {
    if (req.user) {
        res.render("profile", { user: req.user });
    } else {
        res.status(401).send("No autorizado");
    }
})


router.get("/logout", (req, res) => {
    res.clearCookie("pepeCookieToken");
    res.redirect("/login"); 
})

export default router;