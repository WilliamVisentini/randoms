const axios = require('axios').default;

async function fetchDogFacts() {
    try {
        const { data } = await axios.get('http://dog-api.kinduff.com/api/facts');
        console.log(data);
    } catch (error) {
        console.error('Error fetching dog facts:', error.message || error.code);
    }
}

fetchDogFacts();
