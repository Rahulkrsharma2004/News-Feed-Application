import { useSelector } from "react-redux";

const NewsList = () => {
  const news = useSelector((state) => state.news.news);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Latest News</h2>
      {news.length === 0 ? (
        <p className="text-gray-500">No news available.</p>
      ) : (
        news.map((article, index) => (
          <div key={index} className="border-b py-2">
            <h3 className="text-lg font-bold">{article.title}</h3>
            <p className="text-gray-600">{article.content}</p>
            <span className="text-sm text-blue-600">{article.category}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default NewsList;
