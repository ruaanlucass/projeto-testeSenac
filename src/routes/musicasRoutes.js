const express = require('express');
const router = express.Router();
const controller = require('../controller/musicasController')

router.get("/", controller.getAllMusicas);
router.post("/", controller.createMusicas)

module.exports = router;