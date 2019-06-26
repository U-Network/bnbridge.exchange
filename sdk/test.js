const generator = require('generate-password');
const crypto = require('crypto');
const sha256 = require('sha256');
const bip39 = require('bip39');
const algorithm = 'aes-256-ctr';
const KEY = 'witness canyon foot sing song tray task defense float bottom town obvious faint globe door tonight alpha battle purse jazz flag author choose whisper';

function encrypt(text, password){
  var cipher = crypto.createCipher(algorithm, password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function genPassword() {
  return generator.generate({
    length: 20,
    numbers: true,
    symbols: false,
    uppercase: true,
    strict: true
  })
}


const keyPassword = genPassword()

const dbPassword = bip39.generateMnemonic()

console.log("dbPassword:")

console.log(dbPassword)

const password = KEY+':'+dbPassword

//change to own memonic
const seedPhrase = ""

console.log("aes256seed:")

const aes256seed = encrypt(seedPhrase, password)

console.log(aes256seed)


console.log("aes256password:")

const aes256password = encrypt(keyPassword, password)

console.log(aes256password)

