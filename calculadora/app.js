const calculadora = require('./calculadora');

function printarValores(x, y) {
    console.log("Soma = " + calculadora.somar(x, y));
    console.log("Subtração = " + calculadora.subtrair(x, y));
    console.log("Divisão = " + calculadora.dividir(x, y));
    console.log("Multiplicação = " + calculadora.multiplicar(x, y));
}

printarValores(10, 10);