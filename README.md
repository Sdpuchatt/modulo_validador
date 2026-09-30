# 🛡️ Guía Progresiva de Validación de Datos en Node.js (De 0 a Zod)

Bienvenido a esta serie de **8 proyectos educativos progresivos** diseñados para entender la validación y sanitización de datos en Node.js desde los cimientos hasta los estándares modernos de la industria.

El objetivo de este repositorio es recorrer el camino natural que experimenta un desarrollador:
1. Empezar con validaciones manuales mediante `if/else`.
2. Estructurar respuestas de error en un servidor web.
3. Modularizar y reutilizar funciones validadoras protegiendo bases de datos SQL.
4. Construir un motor de validaciones fluído propio (Fluent API tipo *mini-Zod*).
5. Integrarlo como un Middleware desacoplado en Express.
6. Aplicar sanitización avanzada (contra ataques XSS) y coerción de tipos.
7. Migrar a validadores universales estándar de la industria (**Yup**).
8. Implementar una API profesional con tipado estático e inferencia de tipos con **Zod** y **TypeScript**.

---

## 🗺️ Mapa de Niveles

| Nivel | Proyecto | Tecnologías | Persistencia | Concepto Clave de Validación |
| :---: | :--- | :--- | :--- | :--- |
| **1** | [nivel-1-consola](./nivel-1-consola) | Node.js puro (`readline`) | Memoria | Condicionales `if/else`, expresiones regulares básicas (`RegEx`). |
| **2** | [nivel-2-archivo](./nivel-2-archivo) | Express + HTML/JS | Archivo JSON (`usuarios.json`) | Errores estructurados `{ campo: "mensaje" }` y feedback visual en UI. |
| **3** | [nivel-3-sqlite](./nivel-3-sqlite) | Express + SQLite3 | SQLite | Funciones puras reutilizables (`validators.js`) y prevención de Inyección SQL (`?`). |
| **4** | [nivel-4-modulo](./nivel-4-modulo) | JavaScript moderno (OOP) | N/A (Script test) | Diseño de una **Fluent API** encadenable (`Validator.string().required().min(3)`). |
| **5** | [nivel-5-middleware](./nivel-5-middleware) | Express + SQLite3 | SQLite | Patrón Middleware para desacoplar las validaciones del controlador. |
| **6** | [nivel-6-completo](./nivel-6-completo) | Express + SQLite3 | SQLite | **Sanitización contra XSS** (escape de HTML) y **coerción de tipos** (string a number). |
| **7** | [nivel-7-yup](./nivel-7-yup) | Express + Yup + SQLite3 | SQLite | Uso de la librería universal **Yup**, captura de `ValidationError` y filtrado con `stripUnknown`. |
| **8** | [nivel-8-zod-ts](./nivel-8-zod-ts) | Express + Zod + TypeScript (`tsx`) | SQLite | Estándar moderno: **Inferencia estática de tipos** (`z.infer<typeof schema>`), tipado estricto end-to-end. |

---

## 📋 Requisitos Previos

