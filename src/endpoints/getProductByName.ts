import { Request, Response } from "express";
import { db } from "../database/knex";
import { TProduct } from "../types";

export const getProductByName = async (req: Request, res: Response) => {

    try {
        const query = req.query.query as string

        if (query.length < 1) {
            res.status(400)
            throw new Error('Sua busca deve possuir pelo menos um caractere.')
        }

        const result:TProduct[] = await db("products").select("id", "name", "price", "description", "image_url AS imageUrl").where("name", "like", `%${query}%`);

        if(!result.length){
            res.status(404)
            throw new Error("Produto não encontrado.")
        }

        res.status(200).send(result)
        
    } catch (error: any) {
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