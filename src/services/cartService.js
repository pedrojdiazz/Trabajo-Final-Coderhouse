import CartDao from '../dao/db/cartDao.js';
import ProductDao from '../dao/db/productDao.js';

class CartService {
    async createCart() {
        return await CartDao.createCart();
    }

    async getCartById(cartId) {
        return await CartDao.getCartById(cartId);
    }

    async addProductToCart(cid, pid, quantity = 1) {
        const product = await ProductDao.getProductById(pid);
        if (!product || product.stock < quantity) {
            return null;
        }

        const existProduct = await CartDao.existProductInCart(cid, pid);

        if (existProduct) {
            return await CartDao.updateProductQuantity(cid, pid, quantity);
        } else {
            return await CartDao.addProductToCart(cid, pid, quantity);
        }
    }

    async updateProductQuantity(cartId, productId, quantity) {
        const product = await ProductDao.getProductById(productId);
        if (!product) {
            return -1;
        }
        existProduct = await CartDao.existProductInCart(cartId, productId);
        if (!existProduct) {
            return null;
        }
        return await CartDao.updateProductQuantity(cartId, productId, quantity);
    }

    async deleteProductFromCart(cartId, productId) {
        const existProduct = await CartDao.existProductInCart(cartId, productId);
        if (!existProduct) {
            return -1;
        }
        return await CartDao.deleteProductFromCart(cartId, productId);
    }

    async AddProductListToCart(cartId, productList) {
        return await CartDao.addProductListToCart(cartId, productList);
    }

    async ClearCart(cartId) {
        return await CartDao.clearCart(cartId);
    }
}

export default new CartService();