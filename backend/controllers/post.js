const Post = require("../models/post");
const fs = require("fs");
const User = require("../models/user");

exports.createPost = (req, res, next) => {
    const date = new Date();
    const postObject = req.body;
    delete postObject._id;
    delete postObject._userId;

    User.findOne({ _id: req.auth.userId })
        .then((user) => {
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "Utilisateur non trouvé !" });
            } else {
                if (req.file) {
                    const post = new Post({
                        ...postObject,
                        userId: req.auth.userId,
                        from: user.firstname,
                        date: date,
                        imageUrl: `${req.protocol}://${req.get(
                            "host"
                        )}/images/${req.file.filename}`,
                    });
                    post.save()
                        .then(() =>
                            res.status(201).json({
                                date: date,
                                from: user.firstname,
                                title: req.body.title,
                                content: req.body.content,
                                imageUrl: `${req.protocol}://${req.get(
                                    "host"
                                )}/images/${req.file.filename}`,
                            })
                        )
                        .catch((error) => res.status(400).json({ error }));
                } else {
                    const post = new Post({
                        ...postObject,
                        userId: req.auth.userId,
                        from: user.firstname,
                        date: date,
                    });
                    post.save()
                        .then(() =>
                            res.status(201).json({
                                date: date,
                                from: user.firstname,
                                title: req.body.title,
                                content: req.body.content,
                            })
                        )
                        .catch((error) => res.status(400).json({ error }));
                }
            }
        })
        .catch((error) => res.status(404).json({ error }));
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
              ...req.body,
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
              }`,
          }
        : {
              ...req.body,
              imageUrl: "",
          };
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (req.auth.userId != post.userId && req.auth.isAdmin != 1) {
                res.status(403).json({ error: "Non autorisé !" });
            } else {
                if (req.file) {
                    const filename = post.imageUrl.split("/images/")[1];
                    fs.unlink(`images/${filename}`, () => {});
                }
                if (!req.file && post.imageUrl) {
                    postObjet.imageUrl = post.imageUrl;
                }
            }
            Post.updateOne(
                { _id: req.params.id },
                { ...postObjet, _id: req.params.id }
            )
                .then(() => {
                    res.status(200).json({
                        message: "Publication modifiée !",
                    });
                })
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(404).json({ error }));
};

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (req.auth.userId != post.userId && req.auth.isAdmin != 1) {
                res.status(403).json({ error: "Non autorisé !" });
            } else {
                if (post.imageUrl) {
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
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.opinionPost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            switch (req.body.like) {
                case 1:
                    if (
                        !post.usersLiked.includes(req.auth.userId) &&
                        !post.usersDisliked.includes(req.auth.userId) &&
                        req.body.like === 1
                    ) {
                        Post.updateOne(
                            { _id: req.params.id },
                            {
                                $inc: { likes: 1 },
                                $push: { usersLiked: req.auth.userId },
                            }
                        )
                            .then(() =>
                                res.status(201).json({
                                    message:
                                        "L'utilisateur a enregistré un Like !",
                                })
                            )
                            .catch((error) => res.status(400).json({ error }));
                    } else {
                        return res.status(400).json({
                            error: "L'utilisateur a déjà donné son opinion !",
                        });
                    }
                    break;

                case -1:
                    if (
                        !post.usersDisliked.includes(req.auth.userId) &&
                        !post.usersLiked.includes(req.auth.userId) &&
                        req.body.like === -1
                    ) {
                        Post.updateOne(
                            { _id: req.params.id },
                            {
                                $inc: { dislikes: 1 },
                                $push: { usersDisliked: req.auth.userId },
                            }
                        )
                            .then(() =>
                                res.status(201).json({
                                    message:
                                        "L'utilisateur a enregistré un dislike !",
                                })
                            )
                            .catch((error) => res.status(400).json({ error }));
                    } else {
                        return res.status(400).json({
                            error: "L'utilisateur a déjà donné son opinion !",
                        });
                    }
                    break;

                case 0:
                    if (post.usersLiked.includes(req.auth.userId)) {
                        Post.updateOne(
                            { _id: req.params.id },
                            {
                                $inc: { likes: -1 },
                                $pull: { usersLiked: req.auth.userId },
                            }
                        )
                            .then(() =>
                                res.status(201).json({
                                    message:
                                        "L'utilisateur a annulé son like !",
                                })
                            )
                            .catch((error) => res.status(400).json({ error }));
                    }

                    if (post.usersDisliked.includes(req.auth.userId)) {
                        Post.updateOne(
                            { _id: req.params.id },
                            {
                                $inc: { dislikes: -1 },
                                $pull: { usersDisliked: req.auth.userId },
                            }
                        )
                            .then(() =>
                                res.status(201).json({
                                    message:
                                        "L'utilisateur a annulé son dislike !",
                                })
                            )
                            .catch((error) => res.status(400).json({ error }));
                    }
                    break;
            }
        })
        .catch((error) => res.status(404).json({ error }));
};
