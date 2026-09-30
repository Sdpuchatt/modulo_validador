const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'usuarios.json');

// Middleware para procesar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir la carpeta public para el frontend
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para registrar usuarios
app.post('/register', (req, res) => {
  const { username, email } = req.body;
  const errors = {};

  // --- VALIDACIONES ---
  
  // 1. Validar Username
  const cleanUsername = typeof username === 'string' ? username.trim() : '';
  if (!cleanUsername) {
    errors.username = 'El nombre de usuario es obligatorio.';
  } else if (cleanUsername.length < 3) {
    errors.username = 'El nombre de usuario debe tener al menos 3 caracteres.';
  }

  // 2. Validar Email
  const cleanEmail = typeof email === 'string' ? email.trim() : '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail) {
    errors.email = 'El correo electrónico es obligatorio.';
  } else if (!emailRegex.test(cleanEmail)) {
    errors.email = 'El formato de correo electrónico no es válido.';
  }

  // Si hay errores de validación, responder inmediatamente con un error estructurado
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  // --- PERSISTENCIA EN ARCHIVO ---
  try {
    let usuarios = [];
    
    // Si el archivo ya existe, leer su contenido
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      usuarios = JSON.parse(data || '[]');
    }

    // Agregar el nuevo usuario
    usuarios.push({
      username: cleanUsername,
      email: cleanEmail,
      createdAt: new Date().toISOString()
    });

    // Guardar en el archivo JSON
    fs.writeFileSync(DB_FILE, JSON.stringify(usuarios, null, 2), 'utf-8');

    return res.status(200).json({
      success: true,
      message: '¡Usuario registrado correctamente en el archivo JSON!'
    });
  } catch (error) {
    console.error('Error al guardar en el archivo:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor al guardar los datos.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de Nivel 2 corriendo en http://localhost:${PORT}`);
});
