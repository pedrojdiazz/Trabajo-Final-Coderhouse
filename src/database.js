import mongoose from "mongoose";
import configObject from "./config/config.js";

mongoose.connect(configObject.MONGO_URI)
    .then(() => console.log("Conexión exitosa con la base de datos"))
    .catch(() => console.log("Error al conectar con la base de datos"))

