const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    title: String,
    category: String,
    content: String,
    publishedAt: { type: Date, default: Date.now }
});

NewsSchema.index({ category: 1, publishedAt: -1 });

module.exports = mongoose.model("News", NewsSchema);
