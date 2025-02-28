import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
  categories: ["Tech", "Business", "Sports" , "Health", "Entertainment"],
  selectedCategories: ["Tech"],
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload;
    },
    selectCategory: (state, action) => {
      state.selectedCategories = action.payload;
    },
  },
});

export const { setNews, selectCategory } = newsSlice.actions;
export default newsSlice.reducer;
