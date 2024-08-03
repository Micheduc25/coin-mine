import { createSlice } from "@reduxjs/toolkit";
import { max } from "lodash";

const initialState = {
  clicks: 0,
  balance: 0,

  projects: [
    {
      id: 1,
      name: "Etherium",
      currentVal: 5000000,
      maxVal: 15000000,
      clicks: 0,
      startDate: null,
      endDate: null,
      mode: "range",
    },
    {
      id: 2,
      name: "Bitcoin",
      currentVal: null,
      maxVal: null,
      clicks: 0,
      startDate: "2021-09-01",
      endDate: "2024-09-30",
      mode: "date",
    },
    {
      id: 3,
      name: "DogeCoin",
      currentVal: 1000000,
      maxVal: 15000000,
      clicks: 0,
      startDate: null,
      endDate: null,
      mode: "range",
    },
  ],
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

    updateProject: (state, action) => {
      const { id, clicks, currentVal } = action.payload;
      const project = state.projects.find((p) => p.id === id);

      if (!project) {
        return;
      }

      project.clicks += clicks;
      project.currentVal = currentVal;
    },
  },
});

export const { incrementClicks, updateBalance, updateProject } =
  gameSlice.actions;
export default gameSlice.reducer;
