import express from "express"
import productsRoutes from "./routes/products.routes.js"
import cartsRoutes from "./routes/carts.routes.js"
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.routes.js"
import sessionsRouter from "./routes/sessions.routes.js"
import configObject from "./config/config.js";
import {__dirname} from "./utils.js";
import ProductManager from "./dao/db/product-manager.js";
import "./database.js";
import initializePassport from "./config/passport.config.js"
import passport from "passport";
import cookieParser from "cookie-parser";

const PORT = configObject.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+"/public"));
app.use(cookieParser());
app.use(passport.initialize()); 
initializePassport(); 

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname+"/views");

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/", viewsRouter);
app.use("/api/sessions", sessionsRouter);
app.use((req, res) =>{
    res.status(404).send('<h1>404</h1>');
})

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
})

const io = new Server(httpServer);

io.on("connection", async (socket) => {
    const products = await ProductManager.getProducts();
    socket.emit("products", products.payload);

    socket.on("deleteProduct", async (id) => {
        await ProductManager.deleteProduct(id);
        const updatedProducts = await ProductManager.getProducts();
        io.emit("products", updatedProducts.payload);
    });

    socket.on("addProduct", async (product) => {
        await ProductManager.addProduct(product);
        const updatedProducts = await ProductManager.getProducts();
        io.emit("products", updatedProducts.payload);
    });
});