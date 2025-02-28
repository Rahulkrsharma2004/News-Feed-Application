const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    socketId: { type: String, required: true },
    categories: [{ type: String, enum: ["Tech", "Business", "Sports", "Health", "Entertainment"] }]
});

module.exports = mongoose.model("User", userSchema);
