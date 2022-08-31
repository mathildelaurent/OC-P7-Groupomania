const sauce = require("../../../P6_laurent_mathilde 2/Project/backend/models/sauce");
const Post = require("../models/post");
const fs = require("fs");

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    delete postObject._userId;

    if (req.file) {
        const post = new Post({
            ...postObject,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
            }`,
        });
        post.save()
            .then(() =>
                res.status(201).json({
                    message: "Publication créée !",
                    contenu: req.body,
                })
            )
            .catch((error) => res.status(400).json({ error }));
    } else {
        const post = new Post({
            ...postObject,
            userId: req.auth.userId,
        });
        post.save()
            .then(() => res.status(201).json({ message: "Publication créée" }))
            .catch((error) => res.status(400).json({ error }));
    }
};

exports.getAllPosts = (req, res, next) => {
    Post.find()
        .then((posts) => res.status(200).json(posts))
        .catch((error) => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    const postObjet = req.file
        ? {
              ...JSON.parse(req.body.post),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
              }`,
          }
        : { ...req.body };
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId != req.auth.userId) {
                res.status(403).json({ error: "Non autorisé !" });
            } else {
                if (req.file) {
                    Post.findOne({ _id: req.params.id })
                        .then((post) => {
                            const filename = post.imageUrl.split("/images")[1];
                            fs.unlink(`images/${filename}`, (error) => {
                                if (error) throw error;
                            });
                        })
                        .catch((error) => res.status(404).json({ error }));
                }
                Post.updateOne(
                    { _id: req.params.id },
                    { ...postObjet, _id: req.params.id }
                )
                    .then(() =>
                        res
                            .status(200)
                            .json({ message: "Publication modifiée !" })
                    )
                    .catch((error) => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (req.auth.userId != post.userId) {
                res.status(403).json({ error: "Non autorisé !" });
            } else {
                const filename = post.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() =>
                            res
                                .status(200)
                                .json({ message: "Publication supprimée !" })
                        )
                        .catch((error) => res.status(401).json({ error }));
                });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
