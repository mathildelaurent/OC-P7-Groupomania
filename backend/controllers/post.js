const Post = require("../models/post");
const fs = require("fs");

exports.createPost = (req, res, next) => {
    const postObject = req.body;
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
                    title: req.body.title,
                    content: req.body.content,
                    imageUrl: `${req.protocol}://${req.get("host")}/images/${
                        req.file.filename
                    }`,
                })
            )
            .catch((error) => res.status(400).json({ error }));
    } else {
        const post = new Post({
            ...postObject,
            userId: req.auth.userId,
        });
        post.save()
            .then(() =>
                res.status(201).json({
                    title: req.body.title,
                    content: req.body.content,
                })
            )
            .catch((error) => res.status(400).json({ error }));
    }
};

exports.getAllPosts = (req, res, next) => {
    Post.find()
        .then((posts) => res.status(200).json(posts))
        .catch((error) => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => res.status(200).json(post))
        .catch((error) => res.status(404).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    const postObjet = req.file
        ? {
              // ...JSON.parse(req.body.post),
              ...req.body,
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
                    // A voir si on peut supprimer le findOne
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
                if (req.file) {
                    const filename = post.imageUrl.split("/images/")[1];
                    fs.unlink(`images/${filename}`, (error) => {
                        if (error) throw error;
                    });
                }
                Post.deleteOne({ _id: req.params.id })
                    .then(() =>
                        res
                            .status(204)
                            .json({ message: "Publication supprimée !" })
                    )
                    .catch((error) => res.status(401).json({ error }));

                // ca commence à merder à partir d'ici
                /*   const filename = post.imageUrl.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() =>
                            res
                                .status(204)
                                .json({ message: "Publication supprimée !" })
                        )
                        .catch((error) => res.status(401).json({ error }));
                });*/
            }
        })
        .catch((error) =>
            res.status(500).json({ error: "A priori, post est non trouvé" })
        );
};
