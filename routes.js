const express = require('express');
const router = express.Router();
const { pool } = require('./db');



router.get('/', (req, res) => {
    res.send('Bem-vindo à API de produtos ta funcioando legalzao');
});

router.post('/products', async (req, res) => {
    const { name, price, description, quantity } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO products (name, price, description, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, price, description, quantity]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao criar o produto:', error.stack);
        res.status(500).send('Erro interno do servidor');
    }
});

router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Produto não encontrado');
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar o produto:', error.stack);
        res.status(500).send('Erro interno do servidor');
    }
});

router.get('/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        if (result.rows.length === 0) {
            return res.status(404).send('Nenhum produto foi encontrado');
        }
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error.stack);
        res.status(500).send('Erro interno do servidor');
    }
});

router.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, description, quantity, date } = req.body;
    try {
        const result = await pool.query(
            'UPDATE products SET name = $1, price = $2, description = $3, quantity = $4, date = $5 WHERE id = $6 RETURNING *',
            [name, price, description, quantity, date, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Produto não encontrado');
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao atualizar o produto:', error.stack);
        res.status(500).send('Erro interno do servidor');
    }
});

router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        res.sendMessage = 'Produto deletado com sucesso';
        if (result.rows.length === 0) {
            return res.status(404).send('Produto não encontrado');
        }
        res.sendStatus(204);
    } catch (error) {
        console.error('Erro ao deletar o produto:', error.stack);
        res.status(500).send('Erro interno do servidor');
    }
});

module.exports = router