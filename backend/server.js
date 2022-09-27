const express = require("express");
const CryptoJS = require("crypto-js");
const crypto = require("crypto");
const cors = require("cors");
// const dotenv =  require('dotenv');
const mongoose = require("mongoose");
const signUp = require("./model/user.model");

const uri = 'mongodb+srv://nevennsh:12345@cluster0.0ol7jhj.mongodb.net/?retryWrites=true&w=majority' ;
const app = express();
// dotenv.config();

app.use(express.json());
app.use(cors());
const port = 7000;

app.get("/" , (req,res)=>{
    res.json({alive:true});
})

app.post('/signup' , async (req,res)=>{
const {hashedEmail , hashedPassword} = req.body;

// Decryption Email
var bytes = CryptoJS.AES.decrypt(hashedEmail,'my-secret-key@123');
var decryptedEmail= bytes.toString(CryptoJS.enc.Utf8);

// Decryption password 
var bytes2 = CryptoJS.AES.decrypt(hashedPassword,'my-secret-key@123');
decryptedPsw = bytes2.toString(CryptoJS.enc.Utf8);

//  Encryption email

let mail= crypto.createHash("sha256").update(decryptedEmail).digest("hex");

// Encryption password

let pass = crypto.createHash("sha256").update(decryptedPsw ).digest("hex");

try{
    const register = await signUp.create({mail,pass})
    res.status(200).json(register);
}catch (error){
    res.status(400).json({error: error.message})
}
})

mongoose.connect(uri)
.then(()=>{
    app.listen(port , console.log(`the server is listn on port ${port} `))
})
.catch((error)=>{
    console.log(error);
})