import jwt from 'jsonwebtoken'

export const authenticateuser=async(req,res,next)=>{
    const token=req.cookies.token
    try {
        if(!token){
            res.status(401).json({success:false,error:"Access Denied"})
        }
        const verified=jwt.verify(token,process.env.JWT_SECRET)
        req.user=verified //attach user data to request object
        next()
    } catch (error) {
        res.status(403).json({success:false,error:"Invalid Credential"})
    }
}