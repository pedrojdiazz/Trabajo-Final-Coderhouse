import TicketDao from "../dao/db/ticketDao.js";
import CartService from "../services/cartService.js";
import ProductService from "../services/productService.js";

class TicketService {
    async createTicket(purchaser, cart_id) {
        const cart = await CartService.getCartById(cart_id);
        // Map each product 
        if (!cart){
            return -1;
        }
        const productsInCart = cart.products.map(item => ({
            product: item.product.title,
            quantity: item.quantity,
            price: item.product.price,   
            productId: item.product._id
        }));
        // Sum total amount
        let amount = 0;
        for (const item of productsInCart) {
            await ProductService.substractStock(item.productId, item.quantity);
            amount += item.price * item.quantity;
        }
        await CartService.ClearCart(cart_id)
        const result = await TicketDao.createTicket(amount, purchaser);
        
        const newTicket = {code: result.code, total: result.amount, purchaser: result.purchaser, date: result.purchase_datetime, products: productsInCart}

        return newTicket;
    }
}

export default new TicketService();