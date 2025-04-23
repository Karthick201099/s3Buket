 const CryptoJS = require('crypto-js');
 const {ENCRYPT_SECRET} = require('../config/index.js')

 
 const encrypt = (text)=>{
    if(!ENCRYPT_SECRET){
        throw new Error('ENCRYPT_SECRET is not defined')
    }
    return CryptoJS.AES.encrypt(text,ENCRYPT_SECRET).toString()
 }

 const decrypt = (ciphertext)=>{
    if(!ENCRYPT_SECRET){
        throw new Error('ENCRYPT_SECRET is not defined')
    }
    return CryptoJS.AES.decrypt(ciphertext,ENCRYPT_SECRET).toString(CryptoJS.enc.Utf8)
 }

 const hash = (text)=>{
    return CryptoJS.SHA256(text).toString()
 }

 module.exports = {
    encrypt,
    decrypt,
    hash
 }