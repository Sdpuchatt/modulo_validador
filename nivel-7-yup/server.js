const express = require('express');
const path = require('path');
const yup = require('yup');
const db = require('./database');
const validate = require('./middlewares/validate');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// 1. Esquema de validación universal usando Yup
const registerSchema = yup.object({
  username: yup.string()
    .required('El nombre de usuario es obligatorio.')
    .trim()
    .min(3, 'El nombre debe tener al menos 3 caracteres.'),
    
  email: yup.string()
    .required('El correo electrónico es obligatorio.')
    .trim()
    .email('El correo electrónico no es válido.'),
    
  age: yup.number()
    .typeError('La edad debe ser un número.') // Mensaje si falla la coerción (por ejemplo: "hola" -> NaN)
    .required('La edad es obligatoria.')
    .integer('La edad debe ser un número entero.')
    .min(18, 'Debes ser mayor de 18 años.')
    .max(120, 'Edad no válida (máximo 120 años).')
});

// 2. Ruta de registro utilizando el middleware de Yup
app.post('/register', validate(registerSchema), (req, res) => {
  // Los datos ya fueron convertidos y limpiados por Yup.
  // Por ejemplo, "age" ahora es un tipo Number real.
  const { username, email, age } = req.body;
  const createdAt = new Date().toISOString();

  const query = `INSERT INTO usuarios (username, email, age, createdAt) VALUES (?, ?, ?, ?)`;
  
  db.run(query, [username, email, age, createdAt], function (err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({
          success: false,
          errors: { email: 'Este correo electrónico ya está registrado.' }
        });
      }
      return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }

    return res.status(200).json({
      success: true,
      message: `¡Usuario registrado con éxito usando Yup! (ID: ${this.lastID})`
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
  console.log(`Servidor de Nivel 7 (Yup) corriendo en http://localhost:${PORT}`);
});
