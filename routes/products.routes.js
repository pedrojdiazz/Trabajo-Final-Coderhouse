import { Router } from "express";

const products = [{id: 1, title:"Mesa", description: "mesa ratona", code: "ABC", price: 100, status: true, stock: 12, category: "Muebles", thumbnail:["foto"]},
{id: 2, title:"Silla", description: "silla gamer", code: "ABCD", price: 200, status: true, stock: 12, category: "Muebles", thumbnail:["foto"]},
{id: 3, title:"Monitor", description: "monitor 23' fullhd", code: "ABCE", price: 3300, status: true, stock: 12, category: "Muebles", thumbnail:["foto"]},
{id: 4, title:"Escritorio", description: "escritorio 120x80", code: "ABCF", price: 4200, status: true, stock: 12, category: "Muebles", thumbnail:["foto"]},

];
const router = Router();

router.get("/", (req, res) => {
    res.json({message: "ok", products})

});

router.get("/:pid", (req, res) => {
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
        res.status(404).json({error: "Producto no encontrado"})
    }
})

router.post("/", (req, res) => {
    const title = req.body.name;
    const description = req.body.description;
    const code = req.body.code;
    const price = req.body.price;
    const status = req.body.status;
    const stock = req.body.stock;
    const category = req.body.category;
    const thumbnail = req.body.thumbnail;

    if(!title || !description || !code || !price || !status || !stock || !category){
        res.status(400).json({error: "FALTAN CAMPOS PARA AGREGAR UN PRODUCTO NUEVO"})
        return;
    }
    let id = products[products.length - 1].id + 1
    products.push({title, description, code, price, id, status, stock, category, thumbnail})
    res.status(201).json({id})
})

router.put("/:pid", (req, res) => {
    const id = parseInt(req.params.id);

})

router.delete("/pid", (req, res) => {
    const id = parseInt(req.params.id);
    const productFound = products.find(p => p.id === id);
    if(productFound){
        const index = products.findIndex(p => p.id === id)
        products.splice(index, 1)
        res.status(200).json({message: `usuario con ${id} eliminado`})
    }
    else {
        res.status(404).json({error: "USUARIO NO ENCONTRADO"})
    }
})
export default router;