import ProductService from "../services/productService.js";

class ProductController {
    async addProduct(req, res) {
        const newProduct = req.body;
        try {
            const success = await ProductService.addProduct(newProduct);
            if (!success) {
                res.status(400).json({ message: "El producto ya se encuentra cargado" });
            } else if (success === -1) {
                res.status(400).json({ message: "Error con los campos introducidos" });
            } else {
                res.status(201).json({ message: "Producto agregado exitosamente" });
            }
        } catch (error) {
            res.status(500).json({
                error: "Error al crear el producto",
                message: error.message
            });
        }
    }

    async getProducts(req, res) {
        const { limit, page, sort, query, minPrice, maxPrice } = req.query;
        try {
            const products = await ProductService.getProducts({ limit, page, sort, query, minPrice, maxPrice });
            res.status(200).json({
                status: "success",
                ...products,
            });
        } catch (error) {
            res.status(500).json({
                error: "Error al obtener los productos",
                message: error.message,
            });
        }
    }

    async getProductById(req, res) {
        const id = req.params.pid;
        try {
            const product = await ProductService.getProductById(id);
            if (product) {
                res.json({
                    message: "Producto encontrado",
                    response: product,
                });
            } else {
                res.status(404).json({ error: `Producto con id ${id} no encontrado` });
            }
        } catch (error) {
            res.status(500).json({
                error: "Error al obtener el producto",
                message: error.message
            });
        }
    }

    async updateProduct(req, res) {
        const id = req.params.pid;
        const updatedProduct = req.body;
        try {
            const product = await ProductService.updateProduct(id, updatedProduct);
            if (product) {
                res.json({
                    message: "Producto actualizado",
                });
            } else {
                res.status(404).json({ error: `Producto con id ${id} no encontrado` });
            }
        } catch (error) {
            res.status(500).json({
                error: "Error al actualizar el producto",
                message: error.message
            });
        }
    }

    async deleteProduct(req, res) {
        const id = req.params.pid;
        try {
            const product = await ProductService.deleteProduct(id);
            if (product) {
                res.json({
                    message: "Producto eliminado",
                });
            } else {
                res.status(404).json({ error: `Producto con id ${id} no encontrado` });
            }
        } catch (error) {
            res.status(500).json({
                error: "Error al borrar el producto",
                message: error.message
            });
        }
    }
}

export default new ProductController();
