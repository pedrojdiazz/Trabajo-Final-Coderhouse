import CartModel from "../models/cartModel.js";

class CartDao {

    async createCart() {
        try {
            const newCart = new CartModel();
            await newCart.save();
            return newCart;

        }
        catch (error) {
            throw error;
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await CartModel.findById(cartId);
            return cart;

        } catch (error) {
            throw error;
        }
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const result = await CartModel.findOneAndUpdate(
                { _id: cartId },
                {
                    $push: {
                        products: { product: productId, quantity: quantity }
                    }
                },
                { new: true });
            return result;

        } catch (error) {
            throw error;
        }
    }

    async updateProductQuantity(cartId, productId, quantity = 1) {
        try {
            const result = await CartModel.findOneAndUpdate(
                { _id: cartId, 'products.product': productId },

                {
                    $inc: { 'products.$.quantity': quantity }
                },

                { new: true });

            return result;


        } catch (error) {
            throw error;
        }
    }

    async deleteProductFromCart(cartId, productId) {
        try {
            const result = await CartModel.findOneAndUpdate(
                { _id: cartId },
                {
                    $pull: {
                        products: { product: productId }
                    }
                }
            )
            return result;

        } catch (error) {
            throw error;
        }

    }

    async existProductInCart(cartId, productId) {
        try {
            const cart = await CartModel.findOne({ _id: cartId, 'products.product': productId });
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async addProductListToCart(cartId, products) {
        // Esta funcion itera el array con productos y se los pasa como parametros al metodo addProductToCart,
        //  guardando en la promesa el resultado de cada una de las llamadas a la funcion,
        //  para luego retornar cuales fueron los ids que no se pudieron agregar al carrito

        try {
            const results = await Promise.all(products.map(async product => {
                try {
                    const result =
                        await this.addProductToCart(cartId, product.product, product.quantity);
                    return { product: product.product, success: result && result !== -1 };
                } catch (error) {
                    return { product: product.product, success: false };
                }
            }));

            return results;

        } catch (error) {
            throw error;
        }
    }

    async clearCart(cartId) {
        try {
            const result = await CartModel.findByIdAndUpdate(
                { _id: cartId },
                {
                    $set: { products: [] }
                })
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default new CartDao();
