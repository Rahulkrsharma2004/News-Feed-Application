import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNews } from "./store/newsSlice";
import { io } from "socket.io-client";
import NewsList from "./components/NewsList";
import CategorySelector from "./components/CategorySelector";

const socket = io("http://backend-service:5000");

const App = () => {
  const dispatch = useDispatch();
  const selectedCategories = useSelector((state) => state.news.selectedCategories);

  useEffect(() => {
    socket.emit("subscribe", selectedCategories);

    socket.on("newsUpdate", (news) => {
      dispatch(setNews(news));
    });

    return () => {
      socket.off("newsUpdate");
    };
  }, [selectedCategories, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Real-Time News Feed</h1>
      <CategorySelector />
      <NewsList />
    </div>
  );
};

export default App;
