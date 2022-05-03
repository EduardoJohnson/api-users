const express = require('express');
const { Pool } = require('./database.js');

const PORT = 3333;

const app = express();

app.get('/users', async (req, res) => {

    try {
        const teste = await Pool.query('select * from users')
        console.log(teste, 'aqui')
        return res.status(200).send(teste);
    } catch (e) {
        return res.status(400).send(e);
        
    }

})

app.listen(PORT, () => console.log('server on ', PORT))