import  express, { Request, Response} from 'express'
import cors from 'cors';
import { TProduct, TUser, TPurchase } from './types';
import { products, users } from './database';
import { db } from './knex';

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get('/users', async (req: Request, res: Response) => {
    try {

        const users = await db.raw(`
            SELECT id, name, email, created_at FROM users;
        `);

        if (!users){
            res.status(404)
            throw new Error('Usuários não encontrados.')
        }
        if (!users.length){
            res.status(404)
            throw new Error('Não existem usuários cadastrados.')
        } 
    
        res.status(200).send(users); 

    } catch (error: any){

        if(res.statusCode === 200){
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
        
        console.log(error)
    }
})

app.get('/products', async (req: Request, res: Response) => {
    try {
        const products = await db.raw(`
            SELECT * FROM products;
        `);

        if (!products){
            res.status(404)
            throw new Error('Produtos não encontrados.')
        }
        if (!products.length){
            res.status(404)
            throw new Error('Não existem produtos cadastrados.')
        }
        res.status(200).send(products)   

    } catch (error: any){

        if(res.statusCode === 200){
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
        
        console.log(error)
    }
})

app.get('/products/search', async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if (q.length < 1) {
            res.status(400)
            throw new Error('Sua busca deve possuir pelo menos um caractere.')
        }

        const result = await db.raw(`
            SELECT * FROM products WHERE name LIKE "%${q}%";
        `);

        if(result.length === 0){
            res.status(404)
            throw new Error("Produto não encontrado.")
        }

        res.status(200).send(result)
        
    } catch (error: any) {
        if(res.statusCode === 200){
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
        
        console.log(error)
    }
})

app.get('/purchases', async (req: Request, res: Response) => {
    try {

        const purchases = await db.raw(`
            SELECT * FROM purchases;
        `);

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
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
        
        console.log(error)
    }
})

app.get('/products/:id', async(req: Request, res: Response) => {

    try {

        const id = req.params.id
        const [result] = await db.raw(`
            SELECT * FROM products WHERE id = "${id}";
        `);

        if (!result){
            res.status(400)
            throw new Error('Não foi encontrado nenhum produto. Verifique a "id" e tente novamente.')
        }
        res.status(200).send(result);

    } catch (error: any){

        if(res.statusCode === 200){
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
        
        console.log(error)
    }
})

app.get('/users/:id/purchases', async (req: Request, res: Response) => {

    try {
        const id = req.params.id

        const [user] = await db.raw(`
            SELECT * FROM users WHERE id = "${id}";
        `);

        if (!user){
            res.status(400)
            throw new Error('Não foi encontrado nenhum usuário. Verifique a "id" e tente novamente.')
        }

        const result = await db.raw(`
            SELECT * FROM purchases WHERE buyer = "${id}";
        `);
        if (!result.length){
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

app.post('/users', async (req: Request, res: Response) => {

    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const email = req.body.email as string
        const password = req.body.password as string

        if (typeof id !== "string") {
            res.status(400);
            throw new Error("O id precisa ser uma string!");
        }

        if (!id.length) {
            res.status(400);
            throw new Error("É necessário digitar um id!");
        }

        const userId = await db.raw(`
            SELECT id FROM users WHERE id = "${id}";
        `);

        if (userId.length) {
          res.status(400)
          throw new Error('Não é possível criar mais de uma conta com a mesma id. Tente novamente.')
        }

        
        if (typeof name !== "string") {
            res.status(400);
            throw new Error("O nome precisa ser uma string!");
        }

        if (!name.length) {
            res.status(400);
            throw new Error("É necessário digitar um nome do usuário!");
        }


        if (typeof email !== "string") {
            res.status(400);
            throw new Error("O email precisa ser uma string!");
        }

        if (!email.length) {
            res.status(400);
            throw new Error("É necessário digitar um email!");
        }

        const userEmail = await db.raw(`
            SELECT email FROM users WHERE email = "${email}";
        `);

        if (userEmail.length) {
          res.status(400)
          throw new Error('Não deve é possível criar mais de uma conta com o mesmo e-mail. Tente novamente.')
        }

        if (!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)) {
            res.status(400)
            throw new Error("Email inválido, tente novamente.")
        }

       
        if (typeof password !== "string") {
            res.status(400);
            throw new Error("A senha precisa ser uma string!");
        }

        if (!password.length) {
            res.status(400);
            throw new Error("É necessário digitar uma senha.");
        }

        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
            res.status(400)
            throw new Error("'Password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial.")
        }

        const newUser: TUser = {
            id,
            name,
            email,
            password
        }

        await db.raw(`
            INSERT INTO users(id, name, email, password)
            VALUES ("${newUser.id}", "${newUser.name}", "${newUser.email}", "${newUser.password}");
        `);

        res.status(201).send("Cadastro realizado com sucesso!")
        
    } catch (error: any) {
        if (res.statusCode === 200){
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
        
        console.log(error)
    }
})

app.post('/products', async (req: Request, res: Response) => {

    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const price = req.body.price as number
        const description = req.body.description as string
        const image_url = req.body.image_url as string


        if (typeof id !== "string") {
            res.status(400);
            throw new Error("O id precisa ser uma string!");
        }
        if (!id.length) {
            res.status(400);
            throw new Error("É necessário digitar um id!");
        }
        const productId = await db.raw(`
            SELECT id FROM products WHERE id = "${id}";
        `);

        if (productId.length) {
            res.status(400)
            throw new Error('Não é possível criar mais de uma conta com a mesma id. Tente novamente.')
        }

        
        if (typeof name !== "string") {
            res.status(400);
            throw new Error("O nome precisa ser uma string!");
        }
        if (!name.length) {
            res.status(400);
            throw new Error("Nome do produto deve ter pelo menos 1 caractere.");
        }


        if (typeof price !== "number") {
            res.status(400);
            throw new Error("O preço precisa ser um número!");
        }
        if (price <= 0) {
            res.status(400);
            throw new Error("O preço precisa ser maior que 0.");
        }

        if (typeof description !== "string") {
            res.status(400);
            throw new Error("A descrição precisa ser uma string!");
        }
        if (!description.length) {
            res.status(400);
            throw new Error("É necessário digitar uma descrição.");
        }

        if (typeof image_url !== "string") {
            res.status(400);
            throw new Error("A url da imagem precisa ser uma string!");
        }
        if (!image_url.length) {
              res.status(400);
              throw new Error("É necessário adicionar url da imagem!");
        }

        const newProduct: TProduct = {
            id,
            name,
            price,
            description,
            image_url
        }

        await db.raw(`
            INSERT INTO products(id, name, price, description, image_url)
            VALUES ("${newProduct.id}", "${newProduct.name}", "${newProduct.price}", "${newProduct.description}", "${newProduct.image_url}");
        `);

        res.status(201).send("Produto cadastrado com sucesso!")
    } catch (error:any) {
        if(res.statusCode === 200){
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
        
        console.log(error)
    }
})

app.post('/purchases', async (req: Request, res: Response) => {

    try {

        const id = req.body.id as string
        const buyer = req.body.buyer as string
        const total_price = req.body.total_price as number

        if (typeof id !== "string") {
            res.status(400);
            throw new Error("O id precisa ser uma string!");
        }
        if (!id.length) {
            res.status(400);
            throw new Error("É necessário digitar um id!");
        }

        const purchase = await db.raw(`
            SELECT id FROM purchases WHERE id = "${id}";
        `);
        if (purchase.length) {
            res.status(400)
            throw new Error('Não é possível criar mais de uma compra com a mesma id. Tente novamente.')
        }

        if (typeof buyer !== "string") {
            res.status(400);
            throw new Error("O id do usuário precisa ser uma string!");
        }
        if (!buyer.length) {
            res.status(400);
            throw new Error("É necessário digitar um id para o usuário!");
        }

        const [idBuyer] = await db.raw(`
            SELECT id FROM users WHERE id = "${buyer}";
        `);

        if (!idBuyer){
            res.status(400)
            throw new Error('Usuário não foi encontrado, verifique a "id".')
        }

        if (typeof total_price !== 'number'){
            res.status(400)
            throw new Error('O preço total deve ser um número.')
        }

        if (total_price <= 0){
            res.status(400)
            throw new Error('O preço total deve ser maior que 0')
        }


        const newPurchase: TPurchase = {
            id,
            buyer,
            total_price
        }
    
        await db.raw(`
            INSERT INTO purchases(id, buyer, total_price)
            VALUES ("${newPurchase.id}", "${newPurchase.buyer}", ${newPurchase.total_price});
        `);
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

//   app.put('/products/:id', (req: Request, res: Response) => {

//     try {

//         const id = req.params.id
//         const { name, price, category } = req.body

//         const newName = name as string | undefined
//         const newPrice = price as number | undefined
//         const newCategory = category as CATEGORIES | undefined

//         const product = products.find((product) => product.id === id)

//         if (!product){
//             res.status(400)
//             throw new Error('Produto não existe.')
//         }

//         if (newName !== undefined) {
//             if (typeof newName !== "string"){
//                 res.status(400)
//                 throw new Error('Nome do produto deve ser do tipo string')
//             }

//             if (newName.length < 1){
//                 res.status(400)
//                 throw new Error('Nome do produto deve conter pelo menos 1 caractere.')
//             }
//         }

//         if (newPrice !== undefined) {
//             if (typeof newPrice !== 'number') {
//               res.status(400)
//               throw new Error('Preço do produto deve ser do tipo number')
//             }
//             if (newPrice < 0) {
//               res.status(400)
//               throw new Error('Preço do produto deve ser maior ou igual a zero')
//             }
//         }

//         if (newCategory !== undefined) {
//             if (
//                 newCategory  !== CATEGORIES.CAKES &&
//                 newCategory  !== CATEGORIES.DESSERTS &&
//                 newCategory  !== CATEGORIES.SALTY_PASTRIES
//             ) {
//               res.status(400)
//               throw new Error('Categoria deve ser um dos tipos válidos')
//             }
//           }

//         if (product) {
//         product.name = newName || product.name
//         product.price = newPrice || product.price
//         }

//         res.status(200).send('Atualização realizada com sucesso')
        
//     } catch (error: any) {
//         console.log(error)

//         if(res.statusCode === 200){
//             res.status(500)
//             res.send("Erro inesperado.")
//         }

//         res.send(error.message)
//     }
// })