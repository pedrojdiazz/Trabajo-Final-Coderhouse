import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
   products: [{
       product: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'products',
       },
       quantity: {
         type: Number,
       }
     }]
 });

cartSchema.pre("findOne", function(next){
    this.populate("products.product");
    next();
})

const CartModel = mongoose.model(cartsCollection, cartSchema);

export default CartModel;