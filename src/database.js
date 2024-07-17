import mongoose from "mongoose";

mongoose.connect("mongodb+srv://petrosdiaz:coder@cluster0.wiip6yo.mongodb.net/Ecommerce")
    .then(() => console.log("Conexión exitosa con la base de datos"))
    .catch(() => console.log("Error al conectar con la base de datos"))

