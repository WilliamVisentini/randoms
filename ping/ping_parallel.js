const ping = require('ping');

// Convert IP string to array of octets
function ipToArray(ip) {
  return ip.split('.').map(Number);
}

// Convert array of octets to IP string
function arrayToIp(arr) {
  return arr.join('.');
}

// Convert IP string to a single integer for easy comparison/sorting
function ipToInt(ip) {
  return ip.split('.').reduce((int, octet) => (int << 8) + parseInt(octet, 10), 0);
}

// Convert integer back to IP string
function intToIp(int) {
  return [(int >> 24) & 255, (int >> 16) & 255, (int >> 8) & 255, int & 255].join('.');
}

// Increment the IP address by one
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

// Ping a single IP address and return the result
async function pingIp(ip) {
  try {
    const res = await ping.promise.probe(ip);
    return {
      ip: ip,
      alive: res.alive
    };
  } catch (error) {
    return {
      ip: ip,
      alive: false,
      error: error
    };
  }
}

// Get all IPs in the range, sorted numerically
function getSortedIpRange(startIp, endIp) {
  const ipList = [];
  let currentIp = ipToArray(startIp);
  const finalIp = ipToArray(endIp);

  while (arrayToIp(currentIp) !== arrayToIp(finalIp)) {
    ipList.push(arrayToIp(currentIp));
    incrementIp(currentIp);
  }

  ipList.push(endIp);  // Include the final IP

  // Sort the IPs by their integer representation
  return ipList.sort((a, b) => ipToInt(a) - ipToInt(b));
}

// Ping all IPs in the range in parallel, then print in order
async function pingRangeParallelAndPrint(startIp, endIp, concurrencyLimit = 5) {
  const ipList = getSortedIpRange(startIp, endIp);

  // Use batches to control the number of concurrent pings
  const batches = [];
  while (ipList.length > 0) {
    batches.push(ipList.splice(0, concurrencyLimit));
  }

  // Collect results of all pings
  const results = [];
  for (const batch of batches) {
    const batchResults = await Promise.all(batch.map(ip => pingIp(ip)));
    results.push(...batchResults);
  }

  // Sort results by IP before printing (to ensure correct order even with parallel execution)
  results.sort((a, b) => ipToInt(a.ip) - ipToInt(b.ip));

  // Print results
  results.forEach(result => {
    if (result.alive) {
      console.log('\x1b[92m%s\x1b[0m', `Host ${result.ip} esta ativo!`);
    } else if (result.error) {
      console.log(`Host ${result.ip} encountered an error: ${result.error}`);
    } else {
      console.log('\x1b[91m%s\x1b[0m', `Host ${result.ip} não foi alcançado.`);
    }
  });
}

// Faixa 0
const startIp0 = '192.168.0.1';
const endIp0 = '192.168.0.255';

const startIp2 = '192.168.2.1';
const endIp2 = '192.168.2.255';

const startIp3 = '192.168.3.1';
const endIp3 = '192.168.3.255';

// Start pinging in parallel and print the results in order
pingRangeParallelAndPrint(startIp0, endIp0, 255);  // Concurrency limit of 3
pingRangeParallelAndPrint(startIp2, endIp2, 255);
pingRangeParallelAndPrint(startIp3, endIp3, 255);