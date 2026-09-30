import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

/**
 * Middleware para validar esquemas de Zod.
 * @param schema Cualquier esquema Zod
 */
export function validate(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
      // parseAsync es asíncrono y valida/transforma el body
      const validatedData = await schema.parseAsync(req.body);

      // Sobrescribimos req.body con los datos con coerción y sanitizados
      req.body = validatedData;
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};

        // Formateamos los errores detallados por campo de Zod
        error.errors.forEach((err) => {
          const field = err.path.join('.');
          errors[field] = err.message;
        });

        return res.status(400).json({
          success: false,
          errors
        });
      }
      
      next(error);
    }
  };
}
