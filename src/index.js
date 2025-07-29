const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config();

// Creamos una vari con el servidor
const server = express();

// Configuramos server para que funcione bien como API
server.use(cors());
server.use(express.json());

// Arrancamos el servidor en el puerto 4000
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Servidor iniciado <http://localhost:${port}>`);
});

// la función de conexión
async function getConnection() {
  const connData = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  };
  const conn = await mysql.createConnection(connData);
  return conn;
}
//ENDPOINT API servet.get () servet.pot()

server.get("/api/frases", async (req, res) => {
  const conn = await getConnection();

  const [result] = await conn.query(`
    SELECT 
      f.id,
      f.texto,
      f.marca_tiempo,
      f.descripcion,
      p.nombre AS personaje_nombre,
      p.apellidos AS personaje_apellido,
      c.titulo AS capitulo_titulo
    FROM frases f
    LEFT JOIN personajes p ON f.personajes_id = p.id
    LEFT JOIN capitulos c ON f.capitulos_idcap = c.id;
  `);

  await conn.end();

  res.json({
    info: { count: result.length },
    results: result,
  });
});

server.get("/api/frases/:id", async (req, res) => {
  const conn = await getConnection();
  const fraseId = req.params.id;

  const [result] = await conn.query(
    `
    SELECT 
      f.id,
      f.texto,
      f.marca_tiempo,
      f.descripcion,
      p.nombre AS personaje_nombre,
      p.apellidos AS personaje_apellido,
      c.titulo AS capitulo_titulo
    FROM frases f
    LEFT JOIN personajes p ON f.personajes_id = p.id
    LEFT JOIN capitulos c ON f.capitulos_idcap = c.id
    WHERE f.id = ?;
  `,
    [fraseId]
  );

  await conn.end();

  if (result.length === 0) {
    res.status(404).json({
      success: false,
      message: "Frase no encontrada",
    });
  } else {
    res.json({
      success: true,
      data: result[0],
    });
  }
});

server.get("/api/personajes", async (req, res) => {
  const conn = await getConnection();

  const [result] = await conn.query(`
    SELECT *
    FROM personajes
  `);

  await conn.end();

  res.json({
    info: { count: result.length },
    results: result,
  });
});

server.get("/api/capitulos", async (req, res) => {
  const conn = await getConnection();

  const [result] = await conn.query(`
    SELECT *
    FROM capitulos
  `);

  await conn.end();

  res.json({
    info: { count: result.length },
    results: result,
  });
});

server.post("/api/frases", async (req, res) => {
  const conn = await getConnection();

  const [result] = await conn.execute(
    `INSERT INTO frases (texto, marca_tiempo, descripcion, personajes_id, capitulos_idcap )
      VALUES (?,?,?,?,?);`,
    [
      req.body.texto,
      req.body.marca_tiempo,
      req.body.descripcion,
      req.body.personajes_id,
      req.body.capitulos_idcap,
    ]
  );

  await conn.end();

  res.json({
    success: true,
    id: result.insertId,
  });
});

server.put("/api/frases/:id", async (req, res) => {
  const conn = await getConnection();
  const fraseId = req.params.id;

  const [result] = await conn.execute(
    `UPDATE simpsons.frases
    SET texto = ?, marca_tiempo = ?, descripcion = ?, personajes_id = ?, capitulos_idcap = ?
     WHERE id = ?;`,
    [
      req.body.texto,
      req.body.marca_tiempo,
      req.body.descripcion,
      req.body.personajes_id,
      req.body.capitulos_idcap,
      fraseId,
    ]
  );

  await conn.end();

  if (result.affectedRows === 0) {
    res.json({
      success: false,
      message: "No encontrada",
    });
  } else {
    res.json({
      success: true,
    });
  }
});

server.delete("/api/frases/:id", async (req, res) => {
  const conn = await getConnection();
  const fraseId = req.params.id;

  const [result] = await conn.execute(
    `DELETE FROM simpsons.frases WHERE id = ?;`,
    [fraseId]
  );

  await conn.end();

  if (result.affectedRows === 0) {
    res.json({
      success: false,
      message: " no encontrada",
    });
  } else {
    res.json({
      success: true,
    });
  }
});

//SERVIDOR DE FICH DINAMICOS (ejes) servet.get ()

//n SERVIDOR DE FICHEROS ESTÁTICOS

//ENPOINT DE TODO LO DEMÁS (ERROR 404)

server.use(/.*/, (req, res) => {
  res.status(404).send("Esta ruta no existe");
});
