import { TProduct, TPurchase, TUser } from "./types";

export const users: TUser[] = [
    {
        id: "0001",
        email: "suuzane@gmail.com",
        password: "Su@123456"
    },
    {
        id: "0002",
        email: "bryan@gmail.com",
        password: "Bryan@123456"
    }
]


export const products: TProduct[] = [
    {
        id: "b0001",
        name: "Bolo de Chocolate",
        price: 10,
        category: "Bolos"
    },
    {
        id: "b0002",
        name: "Bolo de morango",
        price: 12,
        category: "Bolos"
    },
]

export const purchases: TPurchase[] = [
    {
        userId: "",
        productId: "",
        quantity: 0,
        totalPrice: 0
    },
    {
        userId: users[1].id,
        productId: products[1].id,
        quantity: 1,
        totalPrice: products[1].price * 1
    },
]
