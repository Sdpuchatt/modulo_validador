# Nivel 3: API con SQLite (Reutilización de Funciones)

En este nivel modularizamos nuestras validaciones separándolas en un archivo de utilidades e introducimos la persistencia en una base de datos relacional (SQLite), lo cual nos obliga a pensar en la seguridad y unicidad de los datos.

## Qué Enseña este Nivel
1. **Modularización**: Separación de las reglas de validación en `validators.js`. Así nuestro `server.js` se enfoca en controlar el flujo HTTP y no en los detalles de cómo se valida una cadena o un email.
2. **Inyección SQL**: Por qué **nunca** concatenar entradas del usuario directamente en las consultas SQL (ej: `'SELECT * FROM usuarios WHERE username = ' + username`). Aprendemos a usar placeholders (`?`) y consultas preparadas con la librería `sqlite3`.
3. **Manejo de Errores de Base de Datos**: Capturar errores del motor de base de datos (por ejemplo, si el email ya existe en la columna con restricción `UNIQUE`) y traducirlos a respuestas HTTP legibles para el frontend.

## Cómo Ejecutar el Proyecto

1. Abre tu terminal en esta carpeta.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor:
   ```bash
   npm start
   ```
4. Abre tu navegador en [http://localhost:3000](http://localhost:3000).
5. Observa cómo la lista de usuarios se actualiza en tiempo real de forma persistente. Intenta registrar el mismo correo dos veces para ver el error de base de datos controlado.
