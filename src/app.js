const express = require('express');
const app = express();

const index = require('./routes/index');
const musica = require('./require/musicaroute');

app.use((res, res, next) => {
    console.log('Nova requisicao realizada');

    next()
});

app.use('/', index);
app.use('/musica', musica);

module.exports = app;