import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';

// -------- TYPES --------
export interface Order {
  _id: string;
  paymentStatus: string;
  paymentId: string;
  studentName: string;
  mobileNumber: string;
  email: string;
  className: string;
  amount: number;
  courseType: string;
  course: Course;
  createdAt: string;
}

interface Course {
  _id: string;
  title: string;
  subtitle: string;
}

interface OrderState {
  orders: Order[];
  order: Order | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

// -------- INITIAL STATE --------
const initialState: OrderState = {
  loading: false,
  error: null,
  success: false,
  orders: [],
  order: null,
};

// Utility to handle Axios errors
const handleAxiosError = (err: unknown, defaultMsg: string) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || defaultMsg;
  }
  return defaultMsg;
};

// Get all orders
export const getAllOrders = createAsyncThunk<
  Order[], // return type
  void,    // argument type
  { rejectValue: string } // reject type
>(
  'order/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<{ data: Order[] }>('/api/orders');
      return res.data.data;
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, 'Failed to fetch orders'));
    }
  }
);

// Get order by ID
export const getOrderById = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>(
  'order/getById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<{ data: Order }>(`/api/orders/${id}`);
      return res.data.data;
    } catch (err: unknown) {
      return rejectWithValue(handleAxiosError(err, 'Fetch failed'));
    }
  }
);

// -------- SLICE --------
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL Orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      // GET BY ID
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      });
  },
});

export default orderSlice.reducer;
