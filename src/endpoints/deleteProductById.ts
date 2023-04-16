import { Request, Response } from "express";
import { db } from "../database/knex";
import { TProduct } from "../types";

export const deleteProductById = async (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const [product]:TProduct[] = await db("products").where({id:id})
    
        if (!product){
            res.status(400)
            throw new Error('O produto não existe.')
        }
        
        await db("products").del().where({id:id})
        res.status(200).send({message:"Produto excluído com sucesso!"})
            
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