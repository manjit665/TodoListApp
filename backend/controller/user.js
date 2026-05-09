import { User } from "../model/User.js"
import bcrypt from 'bcrypt'
import userValidator from "../utils/userValidator.js"
import jwt from 'jsonwebtoken'

const signUp=async (req,res)=>{
    const {name,email,password}=req.body
    try {
        const hashPassword=await bcrypt.hash(password,10)
        await userValidator(req.body)
        await User.create({
        name:name,
        email:email,
        password:hashPassword
    })
       res.json("created Succesfully")
    } catch (error) {
        return res.status(400).json({
            message: error.errors?.[0]?.message || error.message
        });
    }
    
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        if (!email || !password) {
            throw new Error("Enter all required fields");
        }
        const user=await User.findOne({
           where:{email}
        })
        if(!user){
            throw new Error("Invalid Credential")
        }
        const isAllowed=await bcrypt.compare(password,user.password)
        if(!isAllowed){
            throw new Error("Invalid Credential")
        }
        const token=jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET,{expiresIn:'15d'})
        res.cookie('token',token)
        res.json({message:"Logged in Successfully"})
    } catch (error) {
        return res.status(400).json({
            message: error.errors?.[0]?.message || error.message
        });
    }
}
export {signUp,login}