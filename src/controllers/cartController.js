import CartService from '../services/cartService.js';

class CartController {

    async createCart(req, res) {
        try {
            await CartService.createCart();
            res.status(201).json({ message: 'Carrito creado con exito' });

        } catch (error) {
            res.status(500).json({
                error: "Error interno del servidor" + error.message,
                message: error
            });
        }
    }

    async getCartById(req, res) {
        try {
            const id = req.params.cid;
            const cartFound = await CartService.getCartById(id);
            if (cartFound) {
                res.status(200).json({ message: "Carrito encontrado", carrito: cartFound });
            }
            else {
                res.status(404).json({ error: `Carrito con el id ${id} no encontrado` });
            }
        } catch (error) {
            res.status(500).json({
                error: "Error interno del servidor" + error.message,
                message: error
            });
        }
    }

    async addProductToCart(req, res) {
        const { cid, pid } = req.params;
        const quantity = req.body.quantity || 1;

        try {

            const cart = await CartService.addProductToCart(cid, pid, quantity)
            if (cart == -1) {
                res.status(404).json({ message: `Producto con el ID ${pid} no encontrado` })
            } else if (!cart) {
                res.status(404).json({ message: `Carrito con el ID ${cid} no encontrado` })
            } else {
                res.status(200).json({ message: "Producto agregado al carrito" })

            }
        } catch (error) {
            res.status(500).json({
                error: "Error interno del servidor" + error.message,
                message: error
            });
        }
    }

    async deleteProductFromCart(req, res) {
        const { cid, pid } = req.params;
        try {
            const cart = await CartService.deleteProductFromCart(cid, pid);

            if (cart === -1) {
                res.status(404).json({ message: `Producto con el ID ${pid} no encontrado` })
            } else if (!cart) {
                res.status(404).json({ message: `Carrito con el ID ${cid} no encontrado` })
            } else {
                res.status(200).json({ message: "Producto eliminado del carrito" })

            }
        } catch (error) {
            res.status(500).json({
                error: "Error interno del servidor" + error.message,
                message: error
            });
        }
    }

    async addProductListToCart(req, res) {
        const { cid } = req.params;
        const productList = req.body;
        try {
            const cart = await CartService.addProductListToCart(cid, productList);
            if (cart.some(elem => !elem.success)) {
                res.status(404).json({
                    message: `Hubo un error al agregar algunos productos `,
                    status: cart
                })
            }
            else {
                res.status(200).json({ message: "Carga de productos exitosa" })
            }
        } catch (error) {
            res.status(500).json({
                error: "Error interno del servidor" + error.message,
                message: error
            });
        }
    }

    async clearCart(req, res) {
        const { cid } = req.params;
        try {
            await CartService.clearCart(cid);
            res.status(200).json({ message: "Carrito vaciado" });
        } catch (error) {
            res.status(500).json({
                error: "Error interno del servidor" + error.message,
                message: error
            });
        }
    }
}

export default new CartController();