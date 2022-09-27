const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const signUpSchema = new Schema({
    mail:{
        type:String ,
        required: true
    },
    pass:{
        type: String,
        required: true
    }
},{timestamps: true});



module.exports = mongoose.model("signUp" , signUpSchema);