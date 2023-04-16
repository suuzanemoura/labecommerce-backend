import { Request, Response } from "express";
import { db } from "../database/knex";
import { TPurchase } from "../types";

export const deletePurchaseById = async (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const [purchase]:TPurchase[] = await db("purchases").where({id:id})
    
        if (!purchase){
            res.status(400)
            throw new Error('O pedido não existe.')
        }
        
        await db("purchases").del().where({id:id})
        res.status(200).send({message:"Pedido cancelado com sucesso!"})
            
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