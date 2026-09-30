const express = require('express');
const path = require('path');
const db = require('./database');
const { Schema, Validator } = require('./lib/validator');
const validate = require('./middlewares/validate');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// 1. Definimos el Esquema de Validación de forma declarativa
const registerSchema = new Schema({
  username: Validator.string()
    .required('El nombre de usuario es obligatorio para registrarse.')
    .min(3, 'El usuario debe ser más largo (mínimo 3 letras).'),
  email: Validator.string()
    .required('El correo electrónico es indispensable.')
    .email('El formato de correo es incorrecto.')
});

// 2. Aplicamos el Middleware de validación a la ruta POST
// Nota cómo el controlador (callback final) se libera de la lógica de validación.
app.post('/register', validate(registerSchema), (req, res) => {
  // Cuando entramos aquí, garantizamos al 100% que los datos de req.body son válidos
  const { username, email } = req.body;
  const createdAt = new Date().toISOString();

  // Sanitización simple
  const cleanUsername = username.trim();
  const cleanEmail = email.trim();

  const query = `INSERT INTO usuarios (username, email, createdAt) VALUES (?, ?, ?)`;
  
  db.run(query, [cleanUsername, cleanEmail, createdAt], function (err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({
          success: false,
          errors: { email: 'Este correo ya se encuentra en uso.' }
        });
      }
      return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }

    return res.status(200).json({
      success: true,
      message: `Usuario registrado exitosamente (ID: ${this.lastID})`
    });
  });
});

app.get('/users', (req, res) => {
  db.all('SELECT id, username, email, createdAt FROM usuarios ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, users: rows });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor de Nivel 5 corriendo en http://localhost:${PORT}`);
});
