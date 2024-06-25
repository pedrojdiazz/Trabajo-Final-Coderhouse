import { promises as fs } from "fs";
class ProductManager {
    static ultId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;

    }

    async addProduct({ title, description, price, code, stock, category, thumbnails }) {
        try {
            await this.loadProducts();

            if (!title || !description || !price || !code || !stock || !category) {
                throw new Error("Todos los campos son obligatorios");
            }

            if (this.products.some(item => item.code === code)) {
                throw new Error("El código debe ser único");
            }

            const newProduct = {
                title,
                description,
                price,
                code,
                stock,
                category,
                status: true,
                thumbnails: thumbnails || []
            };

            if (this.products.length > 0) {
                ProductManager.ultId = this.products.reduce((maxId, product) => Math.max(maxId, product.id), 0);
            }

            newProduct.id = ++ProductManager.ultId;

            this.products.push(newProduct);
            await this._saveProducts(this.products);
        } catch (error) {
            throw error;
        }
    }

    async getProductById(id) {
        try {
            await this.loadProducts();
            const found = this.products.find(item => item.id === id);

            if (!found) {
                return null;
            } else {
                return found;
            }
        } catch (error) {
            throw error;
        }
    }

    async loadProducts() {
        try {
            const res = await fs.readFile(this.path, "utf-8");
            this.products = JSON.parse(res);
            return this.products
        } catch (error) {
            throw error;
        }
    }

    async _saveProducts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            await this.loadProducts();

            const index = this.products.findIndex(item => item.id === id);

            if (index !== -1) {
                this.products[index] = { ...this.products[index], ...updatedProduct };
                await this._saveProducts(this.products);
                return 1
            } else {
                return 0;
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            await this.loadProducts();

            const index = this.products.findIndex(item => item.id === id);

            if (index !== -1) {
                this.products.splice(index, 1);
                await this._saveProducts(this.products);
                return 1
            } else {
                return 0;
            }
        } catch (error) {
            throw error;
        }
    }
}

export default ProductManager;
