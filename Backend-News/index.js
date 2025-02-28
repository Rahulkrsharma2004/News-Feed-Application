const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const newsRoutes = require("./routes/newsRoutes");
const userRoutes = require("./routes/userRoutes");
const { fetchTrendingNews } = require("./controllers/newsController");
const User = require("./models/userModel");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use("/api/news", newsRoutes);
app.use("/api/users", userRoutes);

connectDB();

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("subscribe", async (categories) => {
        await User.findOneAndUpdate(
            { socketId: socket.id },
            { socketId: socket.id, categories },
            { upsert: true, new: true }
        );
        console.log(`User ${socket.id} subscribed to categories: ${categories}`);
    });

    setInterval(async () => {
        const users = await User.find();
        for (const user of users) {
            const news = await fetchTrendingNews(user.categories);
            io.to(user.socketId).emit("newsUpdate", news);
        }
    }, 5000);

    socket.on("disconnect", async () => {
        console.log("User disconnected:", socket.id);
        await User.findOneAndDelete({ socketId: socket.id });
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
