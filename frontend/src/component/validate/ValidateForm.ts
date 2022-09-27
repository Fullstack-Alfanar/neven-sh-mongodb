
const emailRegex =
/^[a-zA-Z0-9" ".!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const passwordRegex =
/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

export class ValidateForm {

static validateEmail(email: string) {
    if (email == "") {
        return { status: false, message: "please put your email" }
    }
    if (!emailRegex.test(email)) {
        return { status: false, message: " invalid email " }
    }
    return { status: true, message: "valid email " }
}

static validatePassword(password : string){
    if(password == ""){
        return{status:false , message : "please entered a password"}
    }
    if(!passwordRegex.test(password)){
        return{status:false , message : "password must be at minimum 8 characters and include at leaste 1 letter , 1 number , and 1 special charcter"}
    }
    return{statud:true , message : "valid password"}
}
}