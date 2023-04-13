import { Request, Response } from "express";
import { db } from "../database/knex";
import { TProduct } from "../types";

export const getProductById = async (req: Request, res: Response) => {
    try {

        const id = req.params.id
        const [product]:TProduct[] = await db("products").select("id", "name", "price", "description", "image_url AS imageUrl").where({id:id})

        if (!product){
            res.status(400)
            throw new Error('Não foi encontrado nenhum produto. Verifique a "id" e tente novamente.')
        }
        res.status(200).send(product);

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