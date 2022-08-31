const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

const path = require("path");

mongoose
    .connect(
        "mongodb+srv://Mathilde:Roxane2503@cluster0.ckjpvqt.mongodb.net/?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Accept, Content, Content-type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/images", express.static(path.join(__dirname, "images")));

module.exports = app;
