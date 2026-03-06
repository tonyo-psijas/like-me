import express from "express";
import cors from "cors";
import pool from "./database/db.js";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Servidor encendido en el puerto " + PORT);
});

app.get("/posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts");
    res.json(result.rows);
  } catch (error) {
    console.error("Error en la consulta POST /posts: " + error);
    res.status(500).json({
      error: error.code,
      message: error.message,
    });
  }
});

app.post('/posts', async (req, res) => {
    try {
        const { titulo, img, descripcion } = req.body
        const values = [titulo, img, descripcion]
        const result = await pool.query("INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3)", values)

        res.send("Post publicado con éxito")

    } catch (error) {
        console.error("Error en la consulta POST /posts: " + error)
        res.status(500).json({
            error: error.code,
            message: error.message
        })
    }
});

app.delete('/posts/:id', async (req, res) =>{
    try {
        const { id } = req.params;
    
        await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    
        res.send("Post eliminado con éxito");
    
    } catch (error) {
        console.error("Error en DELETE /posts/:id: " + error);
        res.status(500).json({
          error: error.code,
          message: error.message
        });
    }
})