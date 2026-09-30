/**
 * lib/validator.js (Versión Avanzada)
 * Añade soporte para sanitización, escape de caracteres contra XSS y coerción de tipos (String -> Number).
 */

class StringValidator {
  constructor() {
    this.rules = [];
    this.sanitizers = [];
  }

  required(message = 'Este campo es obligatorio.') {
    this.rules.push({
      validate: (val) => val !== undefined && val !== null && String(val).trim().length > 0,
      message
    });
    return this;
  }

  min(length, message = `Debe tener al menos ${length} caracteres.`) {
    this.rules.push({
      validate: (val) => {
        if (val === undefined || val === null || val === '') return true;
        return String(val).length >= length;
      },
      message
    });
    return this;
  }

  email(message = 'El formato de correo no es válido.') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.rules.push({
      validate: (val) => {
        if (val === undefined || val === null || val === '') return true;
        return emailRegex.test(String(val).trim());
      },
      message
    });
    return this;
  }

  // Sanitizador: Quitar espacios al inicio y al final
  trim() {
    this.sanitizers.push((val) => (val !== undefined && val !== null ? String(val).trim() : ''));
    return this;
  }

  // Sanitizador: Escapar caracteres HTML contra Cross-Site Scripting (XSS)
  escape() {
    this.sanitizers.push((val) => {
      if (val === undefined || val === null) return '';
      const str = String(val);
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
    });
    return this;
  }

  validate(value) {
    // 1. Aplicar transformaciones / sanitización primero
    let transformedValue = value;
    for (const sanitizeFn of this.sanitizers) {
      transformedValue = sanitizeFn(transformedValue);
    }

    // 2. Ejecutar validaciones sobre el valor transformado
    for (const rule of this.rules) {
      if (!rule.validate(transformedValue)) {
        return { isValid: false, error: rule.message, value: transformedValue };
      }
    }

    return { isValid: true, value: transformedValue };
  }
}

class NumberValidator {
  constructor() {
    this.rules = [];
    this.shouldCoerce = true; // Por defecto intentamos transformar "25" a 25
  }

  required(message = 'Este campo es obligatorio y debe ser un número.') {
    this.rules.push({
      validate: (val) => val !== undefined && val !== null && val !== '' && !isNaN(Number(val)),
      message
    });
    return this;
  }

  min(minVal, message = `Debe ser como mínimo ${minVal}.`) {
    this.rules.push({
      validate: (val) => {
        if (val === undefined || val === null || val === '') return true;
        return Number(val) >= minVal;
      },
      message
    });
    return this;
  }

  max(maxVal, message = `Debe ser como máximo ${maxVal}.`) {
    this.rules.push({
      validate: (val) => {
        if (val === undefined || val === null || val === '') return true;
        return Number(val) <= maxVal;
      },
      message
    });
    return this;
  }

  int(message = 'Debe ser un número entero.') {
    this.rules.push({
      validate: (val) => {
        if (val === undefined || val === null || val === '') return true;
        return Number.isInteger(Number(val));
      },
      message
    });
    return this;
  }

  validate(value) {
    // Si es vacío y no es obligatorio, retornar válido y null
    if (value === undefined || value === null || value === '') {
      // Chequear si hay regla required activa
      const hasRequired = this.rules.some(r => r.message.includes('obligatorio'));
      if (!hasRequired) {
        return { isValid: true, value: null };
      }
    }

    // 1. Validar reglas
    for (const rule of this.rules) {
      if (!rule.validate(value)) {
        return { isValid: false, error: rule.message, value };
      }
    }

    // 2. Coerción de tipo a número
    const coercedValue = this.shouldCoerce ? Number(value) : value;

    return { isValid: true, value: coercedValue };
  }
}

const Validator = {
  string: () => new StringValidator(),
  number: () => new NumberValidator()
};

class Schema {
  constructor(fields) {
    this.fields = fields;
  }

  validate(data) {
    const errors = {};
    const validatedData = {};
    let isValid = true;

    for (const fieldName in this.fields) {
      const validator = this.fields[fieldName];
      const value = data[fieldName];
      
      const result = validator.validate(value);
      
      if (!result.isValid) {
        errors[fieldName] = result.error;
        isValid = false;
      } else {
        // Guardamos el valor sanitizado / coercido en validatedData
        validatedData[fieldName] = result.value;
      }
    }

    return {
      isValid,
      errors,
      data: isValid ? validatedData : null
    };
  }
}

module.exports = {
  Validator,
  Schema
};
