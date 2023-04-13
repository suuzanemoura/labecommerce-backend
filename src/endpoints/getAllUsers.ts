import { Request, Response } from "express";
import { db } from "../database/knex";
import { TUser } from "../types";

export const getAllUsers = async (req: Request, res: Response) => {

    try {
        const users:TUser[] = await db("users").select("id", "name", "email", "created_at as createdAt")

        if (!users){
            res.status(404)
            throw new Error('Usuários não encontrados.')
        }
        if (!users.length){
            res.status(404)
            throw new Error('Não existem usuários cadastrados.')
        } 
    
        res.status(200).send(users); 

    } catch (error: any){

        if(res.statusCode === 200){
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado.");
        }
        console.log(error)
    }
}