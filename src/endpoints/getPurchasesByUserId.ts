import { Request, Response } from "express";
import { db } from "../database/knex";
import { TPurchase, TPurchaseIsPaid, TUser } from "../types";

export const getPurchasesByUserId = async (req: Request, res: Response) => {
    
    try {
        const id = req.params.id
        const [user]:TUser[] = await db("users").where({id:id});

        if (!user){
            res.status(400)
            throw new Error('Não foi encontrado nenhum usuário. Verifique a "id" e tente novamente.')
        }

        const purchases:TPurchase[] = await db("purchases")
        .select(
            "id AS purchaseId", "buyer AS buyerId", "total_price AS totalPrice", "created_at AS createdAt", "paid AS isPaid"
            )
        .where(
            "buyer", "=", `${id}`
            )

        if (!purchases.length){
            res.status(404)
            throw new Error('Não foram encontrados compras no usuário solicitado.')
        }

        function toBoolean(value: number): boolean {
            if (value === 0) {
              return false;
            } else if (value === 1) {
              return true;
            } else {
              throw new Error('Invalid boolean value');
            }
        }

        const result:TPurchaseIsPaid[] = purchases.map(purchase => {
            return { ...purchase, isPaid: toBoolean(purchase.isPaid) };
          });

        
        res.status(200).send(result)
        
    } catch (error: any){

        if(res.statusCode === 200){
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado.");
        }//
        console.log(error)
    }
}