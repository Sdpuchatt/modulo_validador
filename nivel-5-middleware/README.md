# Nivel 5: Middleware de Express con nuestro Validador

En este nivel integramos nuestra propia librería de validación (del Nivel 4) directamente en el ciclo de vida de Express mediante middlewares. 

## Qué Enseña este Nivel
1. **Patrón Middleware**: Cómo interceptar las solicitudes HTTP entrantes y aplicarles lógica de validación de manera genérica.
2. **Abstracción del Controlador de Ruta**: Al validar los datos en un paso previo (middleware), los controladores de nuestras rutas quedan completamente libres de `if/else` de validación. Saben que cuando se ejecuta su código, los datos ya están limpios y son válidos.
3. **Control Centralizado de Errores**: Si la validación falla en el middleware, el flujo se detiene de inmediato enviando un código `400 Bad Request` y la lista estructurada de errores, protegiendo a la base de datos de registros espurios de manera automática.

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
5. Intenta registrar usuarios y observa cómo los controladores se benefician del middleware para mantener el código más estructurado, limpio y fácil de mantener.
