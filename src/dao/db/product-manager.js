import ProductModel from "../../models/products.model.js";
class ProductManager {

    async addProduct({ title, description, price, code, stock, category, thumbnails }) {
        try {

            if(!title || !description || !price || !code || !stock || !category) return -1;
                
            const existProduct = await ProductModel.findOne({code: code});

            if (existProduct) return null;
            const newProduct = new ProductModel({
                title,
                description,
                price,
                code,
                stock,
                category,
                status: true,
                thumbnails: thumbnails || []
            });

            await newProduct.save();

            return 1;
        } catch (error) {
            throw error;
        }
    }
    async getProducts({limit, page, sort, query} = {}) {
        try {
            
            let queryOptions = {};
            if (query) {
                queryOptions = { category: query };
            }

            const sortOptions = {};
            if (sort) {
                if (sort === 'asc' || sort === 'desc') {
                    sortOptions.price = sort === 'asc' ? 1 : -1;
                }
            }
            const products = await ProductModel.paginate(queryOptions, {limit: parseInt(limit) || 10, page: parseInt(page) || 1, sort: sortOptions})
            const result = {payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage, 
                hasNextPage: products.hasNextPage,
                prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}` : null,
                nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}` : null,
            }
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


    async updateProduct(id, updatedProduct) {
        try {
            const updated = await ProductModel.findByIdAndUpdate(id, updatedProduct);
            if (!updated) return null;
            return updated;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const deleted = await ProductModel.findByIdAndDelete(id);
            if (!deleted) return null;
            return 1;
        } catch (error) {
            throw error;
        }
    }
}

export default ProductManager;
