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

const getMusicas = (req, res) => {
    const musicasId = req.params.id
    const musicasFound = musicas.find((musicas) => musicas.id == musicasId)
    if (musicasFound) {
        res.status(200).send(musicasFound)
    } else {
        res.status(404).send({ message: "Musica não encontrada" })
    }
}

const getMusicasByLaunchYear = (req, res) => {
    const musicasLaunchYear = req.params.launchYear
    const musicasFound = musicas.find((musicas) => musicas.launchYear == musicasLaunchYear)
    if (musicasFound) {
        res.status(200).send(musicasFound)
    } else {
        res.status(404).send({ message: "Musica não encontrada" })
    }
}

const updateMusicas = (req, res) => {
    try {
        const musicasId = req.params.id
        const musicasToUpdate = req.body 

        const musicasFound = musicas.find(musicas => musicas.id == musicasId)
        const musicasIndex = musicas.indexOf(musicasFound) 

        if (musicasIndex >= 0) { 
            musicas.splice(musicasIndex, 1, musicasToUpdate) 
        } else {
            res.status(404).send({ message: "Filme não encontrado para ser atualizado" })
        }

        fs.writeFile("./src/models/musicas.json", JSON.stringify(musicas), 'utf8', function (err) { 
            if (err) {
                res.status(500).send({ message: err }) 
            } else {
                console.log("Arquivo de filmes atualizado com sucesso!")
                const musicasUpdated = musicas.find(musicas => musicas.id == musicasId) 
                res.status(200).send(musicasUpdated) 
            }
        })
    } catch (err) {
        res.status(500).send({ message: err }) 
    }
}

const updateFavoritedStatus = (req, res) => {
    try {
        const musicasId = req.params.id // pego a informação do id no parametro da requisição
        const favorited = req.body.favorited // pego a informação de watched no corpo da requisição. Ele terá valor true ou false, dependendo do que tiver sido passado

        const musicasToUpdate = musicas.find(musicas => musicas.id == musicasId) // separo o filme que irei mudar o status
        const musicasIndex = musicas.indexOf(musicasToUpdate) // identifico o índice do filme no meu array

        if (musicasIndex >= 0) { // verifico se o filme existe no array de filmes
            musicasToUpdate.favorited = favorited //atualizo o objeto com o novo status informando se foi assistido ou não
            musicas.splice(musicasIndex, 1, musicasToUpdate) // removo o filme pelo índice substituindo pelo novo
        } else {
            res.status(404).send({ message: "Musica não encontrado para informar se foi assistido ou não" })
        }

        fs.writeFile("./src/models/musicas.json", JSON.stringify(musicas), 'utf8', function (err) { // gravo meu json de filmes atualizado
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Arquivo atualizado com sucesso!")
                const musicasUpdated = musicas.find((musicas) => musicas.id == musicasId) // separo o filme que modifiquei no array
                res.status(200).send(musicasUpdated) // envio o filme modificado como resposta
            }
        })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

const deleteMusicas = (req, res) => {
    try {
        const musicasId = req.params.id
        const musicasFound = musicas.find(musicas => musicas.id == musicasId) // encontro o filme pelo id
        const musicasIndex = musicas.indexOf(musicasFound) // identifico o índice do filme no meu array

        if (musicasIndex >= 0) { // verifico se o filme existe no array de filmes
            musicas.splice(musicasIndex, 1) // removo o filme pelo índice
        } else {
            res.status(404).send({ message: "Musica não encontrado para ser deletado" })
        }

        fs.writeFile("./src/models/musicas.json", JSON.stringify(musicas), 'utf8', function (err) { // gravo meu array de filmes sem o filme que deletei
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Musica deletado com sucesso do arquivo!")
                res.sendStatus(204)
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar o filme" })
    }
}

module.exports = {
    createMusicas,
    deleteMusicas,
    updateMusicas,
    updateFavoritedStatus,
    getMusicas,
    getAllMusicas,
    getMusicasByLaunchYear,
}