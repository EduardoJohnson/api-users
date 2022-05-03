const express = require('express');

const server = express();


server.get('/dev', (req, res) => {
    return res.send('o pai ta on');
});


server.listen(3100);

