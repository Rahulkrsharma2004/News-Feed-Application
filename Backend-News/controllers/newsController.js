const News = require("../models/News");

const getNews = async (req, res) => {
    const news = await News.find().sort({ publishedAt: -1 }).limit(10);
    res.json(news);
};

const addNews = async (req, res) => {
    const { title, category, content } = req.body;
    const news = new News({ title, category, content });
    await news.save();
    res.status(201).json(news);
};

const fetchTrendingNews = async (categories = []) => {
    let matchStage = {};
    if (categories.length > 0) {
        matchStage = { category: { $in: categories } };
    }

    const news = await News.aggregate([
        { $match: matchStage },
        { $sort: { createdAt: -1 } },
        { $limit: 10 }
    ]);

    return news;
};

module.exports = { getNews, addNews, fetchTrendingNews };
