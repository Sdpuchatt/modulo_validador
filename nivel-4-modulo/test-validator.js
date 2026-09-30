/**
 * test-validator.js
 * Script de prueba para demostrar nuestra propia librería de validación.
 */

const { Schema, Validator } = require('./lib/validator');

// 1. Definimos un esquema para registrar un usuario
const userSchema = new Schema({
  username: Validator.string().required('¡El nombre de usuario es súper obligatorio!').min(4, 'Mínimo 4 caracteres.'),
  email: Validator.string().required().email('Escribe un mail bien estructurado.')
});

console.log('=== Nivel 4: Testeo de nuestra Librería Validator ===\n');

// Caso de Prueba 1: Datos totalmente inválidos
const datosInvalidos = {
  username: 'Yo',          // Muy corto
  email: 'correo_invalido' // Mal formato de correo
};

console.log('Caso 1: Validando datos inválidos...');
console.log('Datos:', datosInvalidos);
const result1 = userSchema.validate(datosInvalidos);
console.log('Resultado de validación:', result1);
console.log(`¿Es válido?: ${result1.isValid ? '✅ Sí' : '❌ No'}`);
console.log('Errores:', result1.errors);
console.log('---------------------------------------------------\n');

// Caso de Prueba 2: Datos vacíos
const datosVacios = {
  username: '',
  email: ''
};

console.log('Caso 2: Validando datos vacíos...');
console.log('Datos:', datosVacios);
const result2 = userSchema.validate(datosVacios);
console.log('Resultado de validación:', result2);
console.log(`¿Es válido?: ${result2.isValid ? '✅ Sí' : '❌ No'}`);
console.log('Errores:', result2.errors);
console.log('---------------------------------------------------\n');

// Caso de Prueba 3: Datos válidos
const datosValidos = {
  username: 'goku99',
  email: 'goku@sayayin.com'
};

console.log('Caso 3: Validando datos correctos...');
console.log('Datos:', datosValidos);
const result3 = userSchema.validate(datosValidos);
console.log('Resultado de validación:', result3);
console.log(`¿Es válido?: ${result3.isValid ? '✅ Sí' : '❌ No'}`);
console.log('Errores:', result3.errors);
console.log('---------------------------------------------------\n');
