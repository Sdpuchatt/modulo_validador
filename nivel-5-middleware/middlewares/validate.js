/**
 * middlewares/validate.js
 * Middleware genérico para interceptar peticiones y validarlas
 * usando nuestro Schema personalizado.
 */

/**
 * Genera un middleware de Express para validar el req.body
 * @param {Schema} schema - Instancia de nuestro Schema de validación
 */
function validate(schema) {
  return (req, res, next) => {
    // Validamos el cuerpo de la petición
    const result = schema.validate(req.body || {});

    // Si no es válido, detenemos el flujo y respondemos con error 400
    if (!result.isValid) {
      return res.status(400).json({
        success: false,
        errors: result.errors
      });
    }

    // Si los datos son válidos, procedemos al siguiente middleware/controlador
    next();
  };
}

module.exports = validate;
