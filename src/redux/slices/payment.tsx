import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';

// -------- TYPES --------
export interface Payment {
  _id: string;
  currency: string; // e.g., INR
  status: string; // e.g., completed
  order: string; // populated later if needed
  transactionId: string;
  amount: number;
  method: string; // e.g., razorpay
  paidAt: string;
  __v?: number;
}

export interface Course {
  _id: string;
  title: string;
  subtitle: string;
}

interface PaymentState {
  payments: Payment[];
  payment: Payment | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

// -------- INITIAL STATE --------
const initialState: PaymentState = {
  loading: false,
  error: null,
  success: false,
  payments: [],
  payment: null,
};

// Utility to handle Axios errors
const handleAxiosError = (err: unknown, defaultMsg: string) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || defaultMsg;
  }
  return defaultMsg;
};

// -------- ASYNC THUNKS --------

// Get all payments
export const getAllPayments = createAsyncThunk<
  Payment[], // Returned data
  void,      // Argument type
  { rejectValue: string } // Rejected value type
>(
  'payments/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<{ data: Payment[] }>('/api/payments');
      return res.data.data;
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, 'Failed to fetch payments'));
    }
  }
);

// Get payment by ID
export const getPaymentById = createAsyncThunk<
  Payment,
  string,
  { rejectValue: string }
>(
  'payments/getById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<{ data: Payment }>(`/api/payments/${id}`);
      return res.data.data;
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, 'Fetch failed'));
    }
  }
);

// -------- SLICE --------
const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(getAllPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(getAllPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      // GET BY ID
      .addCase(getPaymentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentById.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(getPaymentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      });
  },
});

export default paymentSlice.reducer;
