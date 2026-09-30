import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './database.js';
import { registerSchema, RegisterInput } from './schemas/user.schema.js';
import { validate } from './middlewares/validate.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Ruta POST de registro. 
// Usamos Request<{}, any, RegisterInput> para garantizar que req.body tenga el tipo correcto en TypeScript.
app.post('/register', validate(registerSchema), (req: Request<{}, any, RegisterInput>, res: Response) => {
  // TypeScript ya sabe exactamente que:
  // - username es string
  // - email es string
  // - age es number (gracias a la coerción de Zod)
  const { username, email, age } = req.body;
  const createdAt = new Date().toISOString();

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
      message: `¡Usuario registrado con éxito usando Zod & TS! (ID: ${this.lastID})`
    });
  });
});

app.get('/users', (req: Request, res: Response) => {
  db.all('SELECT id, username, email, age, createdAt FROM usuarios ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, users: rows });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor de Nivel 8 (Zod + TS) corriendo en http://localhost:${PORT}`);
});
