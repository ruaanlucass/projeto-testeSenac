const musicas = require("../models/musicas.json")
const fs = require("fs")

const getAllMusicas = (req, res) => {
    console.log(req.url);
    res.status(200).send(musicas)
}

const createMusicas = (req, res) => {
    const { id, title, duration, launchYear, favorited, artists } = req.body
    musicas.push({ id, title, duration, launchYear, favorited, artists })
    fs.writeFile("./src/models/musicas.json", JSON.stringify(musicas), 'utf8', function (err) {
        if (err) {
            res.status(500).send({ message: err })
        } else {
            console.log("Arquivo atualizado com sucesso!")
            const musicasFound = musicas.find(musicas => musicas.id == id)     
            res.status(200).send(musicasFound)
        }
    })
}

module.exports = {
    createMusicas,
    getAllMusicas,
}