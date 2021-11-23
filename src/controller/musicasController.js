const musicas = require("../models/musicas.json")

const getAllMusicas = (req, res) => {
    console.log(req.url);
    res.status(200).send(musicas)
}

module.exports = {
    getAllMusicas,
}