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

// 1. Esquema avanzado con Sanitización, Escape y Coerción de Tipos
const registerSchema = new Schema({
  username: Validator.string()
    .required('El nombre de usuario es obligatorio.')
    .trim()
    .escape() // Evita inyecciones XSS convirtiendo <script> a &lt;script&gt;
    .min(3, 'El nombre debe tener al menos 3 caracteres.'),
    
  email: Validator.string()
    .required('El correo es obligatorio.')
    .trim()
    .email('El formato de correo no es válido.'),
    
  age: Validator.number()
    .required('La edad es obligatoria y debe ser un número.')
    .int('La edad debe ser un número entero sin decimales.')
    .min(18, 'Debes ser mayor de 18 años para registrarte.')
    .max(120, 'Introduce una edad real (menor a 120 años).')
});

// 2. Ruta POST con middleware que sobrescribe req.body con los datos validados y transformados
app.post('/register', validate(registerSchema), (req, res) => {
  // Los datos en req.body ya vienen sanitizados (trim, escape) y coercidos (age es Number)
  const { username, email, age } = req.body;
  const createdAt = new Date().toISOString();

  // Imprimir en consola para ver la sanitización y coerción en vivo
  console.log('--- Datos Procesados por el Validador ---');
  console.log(`username (Tipo: ${typeof username}): ${username}`);
  console.log(`email    (Tipo: ${typeof email}): ${email}`);
  console.log(`age      (Tipo: ${typeof age}): ${age}`);
  console.log('-----------------------------------------');

  const query = `INSERT INTO usuarios (username, email, age, createdAt) VALUES (?, ?, ?, ?)`;
  
  db.run(query, [username, email, age, createdAt], function (err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({
          success: false,
          errors: { email: 'Este correo ya está registrado.' }
        });
      }
      return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }

    return res.status(200).json({
      success: true,
      message: `¡Usuario registrado con éxito! ID: ${this.lastID}.`
    });
  });
});

app.get('/users', (req, res) => {
  db.all('SELECT id, username, email, age, createdAt FROM usuarios ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, users: rows });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor de Nivel 6 corriendo en http://localhost:${PORT}`);
});
