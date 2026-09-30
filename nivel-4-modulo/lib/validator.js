/**
 * lib/validator.js
 * Una implementación casera de un validador fluído (Fluent Validation API)
 * similar a librerías populares como Zod, Yup o Joi.
 */

class StringValidator {
  constructor() {
    this.rules = [];
  }

  // Regla: Obligatorio (no nulo, no indefinido, no vacío)
  required(message = 'Este campo es obligatorio.') {
    this.rules.push({
      validate: (val) => val !== undefined && val !== null && String(val).trim().length > 0,
      message
    });
    return this; // Permite encadenamiento
  }

  // Regla: Longitud mínima
  min(length, message = `Debe tener al menos ${length} caracteres.`) {
    this.rules.push({
      validate: (val) => {
        if (val === undefined || val === null || val === '') return true; // Si no es requerido, omitir
        return String(val).trim().length >= length;
      },
      message
    });
    return this;
  }

  // Regla: Expresión regular para Email
  email(message = 'El formato de correo no es válido.') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.rules.push({
      validate: (val) => {
        if (val === undefined || val === null || val === '') return true; // Si no es requerido, omitir
        return emailRegex.test(String(val).trim());
      },
      message
    });
    return this;
  }

  // Ejecuta todas las reglas registradas sobre un valor
  validate(value) {
    for (const rule of this.rules) {
      if (!rule.validate(value)) {
        return { isValid: false, error: rule.message };
      }
    }
    return { isValid: true };
  }
}

// Punto de entrada para instanciar validadores
const Validator = {
  string: () => new StringValidator()
};

// Clase Esquema para agrupar múltiples validadores de campos
class Schema {
  constructor(fields) {
    this.fields = fields; // Objeto de tipo: { username: Validator.string().required(), ... }
  }

  validate(data) {
    const errors = {};
    let isValid = true;

    for (const fieldName in this.fields) {
      const validator = this.fields[fieldName];
      const value = data[fieldName];
      
      const result = validator.validate(value);
      
      if (!result.isValid) {
        errors[fieldName] = result.error;
        isValid = false;
      }
    }

    return {
      isValid,
      errors
    };
  }
}

module.exports = {
  Validator,
  Schema
};
