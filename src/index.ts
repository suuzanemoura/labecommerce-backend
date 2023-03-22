import { users, products, purchases, createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";
import { CATEGORIES } from "./types";


createUser("u003", "beltrano@email.com", "beltrano99")
getAllUsers()
createProduct("p0003", "Mousse de Chocolate", 15, CATEGORIES.DESSERTS)
getAllProducts()
console.log(getProductById("p0002"))
console.log(getProductById("p0004"))
queryProductsByName("Morango")
createPurchase("u002", "p0002", 2, 24)
getAllPurchasesFromUserId("u004")
getAllPurchasesFromUserId("u002")