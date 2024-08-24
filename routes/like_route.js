const express = require("express");
const likeController = require("../controllers/like_controller");

const router = express.Router();

// Like routes
router.post("/likes", likeController.createLike);
router.get("/likes", likeController.getAllLikes);
router.get("/likes/:id", likeController.getLike);
router.delete("/likes/:id", likeController.deleteLike);

module.exports = router;
