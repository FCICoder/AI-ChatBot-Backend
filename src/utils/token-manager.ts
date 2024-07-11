import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id:string , email:string , expiresIn) =>{
    const payload = {id, email}
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    return token;
}

export const verifyToken = (req:Request , res:Response , next:NextFunction) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    console.log(token);
    
    if(!token){
        return res.status(401).json({message:"Token not provided"})
    }
    return new Promise<void>((resolve, reject)=>{
        return jwt.verify(token , process.env.JWT_SECRET , (err, success)=>{
            if(err){
                reject(err.message);
                return res.status(401).json({message:"Token expired "})
            }else{
                console.log('Token varification successful');
                
                resolve();
                res.locals.jwtData =success;
                
                return next();
            }
        } )
    })    
}