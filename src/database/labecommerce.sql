-- Active: 1680534401479@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

INSERT INTO
    users (id, email, password)
VALUES (
        "u001",
        "suzane@email.com",
        "Su@123456"
    ), (
        "u002",
        "bryan@email.com",
        "Bryan@123456"
    ), (
        "u003",
        "fulano@email.com",
        "Fulano@1234"
    );

CREATE TABLE
    products(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

INSERT INTO
    products (id, name, price, category)
VALUES (
        "p001",
        "Bolo de Chocolate",
        8,
        "Bolos"
    ), (
        "p002",
        "Bolo de Morango",
        9,
        "Bolos"
    ), (
        "p003",
        "Mousse de Maracujá",
        10,
        "Doces"
    ), (
        "p004",
        "Coxinha de Frango sem Catupiry",
        12,
        "Salgados"
    ), (
        "p005",
        "Coxinha de Frango com Catupiry",
        12,
        "Salgados"
    );

-- Get All Users

-- retorna todos os usuários cadastrados

SELECT * FROM users;

-- Get All Products

-- retorna todos os produtos cadastrados

SELECT * FROM products;

-- Search Product by name

-- retorna o resultado baseado no termo de busca

SELECT * FROM products WHERE name LIKE "%Bolo%";

-- Create User

-- crie um novo usuário // insere o item mockado na tabela users

INSERT INTO
    users (id, email, password)
VALUES (
        "u004",
        "beltrano@email.com",
        "Beltrano@123"
    );

-- Create Product

-- crie um novo produto // insere o item mockado na tabela products

INSERT INTO
    products (id, name, price, category)
VALUES (
        "p006",
        "Brownie tradicional",
        7,
        "Doces"
    );

-- Get Products by id

-- busca de produtos por id

SELECT * FROM products WHERE id = "p006";

-- Delete User by id

-- deleção de user por id

DELETE FROM users WHERE id = "u004";

-- Delete Product by id

-- deleção de produto por id

DELETE FROM products WHERE id = "p006";

-- Edit User by id

--edição de user por id

UPDATE users SET password = "bananinha123" WHERE id = "u004";

-- Edit Product by id

-- edição de produto por id

UPDATE products SET price = 8 WHERE id = "p006";

-- Get All Users

-- retorna o resultado ordenado pela coluna email em ordem crescente

SELECT * FROM users ORDER BY email ASC;

--Get All Products versão 1

-- retorna o resultado ordenado pela coluna price em ordem crescente // limite o resultado em 20 iniciando pelo primeiro item

SELECT * FROM products ORDER BY price ASC LIMIT 20 OFFSET 0;

-- Get All Products versão 2

-- seleção de um intervalo de preços, por exemplo entre 100.00 e 300.00 // retorna os produtos com preços dentro do intervalo definido em ordem crescente

SELECT *
FROM products
WHERE price >= 10 AND price <= 20
ORDER BY price ASC;

------------------------------------------------------------

-- Criação da tabela de pedidos

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        total_price REAL NOT NULL,
        paid INTEGER NOT NULL DEFAULT 0,
        delivered_at INTEGER,
        buyer_id TEXT NOT NULL,
        FOREIGN KEY (buyer_id) REFERENCES users(id)
    );

SELECT * FROM purchases;

DROP TABLE purchases;

-- a) Crie dois pedidos para cada usuário cadastrado

INSERT INTO
    purchases (
        id,
        total_price,
        delivered_at,
        buyer_id
    )
VALUES ("#00001", 24, NULL, "u001"), ("#00002", 10, NULL, "u001"), ("#00003", 18, NULL, "u002"), ("#00004", 24, NULL, "u002");

UPDATE purchases
SET
    delivered_at = DATETIME('now')
WHERE id = "#00001";

UPDATE purchases SET paid = 1 WHERE id = "#00001";

UPDATE purchases
SET
    delivered_at = DATETIME('now', "+3 day")
WHERE id = "#00002";

UPDATE purchases
SET
    delivered_at = DATETIME('now', "+5 day")
WHERE id = "#00003";

UPDATE purchases
SET
    delivered_at = DATETIME('now', "+10 day")
WHERE id = "#00004";

-- Crie a query de consulta utilizando junção para simular um endpoint de histórico de compras de um determinado usuário. Mocke um valor para a id do comprador, ela deve ser uma das que foram utilizadas no exercício 2.

SELECT
    purchases.id,
    purchases.total_price,
    purchases.paid,
    purchases.delivered_at,
    users.id,
    users.email
FROM purchases
    INNER JOIN users ON users.id = purchases.buyer_id AND purchases.buyer_id = "u002";