const ping = require('ping');

// Função para converter uma string de endereço IP em um array de octetos
function ipToArray(ip) {
    return ip.split('.').map(Number);
}

// Função para converter um array de octetos de volta em uma string de endereço IP
function arrayToIp(arr) {
    return arr.join('.');
}

// Função para incrementar um endereço IP em um
function incrementIp(ipArray) {
    for (let i = ipArray.length - 1; i >= 0; i--) {
        if (ipArray[i] < 255) {
            ipArray[i]++;
            return ipArray;
        } else {
            ipArray[i] = 0;
        }
    }
    return ipArray;
}

// Função para pingar todos os IPs em um intervalo
async function pingRange(startIp, endIp) {
    let currentIp = ipToArray(startIp);
    const finalIp = ipToArray(endIp);
    const pingResults = [];

    while (arrayToIp(currentIp) !== arrayToIp(finalIp)) {
        const ip = arrayToIp(currentIp);
        pingResults.push(
            (async () => {
                try {
                    const res = await ping.promise.probe(ip);
                    return {
                        ip: ip,
                        alive: res.alive,
                    };
                } catch (error) {
                    console.error(`Erro ao pingar ${ip}:`, error);
                    return {
                        ip: ip,
                        alive: false,
                    };
                }
            })()
        );

        // Incrementa para o próximo IP
        incrementIp(currentIp);
    }

    // Aguarda todas as promessas de ping serem resolvidas
    const results = await Promise.all(pingResults);

    // Ordena os resultados pela ordem dos IPs
    results.sort((a, b) => {
        const ipA = ipToArray(a.ip);
        const ipB = ipToArray(b.ip);
        return ipA.reduce((acc, curr, idx) => acc || (curr - ipB[idx]), 0);
    });

    // Exibe os resultados em ordem
    results.forEach(result => {
        if (result.alive) {
            console.log('\x1b[3m\x1b[93m%s\x1b[0m', `Host ${result.ip} está online!`);
        } else {
            console.log('\x1b[3m\x1b[97m%s\x1b[0m', `Host ${result.ip} não foi alcançado.`);
        }
    });

    console.log('FIM');
}

// Defina o intervalo de IP
const startIp0 = '192.168.1.0';
const endIp0 = '192.168.1.255';

console.log('INÍCIO');

pingRange(startIp0, endIp0);
