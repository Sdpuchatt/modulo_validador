# Nivel 2: Web App con Persistencia en Archivo (Respuestas Estructuradas)

En este nivel damos el salto de la consola a la web. Construimos una interfaz gráfica básica (HTML) y un servidor HTTP (Express) que se comunica mediante JSON.

## Qué Enseña este Nivel
1. **Validación en Cliente vs. Servidor**: Aunque podríamos validar en HTML5 (ej. `required`, `type="email"`), desactivamos la validación del navegador con `novalidate` para ver cómo el backend procesa los datos y retorna respuestas estructuradas.
2. **Errores Estructurados**: El backend no solo dice *"hay un error"*, sino que retorna un objeto con el mensaje específico para cada campo inválido.
3. **Persistencia en Archivo**: Leemos y escribimos en un archivo `usuarios.json` usando el módulo nativo `fs` (File System) de Node.js.

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
5. Intenta enviar campos vacíos o correos inválidos para ver cómo se renderizan los errores en tiempo real en la página.
