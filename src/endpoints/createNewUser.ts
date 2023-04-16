import { Request, Response } from "express";
import { db } from "../database/knex";
import { TUser } from "../types";

export const createNewUser = async (req: Request, res: Response) => {

    try {
        
        const {id, name, email, password} = req.body

        if (typeof id !== "string") {
            res.status(400);
            throw new Error("Id inválido, tente novamente.");
        }

        if (!id.length) {
            res.status(400);
            throw new Error("É necessário digitar um id!");
        }

        const [userIdExist]:TUser[] = await db("users").where({id: id})

        if (userIdExist) {
          res.status(400)
          throw new Error('Não é possível criar mais de uma conta com a mesma id. Tente novamente.')
        }

        
        if (typeof name !== "string") {
            res.status(400);
            throw new Error("Nome inválido, tente novamente.");
        }

        if (!name.length) {
            res.status(400);
            throw new Error("É necessário digitar um nome do usuário!");
        }


        if (typeof email !== "string") {
            res.status(400);
            throw new Error("Email inválido, tente novamente.");
        }

        if (!email.length) {
            res.status(400);
            throw new Error("É necessário digitar um email!");
        }

        
        if (!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)) {
            res.status(400)
            throw new Error("Email inválido, tente novamente.")
        }

        const [userEmailExist]:TUser[] = await db("users").where({email: email})

        if (userEmailExist) {
          res.status(400)
          throw new Error('Não deve é possível criar mais de uma conta com o mesmo e-mail. Tente novamente.')
        }
       
        if (typeof password !== "string") {
            res.status(400);
            throw new Error("Senha inválida, tente novamente.");
        }

        if (!password.length) {
            res.status(400);
            throw new Error("É necessário digitar uma senha.");
        }

        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
            res.status(400)
            throw new Error("A senha deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial.")
        }

        const newUser: TUser = {
            id,
            name,
            email,
            password
        }

        await db("users").insert(newUser)

        res.status(201).send({ message: "Cadastro realizado com sucesso!" })
        
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
}