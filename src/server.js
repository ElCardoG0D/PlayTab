const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Importa CORS para permitir solicitudes de otros dominios
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Habilita CORS para aceptar solicitudes desde el frontend
app.use(express.json()); // Para analizar solicitudes con JSON

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // Cambia si tu contraseña es diferente
  database: 'PlayTab'
});

// Conexión a la base de datos MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// 1. Aquí se obtendrá las Regiones y Comunas disponibles para poder registrar al usuario.
// Obtener todas las regiones.
app.get('/regiones', (req, res) => {
  const query = 'SELECT * FROM REGION';
  db.query(query, (err, results) => { 
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Obtener las comunas por id de la región.
app.get('/comunas/:regionId', (req, res) => {
  const regionId = req.params.regionId; // Obtiene el id de la región desde la URL
  const query = 'SELECT * FROM COMUNA WHERE Id_Region = ?';
  db.query(query, [regionId], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// 2. Aquí se realizará el INSERT del usuario. 
// Ruta para registrar un usuario
app.post('/register', (req, res) => {
  const { Run_User, Nom_User, Correo_User, Contra_User, Celular_User, FechaNac_User, Id_Comuna } = req.body;

  // Verificación de datos
  if (!Run_User || !Nom_User || !Correo_User || !Contra_User || !Celular_User || !FechaNac_User || !Id_Comuna) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  // SQL query para insertar el usuario
  const query = `INSERT INTO USUARIO (Run_User, Nom_User, Correo_User, Contra_User, Celular_User, FechaNac_User, FechaCreacion_User, Id_Comuna, Id_Estado) 
                 VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, 10)`; // Id_Estado lo dejamos en 1 como estado inicial

  db.query(query, [Run_User, Nom_User, Correo_User, Contra_User, Celular_User, FechaNac_User, Id_Comuna], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'El usuario ya existe' });
      }
      return res.status(500).json({ error: 'Error al registrar el usuario' });
    }
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  });
});

// Ruta para el login del usuario
app.post('/login', (req, res) => {
  const { Correo_User, Contra_User } = req.body;

  if (!Correo_User || !Contra_User) {
    return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
  }

  // SQL query para verificar las credenciales del usuario
  const query = 'SELECT * FROM USUARIO WHERE Correo_User = ? AND Contra_User = ?';
  db.query(query, [Correo_User, Contra_User], (err, result) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (result.length > 0) {
      res.status(200).json({ message: 'Login exitoso', user: result[0] });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
