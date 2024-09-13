import { Router } from "express";
import cartController from "../controllers/cartController.js";

const router = Router();

router.post("/", cartController.createCart);

router.get("/:cid", cartController.getCartById);

router.post("/:cid/products/:pid", cartController.addProductToCart);

router.delete('/:cid/products/:pid', cartController.deleteProductFromCart);

router.put('/:cid', cartController.addProductListToCart);

router.delete('/:cid', cartController.clearCart);

export default router;