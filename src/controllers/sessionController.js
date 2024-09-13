import { AuthHandler } from "../utils.js";

const authHandler = new AuthHandler();

class SessionController {
    constructor() {
        this.authHandler = new AuthHandler();
    }

    register(req, res) {
        try {
            this.authHandler.createUserToken(req.user, res);
        } catch (error) {
            res.status(500).json({ message: 'Error en el registro', error });
        }
    }

    login(req, res) {
        try {
            this.authHandler.createUserToken(req.user, res);
        } catch (error) {
            res.status(500).json({
                error: "Error interno del servidor" + error.message,
                message: error
            });
        }
    }

    logout(req, res) {
        res.clearCookie("pepeCookieToken");
        res.redirect("/login");
    }
}

export default new SessionController(authHandler);