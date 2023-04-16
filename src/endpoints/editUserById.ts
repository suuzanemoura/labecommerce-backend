import { Request, Response } from "express";
import { db } from "../database/knex";
import { TUser } from "../types";

export const editUserById = async (req: Request, res: Response) => {

    try {

        const id = req.params.id
        const { name, email, password } = req.body

        const newName = name as string | undefined
        const newEmail = email as string | undefined
        const newPassword = password as string | undefined
    
        const [user]:TUser[] = await db("users").where({id: id})

        if(!user){
            res.status(400)
            throw new Error('O usuário não existe.')
        }

        if (email !== undefined) {
            if (typeof email !== 'string'){
                res.status(400)
                throw new Error("Email inválido, tente novamente.")
            }
            if (!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)) {
                res.status(400)
                throw new Error("Email inválido, tente novamente.")
            }
        }

        if (password !== undefined) {
            if (typeof password !== 'string') {
              res.status(400)
              throw new Error("Senha inválida, tente novamente.")
            }
            if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
                res.status(400)
                throw new Error("A senha deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
            }
        }

        if (user) {
            
            const updatedUser:TUser = {
                id: id,
                name: newName || user.name,
                email: newEmail || user.email,
                password: newPassword || user.password
            }

            await db("users").update(updatedUser).where({ id: id })
        }
        
  
      res.status(200).send({message: "Cadastro atualizado com sucesso!"})

    } catch (error:any) {
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