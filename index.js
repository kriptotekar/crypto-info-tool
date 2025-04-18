#!/usr/bin/env node

// index.js Crypto Price Fetcher Tool
// Installation: npm install -g crypto-info-tool
// This script fetches the current price of a specified cryptocurrency in a specified currency.
// Usage: node index.js <cryptoId> <currency> eg node index.js bitcoin usd or node index.js ethereum eur
// Improvement of usage: crypto <cryptoId> <currency> (after installing globally)
// Dependencies: axios (for making HTTP requests)
// Install dependencie: npm install axios

const axios = require('axios');

// To get crypto price
async function getCryptoPrice(cryptoId = 'bitcoin', currency = 'usd') {
  try {
    // Construct the API URL
    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=${currency}`;

    console.log(`Fetching price for ${cryptoId} in ${currency.toUpperCase()}...`);

    // Make the API request via axios
    const response = await axios.get(apiUrl);

    // Check if the crypto ID exists in the response
    if (response.data && response.data[cryptoId] && response.data[cryptoId][currency]) {
      const price = response.data[cryptoId][currency];
      console.log(`-----------------------------------------------`);
      console.log(`The current price of ${cryptoId.toUpperCase()} is: ${price} ${currency.toUpperCase()}`);
      console.log(`-----------------------------------------------`);
    } else {
      console.error(`Could not find price data for ${cryptoId} in ${currency.toUpperCase()}. Check the ID/currency.`);
    }
  } catch (error) {
    console.error('Error fetching crypto price:', error.message);
    // ...add log more details ...
    // console.error(error.response ?? error.response.data : error);
    
  }
}

// HOTO: Handle command-line arguments
// Get command-line arguments (simple example)
// process.argv contains command line arguments
// argv[0] is node executable path
// argv[1] is the script file path
// argv[2] onwards are the actual arguments passed
const cryptoIdArg = process.argv[2] || 'bitcoin'; // Default to bitcoin if no arg provided
const currencyArg = process.argv[3] || 'usd';     // Default to usd if no second arg provided

// Call the function with arguments
getCryptoPrice(cryptoIdArg, currencyArg);
