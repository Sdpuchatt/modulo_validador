/**
 * validators.js
 * Funciones puras de validación reutilizables.
 * Esto evita duplicar la lógica 'if/else' del Nivel 1 y Nivel 2.
 */

/**
 * Valida si un valor existe y no está vacío (tras quitar espacios).
 * @param {string} val 
 * @returns {boolean}
 */
function isRequired(val) {
  if (val === undefined || val === null) return false;
  return String(val).trim().length > 0;
}

/**
 * Valida si un texto tiene una longitud mínima.
 * @param {string} val 
 * @param {number} min 
 * @returns {boolean}
 */
function isMinLength(val, min) {
  if (!val) return false;
  return String(val).trim().length >= min;
}

/**
 * Valida si un correo electrónico tiene formato correcto.
 * @param {string} val 
 * @returns {boolean}
 */
function isValidEmail(val) {
  if (!val) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(val).trim());
}

module.exports = {
  isRequired,
  isMinLength,
  isValidEmail
};
