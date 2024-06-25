import { Router } from "express";
import {writeJsonFile, readJsonFile} from "../modules.js";
import __dirname from "../utils.js";
import CartManager from "../controllers/cart-manager.js";

const router = Router();
const FILE_PATH = __dirname+'/db/carrito.json'
const cartsManager = new CartManager(FILE_PATH)

router.post("/", async (req, res) => {
    try{
        let { products } = req.body;
        if (!products) products = [];
        await cartsManager.createCart(products)        
        res.status(201).json({message: 'Carrito creado con exito'});

    } catch (error) {
        throw error;
    }
})


router.get("/:cid", async (req, res) => {
    try {
        const id = parseInt(req.params.cid);
        const cartFound = await cartsManager.getCartById(id);
        if (cartFound){
            res.status(200).json({message: "Carrito encontrado", carrito: cartFound});
        }
        else{
            res.status(404).json({error: `Carrito con el id ${id} no encontrado`});
        }
    } catch (error) {
        throw error;
    }
})


router.post("/:cid/product/:pid", async (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const quantity = req.body.quantity || 1;
    try {
        await cartsManager.addProductToCart(cid, pid, quantity)
        res.status(200).json({message: "Producto agregado al carrito"})

    } catch (error) {
        console.error("Error al agregar producto al carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;