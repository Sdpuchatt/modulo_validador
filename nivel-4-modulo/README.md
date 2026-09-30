# Nivel 4: Creación de un Módulo de Validación Propio (`Validator`)

En este nivel dejamos de usar validaciones sueltas y diseñamos nuestro propio motor de validaciones fluídas. Creamos una mini-librería con una interfaz limpia que nos permite validar cualquier objeto de datos usando esquemas declarativos.

## Qué Enseña este Nivel
1. **API Fluida (Fluent API)**: Cómo diseñar clases en JavaScript que retornen `this` en sus métodos para permitir el encadenamiento (por ejemplo: `Validator.string().required().min(3).email()`).
2. **Arquitectura de Esquemas (Schema Pattern)**: Cómo construir una clase `Schema` que agrupe reglas de validación asignadas a claves específicas de un objeto, facilitando la validación de formularios completos de un solo golpe.
3. **Desacoplamiento total**: El motor de validación es 100% independiente del framework web (Express) o la base de datos (SQLite), lo que facilita su testeo y reutilización.

## Cómo Ejecutar el Proyecto
No requiere dependencias externas.

Corre el archivo de prueba desde tu terminal dentro de esta carpeta:
```bash
node test-validator.js
```

Observa la salida en consola para ver cómo el esquema detecta los fallos de validación y devuelve los mensajes personalizados definidos en el código.
