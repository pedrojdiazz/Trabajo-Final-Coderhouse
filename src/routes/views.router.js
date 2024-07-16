import { Router } from "express";
import __dirname from "../utils.js";
import ProductManager from "../dao/db/product-manager.js";

const productManager = new ProductManager
const router = Router()

router.get("/realtimeproducts", async (req, res) => {
    res.render("realtimeproducts");
})

router.get("/", async (req, res) => {
    const products = await productManager.getProducts()
    res.render("home", {products});
})

export default router;