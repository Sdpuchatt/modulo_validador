const express = require('express');
const path = require('path');
const db = require('./database');
const { isRequired, isMinLength, isValidEmail } = require('./validators');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/register', (req, res) => {
  const { username, email } = req.body;
  const errors = {};

  // Sanitización de entrada (trimming)
  const cleanUsername = (username || '').trim();
  const cleanEmail = (email || '').trim();

  // Validaciones usando el módulo modular validators.js
  if (!isRequired(cleanUsername)) {
    errors.username = 'El nombre de usuario es obligatorio.';
  } else if (!isMinLength(cleanUsername, 3)) {
    errors.username = 'El nombre de usuario debe tener al menos 3 caracteres.';
  }

  if (!isRequired(cleanEmail)) {
    errors.email = 'El correo electrónico es obligatorio.';
  } else if (!isValidEmail(cleanEmail)) {
    errors.email = 'El formato de correo electrónico no es válido.';
  }

  // Responder con errores estructurados de validación de formato/presencia
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // Inserción en la base de datos usando placeholders para prevenir SQL Injection
  const query = `INSERT INTO usuarios (username, email, createdAt) VALUES (?, ?, ?)`;
  const createdAt = new Date().toISOString();

  db.run(query, [cleanUsername, cleanEmail, createdAt], function (err) {
    if (err) {
      // Manejar error de UNIQUE constraint (email duplicado)
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({
          success: false,
          errors: {
            email: 'Este correo electrónico ya está registrado.'
          }
        });
      }
      
      console.error('Error al insertar en la base de datos:', err.message);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor.'
      });
    }

    return res.status(200).json({
      success: true,
      message: `¡Usuario registrado con éxito en SQLite! (ID: ${this.lastID})`
    });
  });
});

// Endpoint adicional para ver los usuarios registrados en SQLite
app.get('/users', (req, res) => {
  db.all('SELECT id, username, email, createdAt FROM usuarios ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, users: rows });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor de Nivel 3 corriendo en http://localhost:${PORT}`);
});
