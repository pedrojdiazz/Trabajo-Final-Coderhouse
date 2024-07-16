import { Router} from "express";
import __dirname from "../utils.js";
import ProductManager from "../dao/db/product-manager.js";

const router = Router();
const productManager = new ProductManager


router.get("/", async (req, res) => {
    try {
        const { limit, page, sort, query } = req.query;
        const products = await productManager.getProducts({limit, page, sort, query});
        res.json({
            status: 'success',
            ...products
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: "Error interno del servidor" + error,
        });
    }
});




router.post("/", async (req, res) => {
    const newProduct = req.body;
    try {
        
        const succes = await productManager.addProduct(newProduct);
        if (!succes) {
            res.status(400).json({message: "El producto ya se encuentra cargado"})
        }
        else if (succes === -1){
            res.status(400).json({message: "Error, faltan campos por agregar"})
        }
        else {
            res.status(201).json({
                message: "Producto agregado exitosamente"
            })
    }
    } catch (error) {
        
        res.status(500).json({
            error: "Error interno del servidor",
            message: error
        });
        }
});


router.put("/:pid", async (req, res) => {
    try{
        const succes = await productManager.updateProduct(req.params.pid, req.body)
        if (!succes) {
            res.status(404).json({message: `Producto no encontrado`})}
        else {
            res.status(200).json({message: `Producto actualizado`})}
        
    }catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"})}
});


router.delete("/:pid", async (req, res) => {
    try{


        const succes = await productManager.deleteProduct(req.params.pid);
        if (succes) {
            res.status(200).json({message: `Producto eliminado`})}
        else {
            res.status(404).json({message: `Producto no encontrado`})
        }
        
        
}   catch (error) { 
        res.status(500).json({
            error: "Error interno del servidor"})

    }
});


export default router;