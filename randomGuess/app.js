function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let valor = getRandomInt(11); // Gera um número aleatório de 0 a 10

function askQuestion() {
    rl.question('Chute um número (0-10): ', (answer) => {
        console.clear();
        const guess = parseInt(answer); // Converte a resposta para um número

        if (valor === guess) {
            console.log('Você venceu!');
            rl.close(); // Encerra o programa se o usuário vencer
        } else {
            console.log('Tente novamente!'); // Mensagem quando a resposta está errada
            askQuestion(); // Pergunta novamente
        }
    });
}

// Inicia o jogo perguntando ao usuário
askQuestion();