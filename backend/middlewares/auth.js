const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "CECI_EST_UN_TOKEN_SECRET");
        const userIdDecodedToken = decodedToken.userId;
        req.auth = {
            userId: userIdDecodedToken,
        };

        userIdParamsUrl = req.originalUrl.split("=")[1];

        if (req._body === true) {
            if (req.body.userId === userIdDecodedToken) {
                next();
            } else {
                throw "erreur identification userId";
            }
        } else if (userIdParamsUrl === userIdDecodedToken) {
            next();
        } else {
            throw "erreur identification form-data";
        }
    } catch (error) {
        res.status(401).json({
            error: "Echec Authentification",
            error: error,
        });
    }
};