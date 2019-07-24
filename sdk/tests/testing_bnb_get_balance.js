const BnbApiClient = require('@binance-chain/javascript-sdk');

const API = 'https://testnet-dex.binance.org/';
const ADDRESS = 'tbnb1j7w7tpnrcnhnu77k9hsefanrptd0c03rjuern6'

const bnbClient = new BnbApiClient(API);
const balance = bnbClient.getBalance(ADDRESS).then(console.log);
