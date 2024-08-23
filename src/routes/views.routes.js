import { application, Router } from "express";
import ProductManager from "../dao/db/product-manager.js";
import CartManager from "../dao/db/cart-manager.js";
import { AuthHandler } from "../utils.js";

const authHandler = new AuthHandler();
const router = Router()

router.get("/realtimeproducts", async (req, res) => {
    res.render("realtimeproducts");
})

router.get("/products", authHandler.optionalAuthMiddleware("jwt", { session: false }), async (req, res) => {
    try {
        const { page = 1, limit = 10  } = req.query;
        const products = await ProductManager.getProducts({
            page: parseInt(page),
            limit: parseInt(limit)
        });
        let arrayProducts = products.payload.map( product => {
            return product.toObject();
        })
        res.render("home", {
            products: arrayProducts,
            user: req.user,
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
      let product = await ProductManager.getProductById(productId);
      product = product.toObject();
      
      res.render("product-details", { product });
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor"+error });
    }
  });


router.get("/carts/:cid", async (req, res) => {
    const cartId = req.params.cid;
 
    try {
       const cart = await CartManager.getCartById(cartId);
 
       if (!cart) {
          return res.status(404).json({ error: "Carrito no encontrado" });
       }
       const productsInCart = cart.products.map(item => ({
          product: item.product.toObject(),
          quantity: item.quantity
       }));
 
       res.render("carts", { products: productsInCart, cartId: cartId });
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

router.get("/profile", authHandler.passportCallMiddleware("jwt", { session: false }), authHandler.authorizationMiddleware("user"), async (req, res) => {
    try {

        const cart = await CartManager.getCartById(req.user.cart_id);
        const productsInCart = cart.products.map(item => ({
            product: item.product.title,
            quantity: item.quantity
         }));
        res.render('profile', {
            user: {
                ...req.user,
                cart: productsInCart
            }
        });

    } catch (error) {
        res.status(500).send('Error al cargar el perfil');
    }
});


export default router;