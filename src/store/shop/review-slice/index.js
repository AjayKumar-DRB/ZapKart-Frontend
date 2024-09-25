import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the base URL for your API
const baseURL = "http://localhost:5000/api/shop/review";

const initialState = {
  isLoading: false,
  reviews: [],
};

// Add a new review
export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formdata) => {
    const response = await axios.post(
      `${baseURL}/add` // Use baseURL here
    , formdata);

    return response.data;
  }
);

// Get reviews by product ID
export const getReviews = createAsyncThunk(
  "/order/getReviews", 
  async (id) => {
    const response = await axios.get(
      `${baseURL}/${id}` // Use baseURL here
    );

    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
