![Adalab](https://beta.adalab.es/resources/images/adalab-logo-155x61-bg-white.png)

# 🍩 Evaluación Final - Módulo 4 | Promo 53 - Adalab

API RESTful desarrollada con **Node.js**, **Express** y **MySQL**, centrada en las frases más míticas de _Los Simpsons_.  
Este proyecto se basa en los BONUS de la evaluación: incluye endpoints adicionales, relaciones entre entidades, y funcionalidades extendidas.

---

## 📌 ¿Qué hace esta API?

- Permite obtener frases por personaje o capítulo.
- Devuelve listados completos de personajes y capítulos.
- Las respuestas incluyen información relacionada (nombre del personaje, título del capítulo, etc.).
- Implementa relaciones entre frases, personajes y capítulos.
- Incluye estructura relacional clara con claves foráneas.

---

## 📁 Endpoints implementados (BONUS)

### 📄 Frases

- `GET /frases/personaje/:personaje_id` → Lista todas las frases de un personaje específico.
- `GET /frases/capitulo/:capitulo_id` → Lista todas las frases de un capítulo específico.

### 🧍 Personajes

- `GET /personajes` → Devuelve todos los personajes.

### 📺 Capítulos

- `GET /capitulos` → Devuelve todos los capítulos.

---

## 🧠 Tecnologías utilizadas

- Node.js
- Express.js
- MySQL
- dotenv (configuración de entorno)
- CORS y JSON middleware
- Git + GitHub

---

## 📁 Estructura del proyecto

- `src/index.js` — configuración del servidor Express

- `src/db.js` — conexión a la base de datos

- `src/routes/` — rutas organizadas por entidad (frases, personajes, capítulos)

- `src/controllers/` — lógica de cada endpoint

---

## 🧱 Esquema de base de datos

Incluye archivo script.sql con las instrucciones para crear las siguientes tablas y relaciones:

- frases

- personajes

- capitulos

Relaciones:

- Cada frase pertenece a un personaje y a un capítulo.

- Relación muchos a muchos entre personajes y capítulos.

---

## 📦 Cómo probar los endpoints

Podés usar Postman o curl para hacer peticiones a la API.

Ejemplo:

```bash

GET http://localhost:3000/frases/personaje/1

```

---

## Mejoras implementadas (BONUS)

✅ Endpoints adicionales para personajes y capítulos
✅ Filtros por personaje y por capítulo
✅ Respuestas con información expandida
✅ Uso de JOIN en consultas SQL
✅ Estructura organizada con rutas y controladores separados
✅ Uso de variables de entorno con dotenv

---

## 🙋‍♀️ Autoría

Desarrollado por **Roxana Solano** como parte de la evaluación final del Módulo 4 del bootcamp de Adalab.

---
