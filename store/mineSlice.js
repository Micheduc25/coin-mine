import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clicks: 0,
  balance: 0,
  isMute: false,
  projects: [
    {
      id: 1,
      name: "Project 1",
      currentVal: 723657,
      maxVal: 883175,
      clicks: 34,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin3.jpeg",
    },
    {
      id: 2,
      name: "Project 2",
      currentVal: 960789,
      maxVal: 1572514,
      clicks: 4,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin4.jpeg",
    },
    {
      id: 3,
      name: "Project 3",
      currentVal: 197503,
      maxVal: 895218,
      clicks: 32,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin4.jpeg",
    },
    {
      id: 4,
      name: "Project 4",
      currentVal: 1064910,
      maxVal: 1530769,
      clicks: 47,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin3.jpeg",
    },
    {
      id: 5,
      name: "Project 5",
      currentVal: 531434,
      maxVal: 690367,
      clicks: 16,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/eth.jpeg",
    },
    {
      id: 6,
      name: "Project 6",
      currentVal: 444962,
      maxVal: 1307024,
      clicks: 23,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin3.jpeg",
    },
    {
      id: 7,
      name: "Project 7",
      currentVal: 962017,
      maxVal: 1922075,
      clicks: 45,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin4.jpeg",
    },
    {
      id: 8,
      name: "Project 8",
      currentVal: 171478,
      maxVal: 401150,
      clicks: 47,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin.png",
    },
    {
      id: 9,
      name: "Project 9",
      currentVal: 209285,
      maxVal: 1143153,
      clicks: 58,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin.png",
    },
    {
      id: 10,
      name: "Project 10",
      currentVal: 1032067,
      maxVal: 1311391,
      clicks: 27,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin3.jpeg",
    },
    {
      id: 11,
      name: "Project 11",
      currentVal: 626943,
      maxVal: 1291132,
      clicks: 12,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/eth.jpeg",
    },
    {
      id: 12,
      name: "Project 12",
      currentVal: 375410,
      maxVal: 1186498,
      clicks: 29,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/eth.jpeg",
    },
    {
      id: 13,
      name: "Project 13",
      currentVal: 408941,
      maxVal: 580642,
      clicks: 7,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin2.jpeg",
    },
    {
      id: 14,
      name: "Project 14",
      currentVal: 202517,
      maxVal: 366528,
      clicks: 10,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin.png",
    },
    {
      id: 15,
      name: "Project 15",
      currentVal: 833902,
      maxVal: 1012288,
      clicks: 94,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin3.jpeg",
    },
    {
      id: 16,
      name: "Project 16",
      currentVal: 684408,
      maxVal: 1726559,
      clicks: 55,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin4.jpeg",
    },
    {
      id: 17,
      name: "Project 17",
      currentVal: 806182,
      maxVal: 1847631,
      clicks: 8,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/eth.jpeg",
    },
    {
      id: 18,
      name: "Project 18",
      currentVal: 490202,
      maxVal: 1516761,
      clicks: 51,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin.png",
    },
    {
      id: 19,
      name: "Project 19",
      currentVal: 796490,
      maxVal: 1197062,
      clicks: 23,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin4.jpeg",
    },
    {
      id: 20,
      name: "Project 20",
      currentVal: 405245,
      maxVal: 799995,
      clicks: 31,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin2.jpeg",
    },
    {
      id: 21,
      name: "Project 21",
      currentVal: 542946,
      maxVal: 987531,
      clicks: 27,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin3.jpeg",
    },
    {
      id: 22,
      name: "Project 22",
      currentVal: 410390,
      maxVal: 1294852,
      clicks: 18,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin2.jpeg",
    },
    {
      id: 23,
      name: "Project 23",
      currentVal: 868251,
      maxVal: 1964222,
      clicks: 52,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin4.jpeg",
    },
    {
      id: 24,
      name: "Project 24",
      currentVal: 295395,
      maxVal: 476919,
      clicks: 14,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin3.jpeg",
    },
    {
      id: 25,
      name: "Project 25",
      currentVal: 566870,
      maxVal: 1336967,
      clicks: 46,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin2.jpeg",
    },
    {
      id: 26,
      name: "Project 26",
      currentVal: 908509,
      maxVal: 1258285,
      clicks: 60,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin3.jpeg",
    },
    {
      id: 27,
      name: "Project 27",
      currentVal: 588249,
      maxVal: 753777,
      clicks: 73,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin2.jpeg",
    },
    {
      id: 28,
      name: "Project 28",
      currentVal: 357770,
      maxVal: 1256673,
      clicks: 18,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/eth.jpeg",
    },
    {
      id: 29,
      name: "Project 29",
      currentVal: 286185,
      maxVal: 445472,
      clicks: 1,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin3.jpeg",
    },
    {
      id: 30,
      name: "Project 30",
      currentVal: 726518,
      maxVal: 1305773,
      clicks: 80,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/eth.jpeg",
    },
    {
      id: 31,
      name: "Project 31",
      currentVal: 275291,
      maxVal: 751636,
      clicks: 71,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin.png",
    },
    {
      id: 32,
      name: "Project 32",
      currentVal: 790256,
      maxVal: 1053951,
      clicks: 16,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin.png",
    },
    {
      id: 33,
      name: "Project 33",
      currentVal: 728688,
      maxVal: 1411960,
      clicks: 69,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin2.jpeg",
    },
    {
      id: 34,
      name: "Project 34",
      currentVal: 1063041,
      maxVal: 1423418,
      clicks: 37,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin.png",
    },
    {
      id: 35,
      name: "Project 35",
      currentVal: 512635,
      maxVal: 1003714,
      clicks: 48,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/eth.jpeg",
    },
    {
      id: 36,
      name: "Project 36",
      currentVal: 912159,
      maxVal: 1061412,
      clicks: 79,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin.png",
    },
    {
      id: 37,
      name: "Project 37",
      currentVal: 224620,
      maxVal: 418036,
      clicks: 87,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin2.jpeg",
    },
    {
      id: 38,
      name: "Project 38",
      currentVal: 650887,
      maxVal: 1336391,
      clicks: 62,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/coin2.jpeg",
    },
    {
      id: 39,
      name: "Project 39",
      currentVal: 750125,
      maxVal: 1763733,
      clicks: 87,
      startDate: null,
      endDate: null,
      mode: "range",
      image: "/images/eth.jpeg",
    },
    {
      id: 40,
      name: "Project 40",
      currentVal: 604927,
      maxVal: 1429929,
      clicks: 24,
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
      const { id, clicks } = action.payload;
      const project = state.projects.find((p) => p.id === id);

      if (!project) {
        return;
      }

      project.clicks += clicks;
    },
  },
});

export const { incrementClicks, updateBalance, updateProject, toggleMute } =
  gameSlice.actions;
export default gameSlice.reducer;
