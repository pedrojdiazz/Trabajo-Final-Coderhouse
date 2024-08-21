import { application, Router } from "express";
import ProductManager from "../dao/db/product-manager.js";
import CartManager from "../dao/db/cart-manager.js";
const productManager = new ProductManager
const cartManager = new CartManager
const router = Router()

router.get("/realtimeproducts", async (req, res) => {
    res.render("realtimeproducts");
})

router.get("/products", async (req, res) => {
    try {
        const { page = 1, limit = 10  } = req.query;
        const products = await productManager.getProducts({
            page: parseInt(page),
            limit: parseInt(limit)
        });
        let arrayProducts = products.payload.map( product => {
            const productResult = product.toObject();
            return productResult;
        })
        res.render("home", {
            products: arrayProducts,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            currentPage: products.page,
            totalPages: products.totalPages,
            prevLink: products.prevLink,
            nextLink: products.nextLink
            });
    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
         });
    }
    
});


router.get("/products/:pid", async (req, res) => {
    try {
      const productId = req.params.pid;
      let product = await productManager.getProductById(productId);
      product = product.toObject();
      
      res.render("product-details", { product });
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor"+error });
    }
  });


router.get("/carts/:cid", async (req, res) => {
    const cartId = req.params.cid;
 
    try {
       const cart = await cartManager.getCartById(cartId);
 
       if (!cart) {
          return res.status(404).json({ error: "Carrito no encontrado" });
       }
       const productsInCart = cart.products.map(item => ({
          product: item.product.toObject(),
          quantity: item.quantity
       }));
 
 
       res.render("carts", { products: productsInCart });
    } catch (error) {
       res.status(500).json({ error: "Error interno del servidor"+ error});
    }
 });

router.get("/login", (req, res) => {
    res.render("login"); 
})

router.get("/register", (req, res) => {
    res.render("register"); 
})


export default router;