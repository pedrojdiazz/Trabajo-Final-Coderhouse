import { Router } from "express";
import ProductController from "../controllers/productController.js";
import { AuthHandler } from "../middlewares/auth.js";

const authHandler = new AuthHandler();

const router = Router();

router.post("/", authHandler.optionalAuthMiddleware("jwt", { session: false }),
    authHandler.authorizationMiddleware("admin"),
    ProductController.addProduct);

router.get("/", ProductController.getProducts);

router.get("/:pid", ProductController.getProductById);

router.put("/:pid", authHandler.optionalAuthMiddleware("jwt", { session: false }),
    authHandler.authorizationMiddleware("admin"),
    ProductController.updateProduct);

router.delete("/:pid", authHandler.optionalAuthMiddleware("jwt", { session: false }),
    authHandler.authorizationMiddleware("admin"),
    ProductController.deleteProduct);

export default router;