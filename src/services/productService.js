import ProductDao from "../dao/db/productDao.js";
import { ProductDTO, ProductQueryDTO } from "../dto/productDto.js";

class ProductService {
    async addProduct({ title, description, price, productCode, stock, category, thumbnails }) {
        if (!title || !description || !price || !productCode || !stock || !category) return -1;

        const existProduct = await ProductDao.findProduct(code, productCode)
        if (existProduct) return null;
        const newProduct = new ProductDTO(title, description, price, productCode, stock, category, thumbnails)
        await ProductDao.addProduct(newProduct)
        return 1
    }

    async getProducts({ limit, page, sort, query, minPrice, maxPrice } = {}) {
        const productQueryDTO = new ProductQueryDTO({ sort, query, minPrice, maxPrice })
        productQueryDTO.validate()
        const queryOptions = productQueryDTO.toQueryOptions()
        const sortOptions = productQueryDTO.toSortOptions()
        const products = await ProductDao.getProducts({ limit, page, queryOptions, sortOptions, minPrice, maxPrice })
        return products
    }

    async getProductById(productId) {
        return ProductDao.getProductById(productId)
    }

    async updateProduct(productId, updatedProduct) {
        return ProductDao.updateProduct(productId, updatedProduct)
    }

    async deleteProduct(productId) {
        return ProductDao.deleteProduct(productId)
    }
}

export default ProductService;
