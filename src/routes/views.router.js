import { Router } from "express";
import {writeJsonFile, readJsonFile} from "../modules.js";
import __dirname from "../utils.js";

const router = Router()
const PRODUCTS_FILE_PATH = __dirname+'/db/productos.json'

router.get("/realtimeproducts", async (req, res) => {
    res.render("realtimeproducts");
})

router.get("/", async (req, res) => {
    const products = await readJsonFile(PRODUCTS_FILE_PATH)
    res.render("home", {products});
})

export default router;