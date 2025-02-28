const express = require("express");
const User = require("../models/userModel");

const router = express.Router();

router.post("/subscribe", async (req, res) => {
    const { socketId, categories } = req.body;

    if (!socketId || !categories) {
        return res.status(400).json({ message: "Socket ID and categories are required." });
    }

    const user = await User.findOneAndUpdate(
        { socketId },
        { socketId, categories },
        { upsert: true, new: true }
    );

    res.json({ message: "Subscription updated.", user });
});

module.exports = router;
