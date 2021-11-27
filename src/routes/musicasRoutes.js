const express = require('express');
const router = express.Router();
const controller = require('../controller/musicasController')

router.get("/", controller.getAllMusicas);
router.post("/", controller.createMusicas);
router.get("/:id", controller.getMusicas);
router.get("/:launchYear", controller.getMusicasByLaunchYear);
router.put("/:id", controller.updateMusicas);
router.patch("/:id/favorited", controller.updateFavoritedStatus);
router.delete("/:id", controller.deleteMusicas);

module.exports = router;