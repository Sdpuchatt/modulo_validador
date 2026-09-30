/**
 * lib/validator.js
 * Una implementación casera de un validador fluído (Fluent Validation API)
 */

class StringValidator {
  constructor() {
    this.rules = [];
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
        return String(val).trim().length >= length;
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

  validate(value) {
    for (const rule of this.rules) {
      if (!rule.validate(value)) {
        return { isValid: false, error: rule.message };
      }
    }
    return { isValid: true };
  }
}

const Validator = {
  string: () => new StringValidator()
};

class Schema {
  constructor(fields) {
    this.fields = fields;
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
