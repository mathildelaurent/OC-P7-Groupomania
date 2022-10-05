const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.secretToken);
        const userIdDecodedToken = decodedToken.userId;
        req.auth = {
            userId: userIdDecodedToken,
        };
        next();
    } catch (error) {
        res.status(401).json({
            error: "Echec Authentification",
            error: error,
        });
    }
};
