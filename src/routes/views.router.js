import { Router } from "express";
import __dirname from "../utils.js";
import ProductManager from "../controllers/product-manager.js";

const PRODUCTS_FILE_PATH = __dirname+'/db/productos.json'
const productManager = new ProductManager(PRODUCTS_FILE_PATH)
const router = Router()

router.get("/realtimeproducts", async (req, res) => {
    res.render("realtimeproducts");
})

router.get("/", async (req, res) => {
    const products = await productManager.loadProducts()
    res.render("home", {products});
})

export default router;