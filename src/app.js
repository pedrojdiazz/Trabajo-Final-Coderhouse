import express from "express"
import productsRoutes from "./routes/products.routes.js"
import cartsRoutes from "./routes/carts.routes.js"
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js"
import __dirname from "./utils.js";
import ProductManager from "./controllers/product-manager.js";

const PORT = 8080;
const app = express();
const PRODUCTS_FILE_PATH = __dirname+'/db/productos.json' 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+"/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname+"/views");

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes)
app.use("/", viewsRouter)

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
})

const productManager = new ProductManager(PRODUCTS_FILE_PATH)
const io = new Server(httpServer);
io.on("connection", async (socket) => {

    socket.emit("products", await productManager.loadProducts());

    socket.on("deleteProduct", async (id) => {
        await productManager.deleteProduct(id)
    })
    socket.on("addProduct", async (product) => {
        await productManager.addProduct(product);
        
    })
})