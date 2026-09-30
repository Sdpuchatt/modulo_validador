/**
 * middlewares/validate.js
 * Middleware genérico para validar peticiones usando Yup
 */

function validate(schema) {
  return async (req, res, next) => {
    try {
      // validate es asíncrono en Yup.
      // abortEarly: false - Recopila todos los errores encontrados, no solo el primero.
      // stripUnknown: true - Elimina automáticamente campos no definidos en el esquema.
      const validatedData = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      });

      // Sobrescribimos req.body con los datos validados y limpios
      req.body = validatedData;
      
      next();
    } catch (err) {
      // Capturamos el error nativo ValidationError de Yup
      if (err.name === 'ValidationError') {
        const errors = {};
        
        // Mapeamos los errores por campo
        err.inner.forEach(validationError => {
          errors[validationError.path] = validationError.message;
        });

        return res.status(400).json({
          success: false,
          errors
        });
      }

      // Si ocurre otro tipo de error, pasar al manejador general
      next(err);
    }
  };
}

module.exports = validate;
