const express = require('express');
const router = express.Router();
const controller = require('../controller/musicasController')

router.get("/", controller.getAllMusicas);
router.post("/", controller.createMusicas)
/*router.get("/:id", controller.getMusicas)*/
router.get("/:launchYear", controller.getMusicasByLaunchYear)

module.exports = router;