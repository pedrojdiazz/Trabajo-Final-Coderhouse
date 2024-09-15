import ProductModel from "../models/productModel.js";

class ProductDao {

    async addProduct({ product }) {
        try {

            const newProduct = new ProductModel({
                title: product.title,
                description: product.description,
                price: product.price,
                code: product.code,
                stock: product.stock,
                category: product.category,
                status: true,
                thumbnails: product.thumbnails || [],
                normalizedCategory: product.normalizedCategory
            });

            await newProduct.save();

            return 1;
        } catch (error) {
            throw error;
        }
    }

    async getProducts({ limit, page, queryOptions, sortOptions, minPrice, maxPrice } = {}) {
        try {

            const products = await ProductModel.paginate(queryOptions, {
                limit: parseInt(limit) || 10,
                page: parseInt(page) || 1,
                sort: sortOptions
            });

            const result = {
                payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}&sort=${sortOptions}&query=${queryOptions}&minPrice=${minPrice}&maxPrice=${maxPrice}` : null,
                nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}&sort=${sortOptions}&query=${queryOptions}&minPrice=${minPrice}&maxPrice=${maxPrice}` : null,
            };

            return result;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(productId) {
        try {
            const product = await ProductModel.findById(productId);
            if (!product) {
                return null;
            }
            return product;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(productId, updatedProduct) {
        try {
            const updated = await ProductModel.findByIdAndUpdate(productId, updatedProduct);
            if (!updated) return null;
            return updated;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(productId) {
        try {
            const deleted = await ProductModel.findByIdAndDelete(productId);
            if (!deleted) return null;
            return 1;
        } catch (error) {
            throw error;
        }
    }

    async findProduct(attribute, value) {
        try {
            const queryOptions = {};
            if (attribute && value) {
                queryOptions[attribute] = value;
            }

            const product = await ProductModel.findOne(queryOptions);
            if (!product) {
                return null;
            }
            return product;
        } catch (error) {
            throw error;
        }
    }

    async substractStock(productId, quantity) {
        try {
            const product = await ProductModel.findById(productId);
            product.stock -= quantity;
            await product.save();
            return 1;
        } catch (error) {
            throw error;
        }
    }
}

export default new ProductDao();
