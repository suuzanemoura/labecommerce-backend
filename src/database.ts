import { CATEGORIES, TProduct, TPurchase, TUser } from "./types";

export const users: TUser[] = [
    {
        id: "u001",
        email: "suuzane@gmail.com",
        password: "Su@123456"
    },
    {
        id: "u002",
        email: "bryan@gmail.com",
        password: "Bryan@123456"
    }
]


export const products: TProduct[] = [
    {
        id: "p0001",
        name: "Bolo de Chocolate",
        price: 10,
        category: CATEGORIES.CAKES
    },
    {
        id: "p0002",
        name: "Bolo de Morango",
        price: 12,
        category: CATEGORIES.CAKES
    },
]

export const purchases: TPurchase[] = [
    {
        userId: users[0].id,
        productId: products[0].id,
        quantity: 2,
        totalPrice: products[0].price * 2
    },
    {
        userId: users[1].id,
        productId: products[1].id,
        quantity: 1,
        totalPrice: products[1].price * 1
    },
]


export const createUser = (id:string, email:string, password: string):void => {

    const user = users.find(
        (user) => {
          return user.email === email || user.id === id
        }
    )

    if (!user) {
        const newUser:TUser = {
            id: id,
            email: email,
            password: password
        }

        console.log("Cadastro realizado com sucesso!")
        users.push(newUser)
    } else{
        console.log("Usuário já existe!")
    }
    
}

export const getAllUsers = ():void => {
    const allUsers = users.map((user) => {return user.email})
    console.log("Todos os users:", allUsers)
}

export const createProduct = (id:string, name:string, price: number, category:CATEGORIES):void => {
    
    const product = products.find(
        (product) => {
          return product.name === name || product.id === id
        }
    )

    if (!product) {
        const newProduct:TProduct = {
            id: id,
            name: name,
            price: price,
            category: category
        }
        console.log("Produto criado com sucesso!")
        products.push(newProduct)
    } else {
        console.log("Produto existente!")
    }
}

export const getAllProducts = ():void => {
    const allProducts = products.map((product) => {return product.name})
    console.log("Todos os produtos:", allProducts)
}

export const getProductById = (idToSearch: string):TProduct | undefined => {
    return products.find(
        (product) => {
          return product.id === idToSearch
        }
      )
}

export const queryProductsByName = (query:string):void => {
    
    if(query){
        const queryProducts:TProduct[] = products.filter(
            (product) => {
              return product.name.toLowerCase().includes(query.toLowerCase())
            }
          )
    
          queryProducts.length > 0 ? console.log(queryProducts.map((product) => {return product.name})) : console.log("Nenhum produto foi achado!")
    } else {
        console.log("Digite sua busca e tente novamente.")
    }
    
}

export const createPurchase = (userId:string, productId:string, quantity:number, totalPrice:number):void => {
            if(userId.length > 0){
                const newPurchase:TPurchase = {
                    userId: userId,
                    productId: productId,
                    quantity: quantity,
                    totalPrice: totalPrice
                }

                console.log("Compra realizada com sucesso!")
                purchases.push(newPurchase)
            } else {
                console.log("Informações não encontradas no servidor. Verifique sua compra e tente novamente.")
            }
}

export const getAllPurchasesFromUserId = (userIdToSearch: string):void => {

    const userId = users.find((user) =>  user.id === userIdToSearch)

    if(userId){
        const allPurchases = purchases.filter(
            (purchase) => {
                return purchase.userId === userIdToSearch
            }
        )

        allPurchases.length > 0 ? console.log("Todas as compras:", allPurchases) : console.log("Nenhuma compra foi realizada")
    } else {
        console.log("ID não encontrado. Digite outro e tente novamente.")
    }
}