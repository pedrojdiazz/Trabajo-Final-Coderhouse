import { Router } from "express";
import {writeJsonFile, readJsonFile} from "../modules.js";

const router = Router();
const FILE_PATH = "./src/db/carrito.json";


router.post("/", (req, res) => {
    const carts = readJsonFile(FILE_PATH);
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
    writeJsonFile(FILE_PATH, carts);
    res.status(201).json({id});
})


router.get("/:cid", (req, res) => {
    const carts = readJsonFile(FILE_PATH);
    const id = parseInt(req.params.cid);
    const cartFound = carts.find(c => c.id === id);
    if (cartFound){
        const cartIndex = carts.findIndex(c => c.id === id);
        res.status(200).json({message: "Carrito encontrado", carrito: carts[cartIndex]});
    }
    else{
        res.status(404).json({error: `Carrito con el id ${id} no encontrado`});
    }
})


router.post("/:cid/product/:pid", (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const carts = readJsonFile(FILE_PATH);
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
    writeJsonFile(FILE_PATH, carts)
    res.status(200).json({message: `Producto con id ${pid} agregado al carrito ${cid} con exito!`, carrito: cartFound});

})
export default router;