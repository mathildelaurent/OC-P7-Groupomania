const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                job: req.body.job,
                email: req.body.email,
                password: hash,
            });
            let emailRegExp = new RegExp(
                "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
            );
            let testEmail = emailRegExp.test(req.body.email);

            if (testEmail === false) {
                return res
                    .status(401)
                    .json({ error: "Adresse mail non valide !" });
            } else {
                user.save()
                    .then(() =>
                        res.status(201).json({
                            message: "Utilisateur créé !",
                            user,
                        })
                    )
                    .catch((error) => res.status(409).json({ error }));
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res
                    .status(404)
                    .json({ error: "Utilisateur non trouvé !" });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res
                            .status(401)
                            .json({ error: "Non autorisé !" });
                    }
                    return res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.secretToken,
                            { expiresIn: "24h" }
                        ),
                        firstname: user.firstname,
                        lastname: user.lastname,
                        job: user.job,
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
