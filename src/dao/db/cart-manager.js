import CartModel from "../../models/carts.model.js";
import ProductModel from "../../models/products.model.js";

class CartManager {


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
            if (!cart) return null;
                
            return cart;

        } catch (error) {
            throw error;
        }
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const productInCart = await this.updateProductQuantity(cartId, productId, quantity)
            if (productInCart) {
                 return productInCart
                }
            else if(productInCart === -1) {
                 return -1
                }

            else {
                const result = await CartModel.findOneAndUpdate(
                    { _id: cartId },
                        { 
                            $push: { 
                                products: { product: productId, quantity: quantity }
                            }
                        },
                    { new: true });
                return result;
            }

        } catch (error) {
            throw error;
        }
    }
    async deleteProductFromCart(cartId, productId) {
        try {
            const existProduct = await ProductModel.exists({_id : productId});
            if (!existProduct) {
                return -1
                }
            const result = await CartModel.findOneAndUpdate(
                { _id: cartId },
                {
                    $pull: {
                        products: { product: productId}
                    }
                }
            )
            return result;

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
                    const result = await this.addProductToCart(cartId, product.product, product.quantity);
                    return { product: product.product, success: result && result !== -1 };
                } catch (error) {
                    return { product: product.product, success: false};
                }
            }));

            return results;

        } catch (error) {
            throw error;
        }
    }

    async updateProductQuantity(cartId, productId, quantity = 1) {
        try {
            const existProduct = await ProductModel.exists({_id : productId});

            if (!existProduct) {
                return -1
                }
            const cart = await CartModel.findOne({ _id: cartId, 'products.product': productId });
            
            if (cart) {
                const result = await CartModel.findOneAndUpdate(
                    { _id: cartId, 'products.product': productId },

                    { 
                        $inc: { 'products.$.quantity': quantity }
                    },

                    {new: true});

                return result;
            } else {
                return 0;
            }

        } catch (error) { 
            throw error;
        }
    }

    async clearCartProducts(cartId) {
        try {
            const result = await CartModel.findByIdAndUpdate(
                { _id: cartId},
                {
                    $set: { products: []}
                })
            return result;
        } catch (error) {
            throw error;
        }
}}

export default new CartManager();
