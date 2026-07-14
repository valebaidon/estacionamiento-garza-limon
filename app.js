const db = require("./config/db");
const express = require("express");

// 👇 Agregar esta línea
const parkingRoutes = require("./routes/parkingRoutes");

const app = express();
const PORT = 3000;

// Configuración de EJS
app.set("view engine", "ejs");

// 👇 Agregar estas dos líneas
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos
app.use(express.static("public"));

// 👇 Agregar esta línea
app.use("/", parkingRoutes);

// Ruta principal
app.get("/", (req, res) => {
    res.render("index");
});

async function conectarBD() {
    try {
        const connection = await db.getConnection();
        console.log("✅ Conexión exitosa a MySQL");
        connection.release();
    } catch (error) {
        console.error("❌ Error al conectar con MySQL:", error);
    }
}

conectarBD();

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});