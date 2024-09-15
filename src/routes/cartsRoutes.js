import { Router } from "express";
import CartController from "../controllers/cartController.js";
import { AuthHandler } from "../middlewares/auth.js";

const authHandler = new AuthHandler();

const router = Router();

router.post("/", CartController.createCart);

router.get("/:cid", CartController.getCartById);

router.post("/:cid/products/:pid", authHandler.optionalAuthMiddleware("jwt", { session: false }),
    authHandler.authorizationMiddleware("user"),
    CartController.addProductToCart);

router.delete('/:cid/products/:pid', authHandler.optionalAuthMiddleware("jwt", { session: false }),
    authHandler.authorizationMiddleware("user"),
    CartController.deleteProductFromCart);

router.put('/:cid', CartController.addProductListToCart);

router.delete('/:cid', CartController.clearCart);

router.get('/:cid/purchase', authHandler.passportCallMiddleware("jwt", { session: false }))

export default router;