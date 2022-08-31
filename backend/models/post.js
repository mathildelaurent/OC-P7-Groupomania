const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: false },
});

module.exports = mongoose.model("Post", postSchema);
