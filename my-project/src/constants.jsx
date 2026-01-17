const isNameValid = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
const isEmailValid = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
const isPasswordvalid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

export const validateData = (data) => {
    const {name, email, password} = data;
    if(!isNameValid.test(name)){
        return "Not a valid user name"
    }
    if(!isEmailValid.test(email)){
        return "Not a valid email"
    }
    if(!isPasswordvalid.test(password)){
        return "Not a valid password"
    }
    return null
}