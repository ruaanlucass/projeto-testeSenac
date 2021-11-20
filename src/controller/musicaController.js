const musica = require("../model/musica.json")

const getAll = (req, res) => {
    console.log(req.url);

    res.send(musica);
};

module.exports = { getAll };