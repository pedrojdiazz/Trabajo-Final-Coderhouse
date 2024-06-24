import { Router } from "express";
import {writeJsonFile, readJsonFile} from "../modules.js";
import __dirname from "../utils.js";
const router = Router();
const FILE_PATH = __dirname+'/db/carrito.json'

router.post("/", async (req, res) => {
    try{
        const carts = await readJsonFile(FILE_PATH);
        let { products } = req.body;
        let id;
        if (!products) products = [];
        
        try{
            id = carts[carts.length - 1].id + 1
        }
        catch(error){
            id = 1
        }
        carts.push({id, products});
        await writeJsonFile(FILE_PATH, carts);
        res.status(201).json({id});
    } catch (error) {
        throw error;
    }
})


router.get("/:cid", async (req, res) => {
    try {
        const carts = await readJsonFile(FILE_PATH);
        const id = parseInt(req.params.cid);
        const cartFound = carts.find(c => c.id === id);
        if (cartFound){
            const cartIndex = carts.findIndex(c => c.id === id);
            res.status(200).json({message: "Carrito encontrado", carrito: carts[cartIndex]});
        }
        else{
            res.status(404).json({error: `Carrito con el id ${id} no encontrado`});
        }
    } catch (error) {
        throw error;
    }
})


router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);
        const carts = await readJsonFile(FILE_PATH);
        const cartFound = carts.find(c => c.id === cid);
        if (!cartFound){
            res.status(404).json({error: `Carrito con el id ${cid} no encontrado`});
            return;
        }
        const cartIndex = carts.findIndex(c => c.id === cid);
        const productFound = carts[cartIndex]["products"].find(p => p.product === pid);
        if(productFound){
            productFound["quantity"] += 1
            
        }
        else{
            cartFound["products"].push({"product": pid, "quantity": 1})
        }
        await writeJsonFile(FILE_PATH, carts)
        res.status(200).json({message: `Producto con id ${pid} agregado al carrito ${cid} con exito!`, carrito: cartFound});
    } catch (error) {
        throw error;
    }
})

export default router;