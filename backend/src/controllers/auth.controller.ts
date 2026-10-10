import type { Request ,Response } from "express";


export const register = (req :Request , res : Response)=>{
    res.status(201).json({message : "register works"}) ;
} ;

export const login = (req:Request , res:Response)=>{
    res.status(201).json({message : "login works"}) ;
}

export const getMe = (req :Request , res : Response)=>{
    res.status(201).json({message : "me works"}) ;
} ;

export const logOut = (req:Request , res:Response)=>{
    res.status(201).json({message : "logout  works"}) ;
}