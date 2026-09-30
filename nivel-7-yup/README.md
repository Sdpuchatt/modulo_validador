# Nivel 7: Migración a Yup (Validación Estándar en la Industria)

En este nivel reemplazamos nuestro validador casero de esquemas por **Yup**, una de las librerías universales de definición de esquemas y validación de datos más extendidas en la industria del desarrollo de software de JavaScript.

## Qué Enseña este Nivel
1. **Librerías Universales de Validación**: Entender cómo funcionan y se estructuran los validadores profesionales del ecosistema JS.
2. **Manejo de Errores con Yup**: Capturar excepciones asíncronas de tipo `ValidationError` de Yup y estructurar los mensajes para enviarlos de forma limpia al frontend.
3. **Filtro de Atributos Extra (`stripUnknown`)**: Yup permite limpiar el objeto de entrada eliminando automáticamente campos extraños que no hayamos definido en el esquema de validación, aumentando la seguridad de la API contra inyecciones de parámetros no deseados.
4. **Coerción Automática**: Yup convierte automáticamente los tipos cuando sea posible (ej. convierte la propiedad de texto `"25"` de la edad a un tipo `Number` real de JS).

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
5. Intenta registrar campos y observa cómo Yup maneja las validaciones asincrónicas y la coerción de tipos.
