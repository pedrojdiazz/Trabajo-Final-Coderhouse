import { Router } from "express";
import ProductController from "../controllers/productController.js";

const router = Router();

router.post("/", ProductController.addProduct);

router.get("/", ProductController.getProducts);

router.get("/:pid", ProductController.getProductById);

router.put("/:pid", ProductController.updateProduct);

router.delete("/:pid", ProductController.deleteProduct);

export default router;