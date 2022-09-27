
import React, { useState} from "react";
import { ValidateForm } from "./validate/ValidateForm";
import CryptoJs from 'crypto-js';
import "../component/Form.css"

const Form: React.FC = ()=>{

const [email,setEmail] = useState("");
const [password , setPassword] = useState("") ;
const [emailMessage, setEmailMessage] = useState(""); 
const [passwordMessage , setPasswordMessage] = useState("");

var hashedPassword =  CryptoJs.AES.encrypt(JSON.stringify(password),'my-secret-key-neven123').toString();
var hashedEmail =  CryptoJs.AES.encrypt(JSON.stringify(email),'my-secret-key-neven123').toString();

const user = {hashedEmail ,hashedPassword};

const validate = ()=>{
    const emailResult = ValidateForm.validateEmail(email);
    if(!emailResult.status){
        console.log(emailResult.message);
        setEmailMessage(emailResult.message);
    }

    const pswResult = ValidateForm.validatePassword(password);
    if(!pswResult.status){
        console.log(pswResult.message);
        setPasswordMessage(pswResult.message);
    }

    if(emailResult.status && pswResult.status ){
        alert("successful sign up")
    }
}

const handleSubmit = async (e :any)=>{
    e.preventDefault();
    // console.log(password);

 const res = await fetch('http://localhost:7000/signup' ,{
    method: "POST", 
    body: JSON.stringify(user) ,  
    headers: {"Content-Type": 'application/json'},
 })
 const json = await res.json()

 if(res.ok)
 {

    setEmail('');
    setPassword('');
    console.log("you are signUp" , json); 
 
 }
}

return (
    <div className="container">
        <div>
            <h1> Sign Up page </h1>
        </div>
      <form  onSubmit={handleSubmit}>
        <div>
            <label> Email : </label>
            <input type="email" placeholder="email@gmail.com" onChange={(e)=> setEmail(e.target.value)}    value={email} />
        </div>
        <p>{emailMessage }</p>
        <div>
            <label> Password : </label>
            <input type="password" placeholder="*******" onChange={(e)=> setPassword(e.target.value) } value={password } />
        </div>
        <p>{passwordMessage}</p>
        <div>
            <button id="btn" onClick={validate} > Signup </button>
        </div>

      </form>
    </div>
)
}

export default Form;