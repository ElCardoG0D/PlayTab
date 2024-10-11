const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Importar CORS
const app = express();
const port = 3000;

app.use(cors()); // Habilitar CORS
app.use(express.json()); // Para analizar las solicitudes JSON

// Conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1111',
  database: 'playtab'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Ruta para registrar un usuario
app.post('/register', (req, res) => {
  const { User_Run, Nombre_Usuario, Email_Usuario, Contraseña_Usuario, Comuna_Id } = req.body;

  // Validar los datos entrantes
  if (!User_Run || !Nombre_Usuario || !Email_Usuario || !Contraseña_Usuario || !Comuna_Id) {
    return res.status(400).send('Faltan datos requeridos');
  }

  const query = 'INSERT INTO Usuario (User_Run, Nombre_Usuario, Email_Usuario, Contraseña_Usuario, Comuna_Id) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [User_Run, Nombre_Usuario, Email_Usuario, Contraseña_Usuario, Comuna_Id], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      // Verificar si el error es un duplicado
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).send('El usuario ya existe');
      }
      return res.status(500).send('Error al registrar el usuario');
    }
    res.status(201).send('Usuario registrado exitosamente');
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
