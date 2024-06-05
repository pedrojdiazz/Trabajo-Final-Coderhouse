import { Router} from "express";
import {writeJsonFile, readJsonFile} from "../modules.js";

const router = Router();
const FILE_PATH = "./src/db/productos.json";



router.get("/", (req, res) => {
    const splitNum = req.query.limit;
    const products = readJsonFile(FILE_PATH);
    if(splitNum){
        const productsSlice = products.slice(0, splitNum)
        res.json({message: "ok", productsSlice})
        return;
    }
    res.json({message: "ok", products})

});


router.get("/:pid", (req, res) => {
    const products = readJsonFile(FILE_PATH);
    const id = parseInt(req.params.pid);
    const productFound = products.find(p => p.id === id);
    if(productFound){
        const index = products.findIndex(p => p.id === id);
        res.json({
            message: "Producto encontrado",
            response: products[index]
        })
    }
    else {
        res.status(404).json({error: `Producto con id ${id} no encontrado`})
    }
})


router.post("/", (req, res) => {
    const products = readJsonFile(FILE_PATH);
    
    const {title, description, code, price, status, stock, category, thumbnail} = req.body;
    if(!title || !description || !code || !price || !status || !stock || !category){
        res.status(400).json({error: "FALTAN CAMPOS PARA AGREGAR UN PRODUCTO NUEVO"})
        return;
    }
    let id;
    try{
        id = products[products.length - 1].id + 1
    }
    catch(error){
        id = 1
    }
    products.push({id, title, description, code, price, status, stock, category, thumbnail})
    writeJsonFile(FILE_PATH, products)
    res.status(201).json({id})
})


router.put("/:pid", (req, res) => {
    const products = readJsonFile(FILE_PATH);

    const id = parseInt(req.params.pid);
    const productFound = products.find(p => p.id === id);
    if(productFound){
        const productIndex = products.findIndex(p => p.id === id);
        const fields = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnail'];
        fields.forEach(field => {
            if(req.body[field] !== undefined){
                products[productIndex][field] = req.body[field];
            }
        })    
        writeJsonFile(FILE_PATH, products)
        res.status(200).json({message: `Producto con ID ${id} actualizado correctamente!`});
    }
    else{
    res.status(404).json({error: `Producto con ID ${id} no encontrado`});
    }
})


router.delete("/:pid", (req, res) => {
    const products = readJsonFile(FILE_PATH);

    const id = parseInt(req.params.pid);
    const productFound = products.find(p => p.id === id);
    if(productFound){
        const index = products.findIndex(p => p.id === id)
        products.splice(index, 1)
        writeJsonFile(FILE_PATH, products)
        res.status(200).json({message: `usuario con ID ${id} eliminado`})
    }
    else {
        res.status(404).json({error: `Usuario con ID ${id} no encontrado`})
    }
})


export default router;