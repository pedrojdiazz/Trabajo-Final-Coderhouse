import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { normalizeString } from "../utils.js";
const productsCollection = "products";

const productSchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    code: {
        type: String,
        unique: true,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    status: {
        type: Boolean,
        default: true
    },

    stock: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true,
        index: true
    },

    thumbnails: {
        type: [String],
        default: []
    },
    normalizedCategory: String
});


productSchema.plugin(mongoosePaginate);

productSchema.pre('save', function(next) {
    this.normalizedCategory = normalizeString(this.category);
    next();
});

const ProductModel = new mongoose.model(productsCollection, productSchema);

export default ProductModel