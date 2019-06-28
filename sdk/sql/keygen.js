const bnbsdk = require('@binance-chain/javascript-sdk');
const crypto = require('crypto');
const sha256 = require('sha256');
const bip39 = require('bip39');
const assert = require('assert');
const algorithm = 'aes-256-ctr';

function encrypt(text, password) {
  var cipher = crypto.createCipher(algorithm, password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

assert(process.env.ISTESTNET != null, "Environment variable ISTESTNET not set!");
assert(process.env.MNEMONIC != null, "Environment variable MNEMONIC is not set!");
assert(process.env.CLIPASSWORD != null, "Environment variable CLIPASSWORD is not set!");
assert(process.env.KEY != null, "Environment variable KEY is not set!");

const privateKey = bnbsdk.crypto.getPrivateKeyFromMnemonic(process.env.MNEMONIC);
const publicKey = bnbsdk.crypto.getPublicKeyFromPrivateKey(privateKey);
const address = bnbsdk.crypto.getAddressFromPrivateKey(privateKey, process.env.ISTESTNET == 1 ? "tbnb" : "bnb");
// aka `encr_key` in schema
const dbPassword = bip39.generateMnemonic()
const encryptionKey = process.env.KEY + ':' + dbPassword
// aka `seed_phase` in schema
const seed_phase = encrypt(process.env.MNEMONIC, encryptionKey)
// aka `password` in schema
const encryptedCLIPassword = encrypt(process.env.CLIPASSWORD, encryptionKey)

console.log("%s,%s,%s,%s,%s", publicKey, address, seed_phase, encryptedCLIPassword, dbPassword);
