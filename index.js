import express from "express"
import frasesRoutes from "./routes/frases.routes.js"

const PORT = 8080;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/frases", frasesRoutes);

app.listen(PORT, () => {
    console.log(`Serverm listening on port ${PORT}`)
})