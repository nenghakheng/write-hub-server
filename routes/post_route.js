const postController = require("../controllers/post_controller");
const router = require("express").Router();

// Post routes
router.post("/posts", postController.createPost);
router.get("/posts", postController.getAllPosts);
router.get("/posts/:id", postController.getPost);
router.put("/posts/:id", postController.updatePost);
router.delete("/posts/:id", postController.deletePost);

module.exports = router;
