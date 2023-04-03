-- Active: 1680534401479@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

SELECT * FROM users;

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

SELECT * FROM products 