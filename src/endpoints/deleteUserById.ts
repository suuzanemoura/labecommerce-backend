import { Request, Response } from "express";
import { db } from "../database/knex";
import { TUser } from "../types";

export const deleteUserById = async (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const [user]:TUser[] = await db("users").where({id:id})

        if (!user){
            res.status(400)
            throw new Error('O usuário não existe.')
        }

        await db("users").del().where({id:id})
        res.status(200).send({message:"Cadastro excluído com sucesso!"})
        
    } catch (error:any) {
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