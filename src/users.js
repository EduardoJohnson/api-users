
import express from 'express';
import Pool from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1010',
    port: 5432,
  })
  pool.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  

const app = express();



app.get('/users', async (req, res) => {
    try {
        const {rows} = await query('select * from users')
        return res.status(200).send(rows);
    } catch (e) {
        return res.status(400).send(e);
    }

})

export default router;