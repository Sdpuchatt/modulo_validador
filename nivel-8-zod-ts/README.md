# Nivel 8: API Profesional con Zod y TypeScript (Inferencia de Tipos)

En este nivel final alcanzamos el estándar moderno absoluto de la industria. Reemplazamos Yup por **Zod** e introducimos **TypeScript** para crear una API 100% tipada, garantizando la consistencia de tipos en tiempo de compilación y validación estricta en tiempo de ejecución.

## Qué Enseña este Nivel
1. **Inferencia Estática de Tipos**: Usar `z.infer<typeof schema>` para que TypeScript deduzca el tipo de objeto basándose en el esquema de Zod. Esto elimina la necesidad de escribir y mantener interfaces de TypeScript redundantes que puedan quedar desactualizadas respecto a las validaciones de base de datos.
2. **Coerción Robusta con Zod**: Zod posee un método de coerción explícito (`z.coerce.number()`) que automatiza la conversión segura de datos HTTP (que siempre llegan como texto) a sus respectivos tipos nativos de JavaScript.
3. **TypeScript en el Backend**: Uso de la herramienta moderna `tsx` para ejecutar archivos de TypeScript directamente en Node sin pasos previos de transpilación manual molestos.
4. **Validación Estricta**: Impedir que los clientes envíen propiedades extrañas no definidas, minimizando vectores de ataque.

## Cómo Ejecutar el Proyecto

1. Abre tu terminal en esta carpeta.
2. Instala las dependencias (incluye las definiciones de tipos para TypeScript y el ejecutor `tsx`):
   ```bash
   npm install
   ```
3. Inicia el servidor:
   ```bash
   npm start
   ```
4. Abre tu navegador en [http://localhost:3000](http://localhost:3000).
5. Abre la carpeta `src/` para observar cómo los tipos de TypeScript están perfectamente integrados con las validaciones de Zod.
