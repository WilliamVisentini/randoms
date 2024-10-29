function contarPalavrasUnicas(str) {

  //console.log(`Original = ${str} \n`);

  str = str.toLowerCase();
  //console.log(`Lower Case = ${str} \n`);

  str = str.replace(/[.,!?]/g, ""); // remove .,!? 
  //console.log(`Replace = ${str} \n`);

  const palavras = str.split(" ");
  console.log(`Split = ${palavras} \n`);

  let arrPalavaras = Array.from(palavras);

  console.log(arrPalavaras);

  const palavrasUnicas = new Set(palavras);
  //console.log(`New Set = ${palavrasUnicas} \n`);

  let arr = Array.from(palavrasUnicas);

  console.log(arr);
  console.log(`Size = ${arr.length}`);

  return palavrasUnicas.size;
}

// Exemplo de uso
let str = `What difference does it make, after all, what your position in life is if you dislike it yourself? All that matters is how you deal with your situation.`;

console.log(contarPalavrasUnicas(str)); // Resultado esperado: 7

