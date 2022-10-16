import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "./transactionAPI";

// initial state
const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
  editing: {},
};

// async thunks
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const transactions = await getTransactions();
    return transactions;
  }
);

// reducer
export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
  }
);

export const changeTransaction = createAsyncThunk(
  "transactions/changeTransaction",
  async ({ id, data }) => {
    const transaction = await updateTransaction(id, data);
    return transaction;
  }
);

export const removeTransaction = createAsyncThunk(
  "transactions/removeTransaction",
  async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editDeactive: (state) => {
      state.editing = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = "";
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.transactions = action.payload;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
    builder.addCase(createTransaction.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = "";
    });
    builder.addCase(createTransaction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.transactions.push(action.payload);
    });
    builder.addCase(createTransaction.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
    builder.addCase(changeTransaction.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = "";
    });
    builder.addCase(changeTransaction.fulfilled, (state, action) => {
      state.isLoading = false;

      const indexToUpdate = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id
      );
      state.transactions[indexToUpdate] = action.payload;
    });
    builder.addCase(changeTransaction.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
    builder.addCase(removeTransaction.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = "";
    });
    builder.addCase(removeTransaction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.meta.arg
      );
    });
    builder.addCase(removeTransaction.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
  },
});

export default transactionSlice.reducer;
export const { editActive, editDeactive } = transactionSlice.actions;
