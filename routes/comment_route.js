const express = require("express");
const commentController = require("../controllers/comment_controller");
const router = express.Router();

// Comment routes
router.post("/comments", commentController.createComment);
router.get("/comments", commentController.getAllComments);
router.get("/comments/:id", commentController.getComment);
router.put("/comments/:id", commentController.updateComment);
router.delete("/comments/:id", commentController.deleteComment);

module.exports = router;
