import { Router } from "express";
import ProductManager from "../dao/db/product-manager.js";

const router = Router();


router.get("/", async (req, res) => {
    try {
        const { limit, page, sort, query, minPrice, maxPrice} = req.query;
        const products = await ProductManager.getProducts({limit, page, sort, query, minPrice, maxPrice});
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

router.get("/:pid", async (req, res) => {
    try{
        const id = req.params.pid;
        const product = await ProductManager.getProductById(id)
        if (product){
            res.json({
                message: "Producto encontrado",
                response: product
                })
            }
        else { 
            res.status(404).json({error: `Producto con id ${id} no encontrado`})
        }
    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor" + error,
            message: error
        });
    }
});


router.post("/", async (req, res) => {
    const newProduct = req.body;
    try {
        
        const succes = await ProductManager.addProduct(newProduct);
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
        const succes = await ProductManager.updateProduct(req.params.pid, req.body)
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

        const succes = await ProductManager.deleteProduct(req.params.pid);
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