- Tener instalado **[Node.js](https://nodejs.org/)** (v18.0.0 o superior recomendado).
- Un navegador web moderno (para los niveles con frontend interactivo).

---

## 🚀 Cómo Instalar y Ejecutar Cada Proyecto

Cada nivel está completamente autocontenido en su respectivo directorio.

---

### 🔹 Nivel 1: Registro por Consola
Aprende los conceptos básicos: campos vacíos, longitud mínima y formato de correo electrónico en un entorno interactivo por terminal.

```bash
cd nivel-1-consola
npm install    # No instala paquetes externos, incluido por consistencia
npm start      # O también: node index.js
```

---

### 🔹 Nivel 2: Web App con Persistencia en Archivo
Aprende a devolver errores estructurados desde el servidor en formato JSON para que el frontend pueda pintar los mensajes de error debajo de cada input correspondiente. Los datos válidos se guardan en `usuarios.json`.

```bash
cd nivel-2-archivo
npm install
npm start
```
Abre en tu navegador: **[http://localhost:3000](http://localhost:3000)**.

---

### 🔹 Nivel 3: API con SQLite y Funciones Reutilizables
Aprende a no repetir código extrayendo las reglas a `validators.js`. Además, se implementa una base de datos relacional SQLite con consultas preparadas (`?`) para evitar inyecciones SQL y capturando errores de duplicidad (`UNIQUE constraint failed`).

```bash
cd nivel-3-sqlite
npm install
npm start
```
Abre en tu navegador: **[http://localhost:3000](http://localhost:3000)**.

---

### 🔹 Nivel 4: Creación de Nuestra Propia Librería (`Validator`)
Aprende arquitectura y diseño de software creando clases con encadenamiento de métodos (Fluent Interface) y validación de esquemas completos:
```javascript
const schema = new Schema({
  username: Validator.string().required().min(4),
  email: Validator.string().required().email()
});
```

```bash
cd nivel-4-modulo
node test-validator.js
```
*Este nivel se ejecuta directamente por consola para observar cómo reacciona el motor ante casos inválidos, vacíos y válidos.*

---

### 🔹 Nivel 5: Middleware de Express con Nuestro Validador
Aprende a crear un middleware genérico `validate(schema)` que intercepta las peticiones HTTP y detiene el flujo con un `400 Bad Request` si la validación falla, manteniendo los controladores limpios y libres de condicionales.

```bash
cd nivel-5-middleware
npm install
npm start
```
Abre en tu navegador: **[http://localhost:3000](http://localhost:3000)**.

---

### 🔹 Nivel 6: Validación Avanzada, Coerción y Sanitización contra XSS
Extiende el validador casero para soportar:
- **Sanitización HTML:** Transforma caracteres peligrosos (`<script>` -> `&lt;script&gt;`) para proteger al cliente contra Cross-Site Scripting (XSS).
- **Coerción de tipos:** Convierte strings numéricos (como la edad) a tipos `Number` reales de JS.

```bash
cd nivel-6-completo
npm install
npm start
```
Abre en tu navegador: **[http://localhost:3000](http://localhost:3000)** y prueba el botón **"🧪 Inyectar intento de script XSS"**.

---

### 🔹 Nivel 7: Migración a Yup (Validador Universal)
Reemplaza el módulo propio por **Yup**, una de las librerías universales de esquemas más usadas en JavaScript:
- Valida de forma asíncrona.
- Usa `stripUnknown: true` para ignorar campos maliciosos o no definidos.
- Captura `yup.ValidationError` para formatear los mensajes hacia el cliente.

```bash
cd nivel-7-yup
npm install
npm start
```
Abre en tu navegador: **[http://localhost:3000](http://localhost:3000)**.

---

### 🔹 Nivel 8: API Profesional con Zod y TypeScript
El estándar moderno utilizado en aplicaciones de producción. Combina **TypeScript** con **Zod** para conseguir **seguridad de tipos de extremo a extremo**:
- Se define el esquema con `z.object(...)`.
- Se infiere el tipo de TypeScript automáticamente con `z.infer<typeof registerSchema>`.
- No hace falta duplicar interfaces manuales de TypeScript.
- Ejecución ágil con `tsx`.

```bash
cd nivel-8-zod-ts
npm install
npm start
```
Abre en tu navegador: **[http://localhost:3000](http://localhost:3000)**.

---

## 💡 Comparativa Rápida: Yup vs Zod

| Característica | Yup | Zod |
| :--- | :--- | :--- |
| **Enfoque Principal** | Ecosistema JavaScript clásico y validación de formularios (ej. Formik). | Diseñado para TypeScript y desarrollo moderno (Next.js, Express, NestJS). |
| **Inferencia de Tipos** | Soportado con `yup.InferType`, pero menos intuitivo. | De primer nivel y automático mediante `z.infer<typeof schema>`. |
| **Inmutabilidad** | Las instancias a veces mutan o requieren casting manual. | 100% inmutable y funcional. |
| **Coerción de Tipos** | Coerción automática por defecto. | Coerción explícita y controlada con `z.coerce`. |

---

## 📦 Estructura del Repositorio

```text
Validador/
├── .gitignore
├── README.md
├── nivel-1-consola/
├── nivel-2-archivo/
├── nivel-3-sqlite/
├── nivel-4-modulo/
├── nivel-5-middleware/
├── nivel-6-completo/
├── nivel-7-yup/
└── nivel-8-zod-ts/
```
