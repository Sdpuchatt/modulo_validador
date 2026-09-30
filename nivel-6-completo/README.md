# Nivel 6: Validación Avanzada y Sanitización Completa

En este nivel final culminamos la serie implementando dos pilares de la seguridad en el desarrollo backend: la **coerción de tipos** y la **sanitización de datos (desinfección contra Cross-Site Scripting - XSS)**.

## Qué Enseña este Nivel
1. **Coerción de Tipos (Type Coercion)**: Cómo transformar strings de entrada HTTP (ya que todo en las peticiones viaja como texto o JSON simple) a sus tipos nativos correspondientes. Definimos una regla `.number().int()` que toma un string como `"25"` y lo transforma en el número real `25`.
2. **Desinfección de XSS (Cross-Site Scripting)**: La inyección de código de script es una vulnerabilidad común. Aprendemos a sanitizar cadenas de texto usando un filtro de escape (`.escape()`) que reemplaza caracteres de marcado HTML con sus entidades equivalentes (por ejemplo, `<` se convierte en `&lt;`).
3. **Sustitución en el Middleware**: Nuestro middleware modificado sobrescribe `req.body` con los datos ya sanitizados y convertidos. El controlador de la base de datos recibe datos 100% seguros y limpios.

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
5. Haz clic en el botón **🧪 Inyectar intento de script XSS** y envía el formulario. Observa la salida en consola y cómo el listado en la base de datos muestra el texto sanitizado en color naranja de manera segura sin activar la alerta de JavaScript.
