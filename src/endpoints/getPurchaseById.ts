import { Request, Response } from "express";
import { db } from "../database/knex";
import { TFilteredPurchase, TProductsInPurchase, TQuantityInProduct } from "../types";

export const getPurchaseById = async (req: Request, res: Response) => {
    try {

        const id = req.params.id
        const [purchase]:TFilteredPurchase[] = await db("purchases")
            .where(
                "purchases.id", "=", `${id}`
            )
            .innerJoin(
                "users",
                "users.id",
                "=",
                "purchases.buyer"
            )
            .select(
                "purchases.id AS purchaseId",
                "purchases.buyer AS buyerId",
                "users.name AS buyerName",
                "users.email AS buyerEmail",
                "purchases.total_price AS totalPrice",
                "purchases.created_at AS createdAt",
                "purchases.paid AS isPaid",
            )

        if (!purchase){
            res.status(400)
            throw new Error('Não foi encontrado nenhuma compra. Verifique a "id" e tente novamente.')
        }

        const products:TQuantityInProduct[] = await db("products")
        .innerJoin("purchases_products","purchases_products.product_id","=","products.id")
        .select("products.id", "products.name", "products.price", "products.description", "products.image_url AS imageUrl", "purchases_products.quantity")
        .where("purchases_products.purchase_id", "=", `${id}`)

        function toBoolean(value: number): boolean {
            if (value === 0) {
              return false;
            } else if (value === 1) {
              return true;
            } else {
              throw new Error('Invalid boolean value');
            }
        }

        const isPaid:boolean = toBoolean(purchase.isPaid)

        const productsInPurchase:TProductsInPurchase = {...purchase, isPaid: isPaid, products: products}

        res.status(200).send(productsInPurchase);

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