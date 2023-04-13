import { Request, Response } from "express";
import { db } from "../database/knex";
import { TProduct } from "../types";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products:TProduct[] = await db("products").select("id", "name", "price", "description", "image_url AS imageUrl")

        if (!products){
            res.status(404)
            throw new Error('Produtos não encontrados.')
        }
        if (!products.length){
            res.status(404)
            throw new Error('Não existem produtos cadastrados.')
        }
        res.status(200).send(products)   

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