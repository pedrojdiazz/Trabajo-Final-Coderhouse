import cookieParser from "cookie-parser";
import express from "express";
import { engine } from "express-handlebars";
import passport from "passport";
import { Server } from "socket.io";
import configObject from "./config/config.js";
import initializePassport from "./config/passport.config.js";
import "./database.js";
import cartsRoutes from "./routes/cartsRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import sessionsRouter from "./routes/sessionsRoutes.js";
import viewsRouter from "./routes/viewsRoutes.js";
import { __dirname } from "./utils.js";

const PORT = configObject.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/", viewsRouter);
app.use("/api/sessions", sessionsRouter);
app.use((req, res) => {
    res.status(404).send('<h1>404</h1>');
})

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
})

// const io = new Server(httpServer);

// io.on("connection", async (socket) => {
//     const products = await ProductDao.getProducts();
//     socket.emit("products", products.payload);

//     socket.on("deleteProduct", async (id) => {
//         await ProductDao.deleteProduct(id);
//         const updatedProducts = await ProductDao.getProducts();
//         io.emit("products", updatedProducts.payload);
//     });

//     socket.on("addProduct", async (product) => {
//         await ProductDao.addProduct(product);
//         const updatedProducts = await ProductDao.getProducts();
//         io.emit("products", updatedProducts.payload);
//     });
// });