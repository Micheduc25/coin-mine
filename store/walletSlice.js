import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wallet: {
    id: null,
    balance: 0,
  },

  transactions: [
    {
      id: "1",
      cryptoType: "BTC",
      amount: 0.05,
      date: "2024-08-27T14:30:00",
      status: "Confirmed",
      type: "buy",
    },
    {
      id: "2",
      cryptoType: "ETH",
      amount: 1.5,
      date: "2024-08-27T12:15:00",
      status: "Pending",
      type: "sell",
    },

    {
      id: "3",
      cryptoType: "ETH",
      amount: 1.5,
      date: "2024-08-27T12:15:00",
      status: "Failed",
      type: "mint",
    },
  ],
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    updateWallet(state, action) {
      state.wallet = action.payload;
    },
    updateBalance(state, action) {
      state.wallet.balance = action.payload;
    },
    addTransaction(state, action) {
      state.transactions.push(action.payload);
    },
    removeTransaction(state, action) {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    },
    resetWallet(state) {
      state.wallet.balance = 0;
      state.transactions = [];
    },
  },
});

export const {
  updateBalance,
  addTransaction,
  removeTransaction,
  resetWallet,
  updateWallet,
} = walletSlice.actions;
export default walletSlice.reducer;
