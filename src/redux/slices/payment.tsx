import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

// -------- TYPES --------
export interface Payment {
  _id: string;
  currency: string; // e.g., INR
  status: string; // e.g., completed
  order: string ;// populated later if needed
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

// -------- ASYNC THUNKS --------

// Get all payments
export const getAllPayments = createAsyncThunk(
  'payments/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/api/payments');
      return res.data.data as Payment[];
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch payments'
      );
    }
  }
);

// Get payment by ID
export const getPaymentById = createAsyncThunk(
  'payments/getById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/api/payments/${id}`);
      return res.data.data as Payment;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch failed');
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
      .addCase(
        getAllPayments.fulfilled,
        (state, action: PayloadAction<Payment[]>) => {
          state.loading = false;
          state.payments = action.payload;
        }
      )
      .addCase(getAllPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET BY ID
      .addCase(getPaymentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getPaymentById.fulfilled,
        (state, action: PayloadAction<Payment>) => {
          state.loading = false;
          state.payment = action.payload;
        }
      )
      .addCase(getPaymentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default paymentSlice.reducer;
