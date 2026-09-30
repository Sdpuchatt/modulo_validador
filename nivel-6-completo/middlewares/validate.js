/**
 * middlewares/validate.js (Versión Avanzada)
 * Valida el cuerpo de la petición y lo reemplaza con los datos sanitizados y transformados.
 */

function validate(schema) {
  return (req, res, next) => {
    const result = schema.validate(req.body || {});

    if (!result.isValid) {
      return res.status(400).json({
        success: false,
        errors: result.errors
      });
    }

    // REEMPLAZO CLAVE: Sobrescribimos req.body con los datos limpios, transformados y convertidos.
    // Esto asegura que si el validador convirtió "25" a 25 (número), el controlador reciba el número real.
    req.body = result.data;
    
    next();
  };
}

module.exports = validate;
