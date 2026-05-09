import validator from 'validator'
import { User } from '../model/User.js'

async function userValidator(data){
    if(!data.name || !data.email || !data.password){
        throw new Error("Enter all required field")
    }
    if(!(validator.isEmail(data.email))){
        throw new Error ("Enter a valid email")
    }
    const user =await User.findOne({
        where:{email:data.email}
    })
    if(user){
        throw new Error("User already exist")
    }
    if(!validator.isStrongPassword(data.password)){
        throw new Error("Enter a strong password")
    }
}
export default userValidator