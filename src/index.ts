import  express, { Request, Response} from 'express'
import cors from 'cors';
import { products, purchases, users } from './database';
import { TProduct, TUser, CATEGORIES, TPurchase } from './types';

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
  });

app.get('/users', (req: Request, res: Response) => {
    try {
        if (!users){
            res.status(404)
            throw new Error('Usuários não encontrados.')
        }
        if (users.length <= 0){
            res.status(404)
            throw new Error('Não existem usuários cadastrados.')
        }
        res.status(200).send(users)    

    } catch (error: any){

        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro inesperado.")
        }

        res.send(error.message)
        console.log(error)
    }
})

app.get('/products', (req: Request, res: Response) => {
    try {
        if (!products){
            res.status(404)
            throw new Error('Produtos não encontrados.')
        }
        if (products.length <= 0){
            res.status(404)
            throw new Error('Não existem produtos cadastrados.')
        }
        res.status(200).send(products)    

    } catch (error: any){

        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro inesperado.")
        }

        res.send(error.message)
        console.log(error)
    }
})

app.get('/products/search', (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if (q.length < 1) {
            res.status(400)
            throw new Error('Sua busca deve possuir pelo menos um caractere.')
        }

        const result = products.filter(
            (product) => {
                return product.name.toLowerCase().includes(q.toLowerCase())
        })

        if(result.length === 0){
            res.status(404)
            throw new Error("Produto não encontrado.")
        }

        res.status(200).send(result)
        
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro inesperado.")
        }

        res.send(error.message)
    }
})

app.get('/purchases', (req: Request, res: Response) => {
    try {
        if (!purchases){
            res.status(404)
            throw new Error('Compras não encontrados.')
        }
        if (purchases.length <= 0){
            res.status(404)
            throw new Error('Não existem compras realizadas.')
        }
        res.status(200).send(purchases)    

    } catch (error: any){

        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro inesperado.")
        }

        res.send(error.message)
        console.log(error)
    }
})

app.get('/products/:id', (req: Request, res: Response) => {

    try {

        const id = req.params.id
        const result = products.find((product) => product.id === id)

        if (!result){
            res.status(400)
            throw new Error('Não foi encontrado nenhum produto. Verifique a "id" e tente novamente.')
        }
        res.status(200).send(result)
        
    } catch (error:any) {

        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro inesperado.")
        }

        res.send(error.message)
        console.log(error)
        
    }
})

app.get('/users/:id/purchases', (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const user = users.find((user) => user.id === id)
        if (!user){
            res.status(400)
            throw new Error('Não foi encontrado nenhum usuário. Verifique a "id" e tente novamente.')
        }

        const result = purchases.filter(
            (purchase) => {
                return purchase.userId.includes(id)
        })

        if (result.length === 0){
            res.status(400)
            throw new Error('Não foram encontrados compras no usuário solicitado.')
        }
        res.status(200).send(result)
        
    } catch (error:any) {
        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro inesperado.")
        }

        res.send(error.message)
        console.log(error)
    }
})

app.post('/users', (req: Request, res: Response) => {

    try {
        const id = req.body.id as string
        const email = req.body.email as string
        const password = req.body.password as string

        const userId = users.find((user) => user.id === id)
        if (userId) {
          res.status(400)
          throw new Error('Não é possível criar mais de uma conta com a mesma id. Tente novamente.')
        }

        const userEmail = users.find((user) => user.email === email)
        if (userEmail) {
          res.status(400)
          throw new Error('Não deve é possível criar mais de uma conta com o mesmo e-mail. Tente novamente.')
        }

        if (!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)) {
            res.status(400)
            throw new Error("Email inválido, tente novamente.")
        }

        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
            res.status(400)
            throw new Error("'Password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial.")
        }

        const newUser: TUser = {
            id,
            email,
            password
        }

        users.push(newUser)
        res.status(201).send("Cadastro realizado com sucesso!")
        
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro inesperado.")
        }

        res.send(error.message)
    }
})

app.post('/products', (req: Request, res: Response) => {

    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const price = req.body.price as number
        const category = req.body.category as CATEGORIES

        const productId = products.find((product) => product.id === id)
        if (productId) {
            res.status(400)
            throw new Error('Não é possível criar mais de uma conta com a mesma id. Tente novamente.')
        }

        if (name.length < 1) {
            res.status(400)
            throw new Error('Nome do produto deve ter pelo menos 1 caractere.')
        }

        if (typeof price !== 'number') {
            res.status(400)
            throw new Error('O preço deve ser um número.')
        }

        if (
            category !== CATEGORIES.CAKES &&
            category !== CATEGORIES.DESSERTS &&
            category !== CATEGORIES.SALTY_PASTRIES
          ) {
            res.status(400)
            throw new Error('Categoria deve ser um dos tipos válidos')
          }

        const newProduct: TProduct = {
            id,
            name,
            price,
            category
        }

        products.push(newProduct)
        res.status(201).send("Produto cadastrado com sucesso!")
    } catch (error:any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro inesperado.")
        }

        res.send(error.message)
    }
})

