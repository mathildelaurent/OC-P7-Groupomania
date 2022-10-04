const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    date: { type: Date },
    from: { type: String },
    userId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: false },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
});

module.exports = mongoose.model("Post", postSchema);
