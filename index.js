const express = require('express');
const { setupDatabase } = require('./db');
const routes = require('./routes');	
const cors = require('cors');
const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes);

setupDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
});



