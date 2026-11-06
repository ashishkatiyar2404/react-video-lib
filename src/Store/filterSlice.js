import { createSlice, createSelector } from "@reduxjs/toolkit";
import { selectAllVideos } from "./videoSlice";

const initialState = {
  selectedCategory: "All",
  searchQuery: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetFilters: (state) => {
      state.selectedCategory = "All";
      state.searchQuery = "";
    },
  },
});

export const { setSelectedCategory, setSearchQuery, resetFilters } =
  filterSlice.actions;

export default filterSlice.reducer;

// Memoized Selectors
export const selectFilterState = (state) => state.filter;

export const selectSelectedCategory = createSelector(
  [selectFilterState],
  (filter) => filter?.selectedCategory || "All",
);

export const selectSearchQuery = createSelector(
  [selectFilterState],
  (filter) => filter?.searchQuery || "",
);

export const selectFilteredVideos = createSelector(
  [selectAllVideos, selectSelectedCategory, selectSearchQuery],
  (videos, category, search) => {
    return videos.filter((video) => {
      const matchesCategory =
        category === "All" ||
        video.category?.toLowerCase() === category.toLowerCase();
      const matchesSearch =
        !search ||
        video.title?.toLowerCase().includes(search.toLowerCase()) ||
        video.creator?.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  },
);
