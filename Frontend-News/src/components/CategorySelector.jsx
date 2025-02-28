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
    <div className="w-full overflow-x-auto px-4 py-2">
      <div className="flex flex-wrap md:flex-nowrap gap-3 justify-center items-center">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded transition-all duration-300
              ${
                selectedCategories.includes(category)
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-200 hover:bg-gray-300"
              }
            `}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
