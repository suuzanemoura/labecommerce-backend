-- Active: 1680534401479@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME('now', 'localtime')) NOT NULL
    );

INSERT INTO
    users (id, name, email, password)
VALUES (
        "u001",
        "Suzane",
        "suzane@email.com",
        "Su@123456"
    ), (
        "u002",
        "Bryan",
        "bryan@email.com",
        "bryan@123456"
    ), (
        "u003",
        "Murilo",
        "murilo@email.com",
        "Murilo@12345"
    );

CREATE TABLE
    products(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        "p001",
        "Bolo de Chocolate",
        12,
        "Fatia de bolo de chocolate com recheio e cobertura de brigadeiro, finalizado com raspas de chocolate.",
        "https://cuidai.com.br/alimentacao/busca-de-alimentos/Content/img/alimentos/164876-bolo-de-chocolate-com-recheio-e-calda-de-chocolate.jpg"
    ), (
        "p002",
        "Bolo de Morango",
        15,
        "Bolo branco, morangos frescos, creme de baunilha, chantilly e geleia de morango caseira.",
        "https://salvadornorteonline.com.br/salvadornorteonline/2021/04/Torta-Delicia-de-Morango-scaled.jpg"
    ), (
        "p003",
        "Mousse de Maracujá",
        10,
        "Mousse de maracujá no pote de 250ml.",
        "https://img.cybercook.com.br/receitas/764/mousse-de-maracuja-para-100-pessoas-2.jpeg"
    ), (
        "p004",
        "Coxinha de Frango sem Catupiry",
        12,
        "Coxinha grande recheada com bastante frango.",
        "https://receitasimplesefacil.com.br/wp-content/uploads/2022/02/Coxinha-de-Frango-1024x756.jpg"
    ), (
        "p005",
        "Coxinha de Frango com Catupiry",
        12,
        "Coxinha grande recheada com bastante frango com catupiry.",
        "https://i2.wp.com/www.flamboesa.com.br/wp-content/uploads/2017/06/coxinha9386.jpg?fit=1280%2C849&ssl=1"
    );

-- Get All Users

SELECT * FROM users;

-- Get All Products

SELECT * FROM products;

-- Search Product by name

SELECT * FROM products WHERE name LIKE "%Bolo%";

-- Create User

INSERT INTO
    users (id, name, email, password)
VALUES (
        "u004",
        "Marcelo",
        "marcelo@email.com",
        "Marcelo@123"
    );

-- Create Product

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        "p006",
        "Brownie tradicional",
        7,
        "Brownie de Chocolate tradicional, sem recheio.",
        "https://img.itdg.com.br/images/recipes/000/306/823/340593/340593_original.jpg"
    );

-- Get Products by id

SELECT * FROM products WHERE id = "p006";

-- Delete User by id

DELETE FROM users WHERE id = "u004";

-- Delete Product by id

DELETE FROM products WHERE id = "p006";

-- Edit User by id

UPDATE users SET password = "Marcelo@1234" WHERE id = "u004";

-- Edit Product by id

UPDATE products SET price = 8 WHERE id = "p006";

-- Get All Users

SELECT * FROM users ORDER BY email ASC;

--Get All Products versão 1

SELECT * FROM products ORDER BY price ASC LIMIT 20 OFFSET 0;

-- Get All Products versão 2

SELECT *
FROM products
WHERE price >= 10 AND price <= 12
ORDER BY price ASC;

------------------------------------------------------------

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT DEFAULT (DATETIME('now', 'localtime')) NOT NULL,
        paid INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (buyer) REFERENCES users(id) ON DELETE CASCADE
    );

SELECT * FROM purchases;

DROP TABLE purchases;

INSERT INTO
    purchases (id, buyer, total_price)
VALUES ("pur0001", "u001", 24), ("pur0002", "u001", 16), ("pur0003", "u002", 27), ("pur0004", "u002", 35);

UPDATE purchases
SET
    created_at = DATETIME('now', 'localtime')
WHERE id = "pur0004";

UPDATE purchases SET paid = 1 WHERE id = "pur0001";

UPDATE purchases
SET
    created_at = DATETIME('now', '-1 day', 'localtime')
WHERE id = "pur0003";

UPDATE purchases
SET
    created_at = DATETIME('now', '-2 days', 'localtime')
WHERE id = "pur0002";

UPDATE purchases
SET
    created_at = DATETIME('now', '-3 days', 'localtime')
WHERE id = "pur0001";

SELECT
    purchases.id,
    purchases.buyer,
    users.name,
    users.email,
    purchases.total_price,
    purchases.created_at,
    purchases.paid
FROM purchases
    INNER JOIN users ON users.id = purchases.buyer AND purchases.buyer = "u002";

CREATE TABLE
    purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );

INSERT INTO
    purchases_products (
        purchase_id,
        product_id,
        quantity
    )
VALUES ("pur0001", "p001", 1), ("pur0001", "p005", 1), ("pur0002", "p006", 2), ("pur0003", "p002", 1), ("pur0003", "p005", 1), ("pur0004", "p002", 1), ("pur0004", "p006", 1), ("pur0004", "p005", 1);

INSERT INTO
    purchases_products (
        purchase_id,
        product_id,
        quantity
    )
VALUES ("pur0006", "p001", 2), ("pur0006", "p006", 2);

SELECT * FROM purchases_products;

DROP TABLE purchases_products;

SELECT
    purchases.id,
    purchases.buyer,
    purchases_products.product_id,
    products.name,
    purchases_products.quantity,
    products.price,
    products.description,
    purchases.total_price,
    purchases.paid,
    purchases.created_at
FROM purchases_products
    INNER JOIN purchases ON purchases.id = purchases_products.purchase_id
    INNER JOIN products ON products.id = purchases_products.product_id;