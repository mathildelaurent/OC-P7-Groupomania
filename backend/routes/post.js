const postCtrl = require("../controllers/post");
const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

router.post("/", Auth, multer, postCtrl.createPost);
router.get("/", Auth, postCtrl.getAllPosts);
router.get("/:id", Auth, multer, postCtrl.getOnePost);
router.put("/:id", Auth, multer, postCtrl.modifyPost);
router.delete("/:id", Auth, multer, postCtrl.deletePost);
router.post("/:id/like", Auth, postCtrl.opinionPost);

module.exports = router;
