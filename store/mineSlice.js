import { createSlice } from "@reduxjs/toolkit";
import { max } from "lodash";

const initialState = {
  clicks: 0,
  balance: 0,
  isMute: false,

  projects: [
    {
      id: 1,
      name: "Etherium",
      currentVal: 5000000,
      maxVal: 789000000,
      clicks: 0,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
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
      image: "/images/coin3.jpeg",
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
      image: "/images/coin4.jpeg",
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

    toggleMute: (state) => {
      state.isMute = !state.isMute;
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

export const { incrementClicks, updateBalance, updateProject, toggleMute } =
  gameSlice.actions;
export default gameSlice.reducer;
