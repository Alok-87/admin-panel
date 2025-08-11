import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
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
    course: string | Course;
    createdAt: string;
}

interface Course {
    _id: string;
    title: string;
    subtitle: string;
}


interface UserState {
    orders: Order[];
    order: Order | null
    loading: boolean;
    error: string | null;
    success: boolean;
}

// -------- INITIAL STATE --------
const initialState: UserState = {
    loading: false,
    error: null,
    success: false,
    orders: [],
    order: null,
};


// Get all users
export const getAllOrders = createAsyncThunk(
    'order/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get('/api/orders');
            console.log(res.data.data)
            return res.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
        }
    }
);


// Get user by ID
export const getOrderById = createAsyncThunk(
    'order/getById',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`/api/orders/${id}`);
            return res.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch failed');
        }
    }
);



// -------- SLICE --------
const userSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {

    },
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
                state.error = action.payload as string;
            })


            // GET BY ID
            .addCase(getOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
                state.loading = false;
                state.order = action.payload
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});


export default userSlice.reducer;
