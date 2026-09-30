import { z } from 'zod';

// 1. Definimos el esquema de validación de Zod
export const registerSchema = z.object({
  username: z.string({
    required_error: 'El nombre de usuario es obligatorio.'
  })
  .trim()
  .min(3, 'El nombre debe tener al menos 3 caracteres.'),
  
  email: z.string({
    required_error: 'El correo electrónico es obligatorio.'
  })
  .trim()
  .email('El formato de correo no es válido.'),
  
  // Usamos z.coerce para transformar de forma segura el input string a Number antes de validar
  age: z.coerce.number({
    invalid_type_error: 'La edad debe ser un número.',
    required_error: 'La edad es obligatoria.'
  })
  .int('La edad debe ser un número entero.')
  .min(18, 'Debes ser mayor de 18 años.')
  .max(120, 'Introduce una edad válida (máximo 120).')
});

// 2. Inferimos estáticamente el tipo TypeScript a partir del esquema de Zod
// ¡Esto es mágico! RegisterInput hereda todas las restricciones automáticamente.
export type RegisterInput = z.infer<typeof registerSchema>;
