import { Request, Response } from "express";
import { db } from "../database/knex";
import { TProduct, TPurchase, TQuantityInProduct, TUser } from "../types";

export const createNewPurchase = async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const buyer = req.body.buyer as string
        const totalPrice = req.body.totalPrice as number
        const products:TQuantityInProduct[] = req.body.products

        const [idBuyerExist]:TUser[] = await db("users").where("id", "=", `${buyer}`)

        if (!idBuyerExist){
            res.status(400)
            throw new Error('Usuário não foi encontrado, verifique a "id".')
        }

        if (typeof id !== "string") {
            res.status(400);
            throw new Error("Id inválido, tente novamente.");
        }
        if (!id.length) {
            res.status(400);
            throw new Error("É necessário digitar um id!");
        }

        const [purchase]:TPurchase[] = await db("purchases").where({id: id})

        if (purchase) {
            res.status(400)
            throw new Error('Não é possível criar mais de uma compra com a mesma id. Tente novamente.')
        }

        if (typeof buyer !== "string") {
            res.status(400);
            throw new Error("Id do usuário inválido, tente novamente.");
        }
        if (!buyer.length) {
            res.status(400);
            throw new Error("É necessário digitar um id para o usuário!");
        }

        if (typeof totalPrice !== 'number'){
            res.status(400)
            throw new Error('Preço inválido, tente novamente.')
        }

        if (totalPrice <= 0){
            res.status(400)
            throw new Error('O preço total deve ser maior que 0')
        }

        if (!products.length) {
            res.status(400);
            throw new Error("É necessário digitar os produtos da compra do usuário!");
        }

        for (let product of products){

            if (typeof product.id !== "string"){
                res.status(400);
                throw new Error(`Id do produto ${product.name} inválido, tente novamente.`);
            }

            if (typeof product.quantity !== "number"){
                res.status(400);
                throw new Error(`Quantidade do produto ${product.name} inválido, tente novamente.`);
            }

            let [idProductExist]:TProduct[] = await db("products").where({id: product.id})
            if (!idProductExist){
                res.status(400)
                throw new Error(`Id do produto ${product.name} não foi encontrado, verifique a "id".`)
            }
        }

        const newPurchase = {
            id,
            buyer,
            total_price: totalPrice
        }
    
        await db("purchases").insert(newPurchase)

        for (let product of products){
            await db.insert({
                purchase_id: id,
                product_id: product.id,
                quantity: product.quantity
				}).into("purchases_products")
        }

        res.status(201).send({message: "Pedido realizado com sucesso!"})
        
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro inesperado.")
        }

        res.send(error.message)
    }
}