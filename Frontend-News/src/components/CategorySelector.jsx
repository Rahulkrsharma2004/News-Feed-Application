import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../store/newsSlice";

const CategorySelector = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.news.categories);
  const selectedCategories = useSelector((state) => state.news.selectedCategories);

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    dispatch(selectCategory(updatedCategories));
  };

  return (
    <div className="flex justify-center gap-4 mb-4">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded ${
            selectedCategories.includes(category)
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => handleCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
