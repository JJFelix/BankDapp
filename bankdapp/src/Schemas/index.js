import * as yup from 'yup'

const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
}

export const RegisterSchema = yup.object().shape({
    first_name: yup.string().required("required").min(3),
    middle_name: yup.string().min(3),
    last_name: yup.string().min(3).required("Required"),
    email: yup.string().email("Please Enter a valid email").matches(emailReg, {message: "Please enter a valid email"}).required("Required"),
    phoneNumber: yup.string().required("Required").min(10, "Invalid Phone Number").max(10, 'Invalid Phone number').
        test("Check prefix", function () {
            let code = "07";
            let num = this.parent["phoneNumber"];
            // console.log(carriercode, blnum);
            if (code && num) {
                if(num.startsWith(code) && containsOnlyNumbers(num)){
                    return true;
                }
                else{
                    return false;
                }
            }
        }),
    id_number: yup.string().required("Required").min(8, "Invalid ID Number").max(8, 'Invalid ID number').
        test("Check prefix", function () {
            let num = this.parent["id_number"];
            // console.log(carriercode, blnum);
            if (num) {
                if(containsOnlyNumbers(num)){
                    return true;
                }
                else{
                    return false;
                }
            }
        }),
    password: yup.string().required("Required").min(8, "Not less than 8 charcters"),
    confirm_password: yup.string().
        test("Password-match", "Passwords must match", function(){
            return this.parent.password == this.parent.confirm_password
        })
})