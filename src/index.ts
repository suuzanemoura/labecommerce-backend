import  express, { Request, Response} from 'express'
import cors from 'cors';
import { getAllUsers } from './endpoints/getAllUsers';
import { getAllProducts } from './endpoints/getAllProducts';
import { getProductByName } from './endpoints/getProductByName';
import { getProductById } from './endpoints/getProductById';
import { getAllPurchases } from './endpoints/getAllPurchases';
import { getPurchaseById } from './endpoints/getPurchaseById';
import { getPurchasesByUserId } from './endpoints/getPurchasesByUserId';
import { createNewUser } from './endpoints/createNewUser';
import { createNewProduct } from './endpoints/createNewProduct';
import { createNewPurchase } from './endpoints/createNewPurchase';
import { deleteUserById } from './endpoints/deleteUserById';
import { deleteProductById } from './endpoints/deleteProductById';
import { deletePurchaseById } from './endpoints/deletePurchaseById';
import { editUserById } from './endpoints/editUserById';
import { editProductById } from './endpoints/editProductById';

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

app.get('/users', getAllUsers)

app.get('/products', getAllProducts)

app.get('/products/search', getProductByName)

app.get('/products/:id', getProductById)

app.get('/purchases', getAllPurchases)

app.get('/purchases/:id', getPurchaseById)

app.get('/users/:id/purchases', getPurchasesByUserId)

app.post('/users', createNewUser)

app.post('/products', createNewProduct)

app.post('/purchases', createNewPurchase)

app.put('/users/:id', editUserById)

app.put('/products/:id', editProductById)

app.delete('/users/:id', deleteUserById)

app.delete('/products/:id', deleteProductById)

app.delete('/purchases/:id', deletePurchaseById)