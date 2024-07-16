import { Router } from "express";
import __dirname from "../utils.js";
import CartManager from "../dao/db/cart-manager.js";

const router = Router();

const cartsManager = new CartManager

router.post("/", async (req, res) => {
    try{

        await cartsManager.createCart()        
        res.status(201).json({message: 'Carrito creado con exito'});

    } catch (error) {
        throw error;
    }
})


router.get("/:cid", async (req, res) => {
    try {
        const id = req.params.cid;
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


router.post("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const quantity = req.body.quantity || 1;
    try {
        const cart = await cartsManager.addProductToCart(cid, pid, quantity)
        
        if (cart === -1){
            res.status(404).json({message: `Producto con el ID ${pid} no encontrado`})
        } else if (!cart) {
            res.status(404).json({message: `Carrito con el ID ${cid} no encontrado`})}
        else {
            res.status(200).json({message: "Producto agregado al carrito"}) 

        }
        

    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" + error});
    }
});

router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await cartsManager.deleteProductFromCart(cid, pid);

        if (cart === -1){
            res.status(404).json({message: `Producto con el ID ${pid} no encontrado`})
        } else if (!cart) {
            res.status(404).json({message: `Carrito con el ID ${cid} no encontrado`})}
        else {
            res.status(200).json({message: "Producto eliminado del carrito"})
        }
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor"  })  
        }
    });

router.put('/:cid', async (req, res) => { 
    const cid = req.params.cid;
    const products = req.body;
    try {
        const cart = await cartsManager.addProductListToCart(cid, products);
        if (cart.some(elem => !elem.success)){
            res.status(404).json({
                message: `Hubo un error al agregar algunos productos `,
                status: cart
            })}
        else {
            res.status(200).json({message: "Carga de productos exitosa"})
        }

    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" + error});
    }
})

router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const quantity = req.body.quantity || 1;
    try {
        const cart = await cartsManager.updateProductQuantity(cid, pid, quantity)
        
        if (cart === -1){
            res.status(404).json({message: `Producto con el ID ${pid} no encontrado`})
        } else if (!cart) {
            res.status(404).json({message: `No se pudo actualizar la cantidad del producto ${pid}`})}
        else {
            res.status(200).json({message: "Producto agregado al carrito"}) 

        }
        

    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" + error});
    }
});

router.delete('/:cid', async (req, res) => {
    const cid = req.params.cid;
    try {
        const cart = await cartsManager.clearCartProducts(cid);
        if (!cart){
            res.status(404).json({message: `Carrito con el ID ${cid} no encontrado`})
        } else {
            res.status(200).json({message: "Carrito vaciado"})
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor"  + error})  
    }
})


export default router;