import { AuthHandler } from "../middlewares/auth.js";

const authHandler = new AuthHandler();

class SessionController {

    register(req, res) {
        try {
            authHandler.createUserToken(req.user, res);
        } catch (error) {
            res.status(500).json({ message: 'Error en el registro', error: error.message });
        }
    }

    login(req, res) {
        try {
            authHandler.createUserToken(req.user, res);
        } catch (error) {
            res.status(500).json({
                error: "Error en el login",
                message: error.message
            });
        }
    }

    logout(req, res) {
        res.clearCookie("pepeCookieToken");
        res.redirect("/login");
    }
}

export default new SessionController(authHandler);