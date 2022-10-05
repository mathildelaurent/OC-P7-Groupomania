const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

const path = require("path");
const user = require("./models/user");

//const limiter = rateLimit({
//  max: 200,
//windowMs: 60 * 60 * 1000,
//message: "Too many requests from this IP",
//});

mongoose
    .connect(process.env.connexionMongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());
app.use(helmet());
//app.use(limiter);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Accept, Content, Content-type, Authorization, type"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.setHeader("Cross-Origin-Resource-Policy", "same-site");

    next();
});

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
user.findOne({ email: "admin@test.com" }).then((admin) => {
    if (!admin) {
        var hash = bcrypt.hashSync("@Dministrateur01", 10);
        const admin = new user({
            lastname: "Admin",
            firstname: "Admin",
            job: "Administration",
            email: "admin@test.com",
            password: hash,
            isAdmin: 1,
        });
        admin.save();
    }
});

module.exports = app;
