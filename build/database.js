"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
exports.users = [
    {
        id: "0001",
        email: "suuzane@gmail.com",
        password: "Su@123456"
    },
    {
        id: "0002",
        email: "bryan@gmail.com",
        password: "Bryan@123456"
    }
];
exports.products = [
    {
        id: "b0001",
        name: "Bolo de Chocolate",
        price: 10,
        category: "Bolos"
    },
    {
        id: "b0002",
        name: "Bolo de morango",
        price: 12,
        category: "Bolos"
    },
];
exports.purchases = [
    {
        userId: exports.users[0].id,
        productId: exports.products[0].id,
        quantity: 2,
        totalPrice: exports.products[0].price * 2
    },
    {
        userId: exports.users[1].id,
        productId: exports.products[1].id,
        quantity: 1,
        totalPrice: exports.products[1].price * 1
    },
];
//# sourceMappingURL=database.js.map