const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();
const {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

async function setupDatabase() {
    try {
        await pool.query(`
            DROP TABLE IF EXISTS products;
            CREATE TABLE products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                price DECIMAL,
                description TEXT,
                quantity INT,
                date DATE DEFAULT CURRENT_DATE
            );
        `);
        console.log("Tabela 'products' criada com sucesso");
    } catch (error) {
        console.error('Erro ao configurar o banco de dados:', error);
    }
}

const addProducts = async () => {
    const products = [
        { name: 'Mouse gamer', price: 10.99, description: 'Um belo mouse gamer baratin', quantity: 10 },
        { name: 'Teclado gamer', price: 20.99, description: 'Um belo teclado gamer baratin', quantity: 10 },
        { name: 'Monitor gamer', price: 30.99, description: 'Um belo monitor gamer baratin', quantity: 10 },
        { name: 'Headset gamer', price: 40.99, description: 'Um belo headset gamer baratin', quantity: 10 },
        { name: 'Cadeira gamer', price: 50.99, description: 'Uma bela cadeira gamer baratin', quantity: 10 },
    ];

    for (const product of products) {
        await pool.query(
            'INSERT INTO products (name, price, description, quantity) VALUES ($1, $2, $3, $4)',
            [product.name, product.price, product.description, product.quantity]
        );
    }

    console.log('Adicionado 5 produtos ao banco de dados');
};

setupDatabase().then(addProducts);


module.exports = {pool, setupDatabase}