const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

const dbConfig = require('./config.json');

app.get('/items', async (req, res) => {
    try{
        const connection = await mysql.createConnection(dbConfig);
        const [rows, fields] = await connection.execute('SELECT * FROM item');
        connection.close();
        res.json(rows);
    } catch(error) {
        res.status(500).json({error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})