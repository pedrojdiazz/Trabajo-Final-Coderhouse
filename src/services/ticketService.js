import TicketDao from "../dao/db/ticketDao.js";
import CartService from "../services/cartService.js";
import ProductService from "../services/productService.js";

class TicketService {

    async createTicket(ticket, cart_id) {
        const cart = await CartService.getCartById(cart_id);
        const productsInCart = cart.products.map(item => ({
            productId: item.product._id,
            quantity: item.quantity,
            price: item.product.price

        }));
        let amount = 0;
        productsInCart.forEach(async (item) => {
            amount += item.price * item.quantity;
            await ProductService.substractStock(item.productId, item.quantity);
        });

        return TicketDao.createTicket(ticket);
    }
}