const ping = require('ping');

// Function to convert an IP address string into an array of octets
function ipToArray(ip) {
    return ip.split('.').map(Number);
}

// Function to convert an array of octets back into an IP address string
function arrayToIp(arr) {
    return arr.join('.');
}

// Function to increment an IP address by one
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

// Function to ping all IPs in a range
async function pingRange(startIp, endIp) {
    let currentIp = ipToArray(startIp);
    const finalIp = ipToArray(endIp);

    while (arrayToIp(currentIp) !== arrayToIp(finalIp)) {
        const ip = arrayToIp(currentIp);
        try {
            const res = await ping.promise.probe(ip);
            if (res.alive) {
                console.log('\x1b[92m%s\x1b[0m', `Host ${ip} is alive`);  // green text for reachable
            } else {
                console.log('\x1b[91m%s\x1b[0m', `Host ${ip} is not reachable`);  // red text for unreachable
            }
        } catch (error) {
            console.error(`Error pinging ${ip}:`, error);
        }

        // Increment to the next IP
        incrementIp(currentIp);
    }
    console.log('END');
}

// Define your IP range
const startIp0 = '192.168.0.1';
const endIp0 = '192.168.0.255';

console.log('START');  // cyan

pingRange(startIp0, endIp0);

