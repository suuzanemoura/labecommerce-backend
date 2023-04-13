import { Request, Response } from "express";
import { db } from "../database/knex";
import { TPurchase, TPurchaseIsPaid } from "../types";

export const getAllPurchases = async (req: Request, res: Response) => {
    try {
        const purchases:TPurchase[] = await db("purchases").select("id AS purchaseId", "buyer AS buyerId", "total_price AS totalPrice", "created_at AS createdAt", "paid AS isPaid")

        if (!purchases){
            res.status(404)
            throw new Error('Compras não encontradas.')
        }
        if (!purchases.length){
            res.status(404)
            throw new Error('Não existem compras realizadas.')
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
        }
        console.log(error)
    }
}