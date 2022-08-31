const postCtrl = require("../controllers/post");
const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

router.post("/", auth, multer, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPosts);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.delete("/:id", auth, multer, postCtrl.deletePost);

module.exports = router;