app.post('/purchases', (req: Request, res: Response) => {

    try {

        const userId = req.body.userId as string
        const productId = req.body.productId as string
        const quantity = req.body.quantity as number
        const totalPrice = req.body.totalPrice as number

        const user = users.find((user) => user.id === userId)
        if (!user){
            res.status(404)
            throw new Error('Usuário não foi encontrado, verifique a "id".')
        }

        const product = products.find((product) => product.id === productId)
        if (!product){
            res.status(404)
            throw new Error('Produto não foi encontrado, verifique a "id".')
        }

        if (typeof quantity !== 'number'){
            res.status(400)
            throw new Error('A quantidade deve ser um número.')
        }

        if(quantity === 0){
            res.status(400)
            throw new Error('A quantidade deve ser maior que zero.')
        }

        if (typeof totalPrice !== 'number'){
            res.status(400)
            throw new Error('O preço total deve ser um número.')
        }

        if(product.price * quantity !== totalPrice){
            res.status(400)
            throw new Error('O preço total está errado, verifique novamente.')
        }

        const newPurchase: TPurchase = {
            userId,
            productId,
            quantity,
            totalPrice
        }
    
        purchases.push(newPurchase)
        res.status(201).send("Compra realizada com sucesso!")
        
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro inesperado.")
        }

        res.send(error.message)
    }
})

app.delete('/users/:id', (req: Request, res: Response) => {

    try {
        const id = req.params.id
        const user = users.find((user) => user.id === id)

        if (!user){
            res.status(400)
            throw new Error('Usuário não existe.')
        }

        const userIndex = users.findIndex((user) => user.id === id)
        if (userIndex >= 0) {
            users.splice(userIndex, 1)
        }

        res.status(200).send("User deletado com sucesso!")
        
    } catch (error:any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro inesperado.")
        }

        res.send(error.message)
    }
})

app.delete('/products/:id', (req: Request, res: Response) => {

    try {
    const id = req.params.id
    const product = products.find((product) => product.id === id)

    if (!product){
        res.status(400)
        throw new Error('Produto não existe.')
    }

    const productIndex = products.findIndex((product) => product.id === id)
    if (productIndex >= 0) {
        products.splice(productIndex, 1)
    }

    res.status(200).send("Produto deletado com sucesso!")
        
    } catch (error:any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro inesperado.")
        }

        res.send(error.message)
    }
})

app.put('/users/:id', (req: Request, res: Response) => {

    try {

        const id = req.params.id
        const { email, password } = req.body
    
        const newEmail = email as string | undefined
        const newPassword = password as string | undefined
    
        const user = users.find((user) => user.id === id)

        if(!user){
            res.status(400)
            throw new Error('Usuário não existe.')
        }

        if (email !== undefined) {
            if (typeof email !== 'string'){
                res.status(400)
                throw new Error('Password deve ser do tipo string')
            }
            if (!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)) {
                res.status(400)
                throw new Error("Email inválido, tente novamente.")
            }
        }

        if (password !== undefined) {
            if (typeof password !== 'string') {
              res.status(400)
              throw new Error('Password deve ser do tipo string')
            }
            if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
                res.status(400)
                throw new Error("'Password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
            }
        }
    
        if (user) {
            user.email = newEmail || user.email
            user.password = newPassword || user.password
        }
  
      res.status(200).send('Atualização realizada com sucesso')

    } catch (error:any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro inesperado.")
        }

        res.send(error.message)
    }

  })

  app.put('/products/:id', (req: Request, res: Response) => {

    try {

        const id = req.params.id
        const { name, price, category } = req.body

        const newName = name as string | undefined
        const newPrice = price as number | undefined
        const newCategory = category as CATEGORIES | undefined

        const product = products.find((product) => product.id === id)

        if (!product){
            res.status(400)
            throw new Error('Produto não existe.')
        }

        if (newName !== undefined) {
            if (typeof newName !== "string"){
                res.status(400)
                throw new Error('Nome do produto deve ser do tipo string')
            }

            if (newName.length < 1){
                res.status(400)
                throw new Error('Nome do produto deve conter pelo menos 1 caractere.')
            }
        }

        if (newPrice !== undefined) {
            if (typeof newPrice !== 'number') {
              res.status(400)
              throw new Error('Preço do produto deve ser do tipo number')
            }
            if (newPrice < 0) {
              res.status(400)
              throw new Error('Preço do produto deve ser maior ou igual a zero')
            }
        }

        if (newCategory !== undefined) {
            if (
                newCategory  !== CATEGORIES.CAKES &&
                newCategory  !== CATEGORIES.DESSERTS &&
                newCategory  !== CATEGORIES.SALTY_PASTRIES
            ) {
              res.status(400)
              throw new Error('Categoria deve ser um dos tipos válidos')
            }
          }

        if (product) {
        product.name = newName || product.name
        product.price = newPrice || product.price
        product.category = newCategory || product.category
        }

        res.status(200).send('Atualização realizada com sucesso')
        
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
            res.send("Erro inesperado.")
        }

        res.send(error.message)
    }
})