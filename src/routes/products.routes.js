import { Router} from "express";
import __dirname from "../utils.js";
import ProductManager from "../controllers/product-manager.js";

const router = Router();
const FILE_PATH = __dirname+'/db/productos.json'
const productManager = new ProductManager(FILE_PATH)


router.get("/", async (req, res) => {
    try {
        const splitNum = req.query.limit;
        const products = await productManager.loadProducts();
        if(splitNum){
            const productsSlice = products.slice(0, splitNum)
            res.json({message: "ok", productsSlice})
            return;
        }
        res.json({message: "ok", products})
    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor",
            message: error
        });
    }
});


    router.get("/:pid", async (req, res) => {
    try{
        const id = parseInt(req.params.pid);
        const product = await productManager.getProductById(id)
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
            error: "Error interno del servidor",
            message: error
        });
    }
});


router.post("/", async (req, res) => {
    const newProduct = req.body;
    try {
        
        const succes = await productManager.addProduct(newProduct);
        if (succes) {
        res.status(201).json({
            message: "Producto agregado exitosamente"
        })
    }else {
        res.status(400).json({message: "Error en la carga del producto"})
    }
    } catch (error) {
        
        res.status(500).json({
            error: "Error interno del servidor",
            message: error
        });
        }
});


router.put("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const updatedProduct = req.body;
    try{
        const succes = await productManager.updateProduct(id, updatedProduct)
        if (succes) {
            res.status(200).json({message: `usuario con ID ${id} actualizado`})}
        else {
            res.status(404).json({message: `usuario con ID ${id} no encontrado`})
        }
    }catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"})}
});


router.delete("/:pid", async (req, res) => {
    try{


        const id = parseInt(req.params.pid);
        const succes = await productManager.deleteProduct(id);
        if (succes) {
            res.status(200).json({message: `usuario con ID ${id} eliminado`})}
        else {
            res.status(404).json({message: `usuario con ID ${id} no encontrado`})
        }
        
        
}   catch (error) { 
        res.status(500).json({
            error: "Error interno del servidor"})

    }
});


export default router;