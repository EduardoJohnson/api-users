
import { query } from './database';
import express from 'express';

const router = express.Router();


router.get('/', (req, res) => {
    res.send('agora')
})

router.get('/users', async (req, res) => {
    try {
        const {rows} = await query('select * from users')
        return res.status(200).send(rows);
    } catch (e) {
        return res.status(400).send(e);
    }

})

export default router;
