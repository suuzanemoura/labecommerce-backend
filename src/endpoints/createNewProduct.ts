import { Request, Response } from "express";
import { db } from "../database/knex";
import { TProduct } from "../types";

export const createNewProduct = async (req: Request, res: Response) => {
    try {
        const {id, name, price, description, imageUrl} = req.body

        if (typeof id !== "string") {
            res.status(400);
            throw new Error("Id inválido, tente novamente.");
        }

        if (!id.length) {
            res.status(400);
            throw new Error("É necessário digitar um id!");
        }
        const [productIdExist]:TProduct[] = await db("products").where({id:id})

        if (productIdExist) {
            res.status(400)
            throw new Error('Não é possível criar mais de uma conta com a mesma id. Tente novamente.')
        }
        
        if (typeof name !== "string") {
            res.status(400);
            throw new Error("Nome inválido, tente novamente.");
        }
        if (!name.length) {
            res.status(400);
            throw new Error("Nome do produto deve ter pelo menos 1 caractere.");
        }


        if (typeof price !== "number") {
            res.status(400);
            throw new Error("Preço inválido, tente novamente.");
        }
        if (price <= 0) {
            res.status(400);
            throw new Error("O preço precisa ser maior que 0.");
        }

        if (typeof description !== "string") {
            res.status(400);
            throw new Error("Descrição inválido, tente novamente.");
        }
        if (!description.length) {
            res.status(400);
            throw new Error("É necessário digitar uma descrição.");
        }

        if (typeof imageUrl !== "string") {
            res.status(400);
            throw new Error("Url da imagem inválido, tente novamente.");
        }
        if (!imageUrl.length) {
              res.status(400);
              throw new Error("É necessário adicionar url da imagem!");
        }

        const newProduct: TProduct = {
            id,
            name,
            price,
            description,
            image_url: imageUrl
        }

        await db("products").insert(newProduct)
        

        res.status(201).send({message: "Produto cadastrado com sucesso!"})
    } catch (error:any) {
        if(res.statusCode === 200){
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
        console.log(error)
    }
}