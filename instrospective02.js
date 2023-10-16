/*
  "Instrospective02": Este exemplo mostra a chamada de uma função
  , quais foram os argumentos passados e então gera um log de
  informações.
*/

function logArgsAndResult(func) {
  return function (...args) {
    // Obtém a assinatura da função, incluindo seus argumentos
    const arguments = args.map(arg => JSON.stringify(arg)).join(', ')
    const funcSignature = `${func.name}(${arguments})`;

    // Exibe a função que está sendo chamada e sua assinatura
    console.log(`Chamando ${funcSignature}`);

    // Resultado da chamada
    const result = func(...args);
    console.log(`${funcSignature} retornou ${result}`); // Loga o resultado da função
    return result;
  };
}

// Exemplo de uso:
function add(a, b)
{
  return a + b;
}

function multiply(a, b)
{
  return a * b;
}

const add_call      = logArgsAndResult(add);
const multiply_call = logArgsAndResult(multiply);

const result1 = add_call(3, 5);
const result2 = multiply_call(4, 7);