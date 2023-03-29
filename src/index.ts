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
    res.status(200).send(users)
})

app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})

app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string
    const result = products.filter(
        (product) => {
            return product.name.toLowerCase().includes(q.toLowerCase())
        })
    res.status(200).send(result)
})

app.get('/purchases', (req: Request, res: Response) => {
    res.status(200).send(purchases)
})

app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const result = products.find((product) => product.id === id)
    res.status(200).send(result)
})

app.get('/users/:id/purchases', (req: Request, res: Response) => {
    const id = req.params.id
    const result = purchases.filter(
        (purchase) => {
            return purchase.userId.includes(id)
        })
    res.status(200).send(result)
})

app.post('/users', (req: Request, res: Response) => {
    const id = req.body.id as string
    const email = req.body.email as string
    const password = req.body.password as string

    const newUser: TUser = {
        id,
        email,
        password
    }

    users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso!")
})

app.post('/products', (req: Request, res: Response) => {
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const category = req.body.category as CATEGORIES

    const newProduct: TProduct = {
        id,
        name,
        price,
        category
    }

    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso!")
})

app.post('/purchases', (req: Request, res: Response) => {
    const userId = req.body.userId as string
    const productId = req.body.productId as string
    const quantity = req.body.quantity as number
    const totalPrice = req.body.totalPrice as number

    const newPurchase: TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchases.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso!")
})

app.delete('/users/:id', (req: Request, res: Response) => {

    const id = req.params.id

    const userIndex = users.findIndex((user) => user.id === id)

    if (userIndex >= 0) {
        users.splice(userIndex, 1)
    }

    res.status(200).send("User deletado com sucesso!")
})

app.delete('/products/:id', (req: Request, res: Response) => {

    const id = req.params.id

    const productIndex = products.findIndex((product) => product.id === id)

    if (productIndex >= 0) {
        products.splice(productIndex, 1)
    }

    res.status(200).send("Produto deletado com sucesso!")
})

app.put('/users/:id', (req: Request, res: Response) => {

      const id = req.params.id
      const { email, password } = req.body
  
      const newEmail = email as string | undefined
      const newPassword = password as string | undefined
  
      const user = users.find((user) => user.id === id)
  
      if (user) {
        user.email = newEmail || user.email
        user.password = newPassword || user.password
      }
  
      res.status(200).send('Atualização realizada com sucesso')
  })

  app.put('/products/:id', (req: Request, res: Response) => {

    const id = req.params.id
    const { name, price, category } = req.body

    const newName = name as string | undefined
    const newPrice = price as number | undefined
    const newCategory = category as CATEGORIES | undefined

    const product = products.find((product) => product.id === id)

    if (product) {
      product.name = newName || product.name
      product.price = newPrice || product.price
      product.category = newCategory || product.category
    }

    res.status(200).send('Atualização realizada com sucesso')
})