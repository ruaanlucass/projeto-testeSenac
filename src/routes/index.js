const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({
        titulo: 'Musicas para escutar a qualquer momento',
        data: "19/11/2021"
    })
})

module.exports = router;