import express from "express"
import productsRoutes from "./routes/products.routes.js"
import cartsRoutes from "./routes/carts.routes.js"
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js"
import { readJsonFile, writeJsonFile } from "./modules.js";
import __dirname from "./utils.js";

const PORT = 8080;
const app = express();
const PRODUCTS_FILE_PATH = __dirname+'/db/productos.json' 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes)
app.use("/", viewsRouter)

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
})

const io = new Server(httpServer);
io.on("connection", async (socket) => {
    console.log("usuario conectado")

    socket.emit("products", await readJsonFile(PRODUCTS_FILE_PATH));

    socket.on("deleteProduct", async (id) => {
        const products = await readJsonFile(PRODUCTS_FILE_PATH);
        const index = products.findIndex(i => i.id === id);
        if (index !== -1){
            products.splice(index, 1)
            await writeJsonFile(PRODUCTS_FILE_PATH, products)
            io.sockets.emit("products", await readJsonFile(PRODUCTS_FILE_PATH))

        }
    })
})