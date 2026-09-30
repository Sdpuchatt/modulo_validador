const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('=== Nivel 1: Registro por Consola (Validaciones Manuales) ===');
  console.log('Este programa te guiará para registrar un usuario y validar sus datos de forma manual.\n');

  // 1. Pedir nombre de usuario
  let username = '';
  while (true) {
    username = await askQuestion('Ingresa tu nombre de usuario: ');
    username = username.trim();

    // VALIDACIÓN 1: Presencia (no vacío)
    if (!username) {
      console.log('❌ Error: El nombre de usuario no puede estar vacío. Inténtalo de nuevo.\n');
      continue;
    }

    // VALIDACIÓN 2: Longitud mínima
    if (username.length < 3) {
      console.log('❌ Error: El nombre de usuario debe tener al menos 3 caracteres. Inténtalo de nuevo.\n');
      continue;
    }

    // Si pasa todas las validaciones del username, salimos del bucle
    break;
  }

  // 2. Pedir email
  let email = '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular estándar para email

  while (true) {
    email = await askQuestion('Ingresa tu correo electrónico: ');
    email = email.trim();

    // VALIDACIÓN 1: Presencia
    if (!email) {
      console.log('❌ Error: El correo electrónico no puede estar vacío. Inténtalo de nuevo.\n');
      continue;
    }

    // VALIDACIÓN 2: Formato de correo
    if (!emailRegex.test(email)) {
      console.log('❌ Error: El formato de correo electrónico no es válido (ejemplo: usuario@dominio.com). Inténtalo de nuevo.\n');
      continue;
    }

    break;
  }

  console.log('\n=========================================');
  console.log('🎉 ¡Registro exitoso!');
  console.log(`👤 Usuario: ${username}`);
  console.log(`✉️  Email  : ${email}`);
  console.log('=========================================');

  rl.close();
}

main();
