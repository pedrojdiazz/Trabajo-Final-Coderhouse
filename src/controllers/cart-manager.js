import { promises as fs } from "fs";
class CartManager {
    static ultId = 0;

    constructor(path) {
        this.carts = [];
        this.path = path;
    }

    async loadCarts() {
        try {
            const data = await fs.readFile(this.path, "utf8");
            this.carts = JSON.parse(data);
            if (this.carts.length > 0) {
                CartManager.ultId = this.carts.reduce((maxId, product) => Math.max(maxId, product.id), 0);
            }
        } catch (error) {
            await this._saveCarts();
        }
    }

    async _saveCarts() {
        
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    async createCart(products) {
        await this.loadCarts()
        const newCart = {
            id: ++CartManager.ultId,
            products
        };

        this.carts.push(newCart);

        await this._saveCarts();
        return newCart;
    }

    async getCartById(cartId) {
        try {
            await this.loadCarts()
            const cart = this.carts.find(c => c.id === cartId);

            if (!cart) {
                return null
            }

            return cart;
        } catch (error) {
            throw error;
        }
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        try{
            const cart = await this.getCartById(cartId);
            if (!cart) return 0;
            const existProduct = cart.products.find(p => p.product === productId);
            if (existProduct) {
                existProduct.quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }
            return cart;
    } catch (error) {
        throw error;
    }
    }
}
export default CartManager;
