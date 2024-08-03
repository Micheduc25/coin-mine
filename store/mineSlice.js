import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clicks: 0,
  balance: 0,
};

const gameSlice = createSlice({
  name: "mine",
  initialState,
  reducers: {
    incrementClicks: (state) => {
      state.clicks += 1;
    },
    updateBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const { incrementClicks, updateBalance } = gameSlice.actions;
export default gameSlice.reducer;
