import { Request, Response } from "express";
import { db } from "../database/knex";
import { TProduct } from "../types";

export const editProductById = async (req: Request, res: Response) => {

    try {

        const id = req.params.id
        const { name, price, description, imageUrl } = req.body

        const newName = name as string | undefined
        const newPrice = price as number | undefined
        const newDescription = description as string | undefined
        const newImageUrl = imageUrl as string | undefined

        const [product]:TProduct[] = await db("products").where({id: id})

        if (!product){
            res.status(400)
            throw new Error('O produto não existe.')
        }

        if (newName !== undefined) {
            if (typeof newName !== "string"){
                res.status(400)
                throw new Error('Nome do produto inválido, tente novamente.')
            }

            if (newName.length < 1){
                res.status(400)
                throw new Error('Nome do produto deve conter pelo menos 1 caractere.')
            }
        }

        if (newPrice !== undefined) {
            if (typeof newPrice !== 'number') {
              res.status(400)
              throw new Error('Preço do produto inválido, tente novamente.')
            }
            if (newPrice < 0) {
              res.status(400)
              throw new Error('Preço do produto deve ser maior ou igual a zero')
            }
        }

        if (newDescription !== undefined) {
            if (typeof newDescription !== "string"){
                res.status(400)
                throw new Error('Descrição do produto inválido, tente novamente.')
            }

            if (newDescription.length < 1){
                res.status(400)
                throw new Error('Descrição do produto deve conter pelo menos 1 caractere.')
            }
        }

        if (newImageUrl !== undefined) {
            if (typeof newImageUrl !== "string"){
                res.status(400)
                throw new Error('A url da imagem do produto é inválida, tente novamente.')
            }

            if (!newImageUrl.length){
                res.status(400)
                throw new Error('A url da imagem do produto deve conter pelo menos 1 caractere.')
            }
        }


        if (product) {

            const updatedProduct:TProduct = {
                id: id,
                name: newName || product.name,
                price: newPrice || product.price,
                description: newDescription || product.description,
                image_url: newImageUrl || product.image_url
            }

            await db("products").update(updatedProduct).where({ id: id })

        }

        res.status(200).send({message: "Produto atualizado com sucesso!"})
        
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