import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
// -------- TYPES --------
export interface UserPayload {
    name: string;
    email: string;
    password?: string; // optional for update
    role: 'admin' | 'manager' | 'telecaller' | 'user';
}

export interface User 
{
    _id:string,
    name: string;
    email: string;
    password?: string; // optional for update
    role: 'admin' | 'manager' | 'telecaller' | 'user';
}

interface UserState {
    user: User | null;
    users: User[];
    loading: boolean;
    error: string | null;
    success: boolean;
}

// -------- INITIAL STATE --------
const initialState: UserState = {
    user: null,
    users: [],
    loading: false,
    error: null,
    success: false,
};

// --------- ASYNC THUNKS ---------

// Create user
export const createUser = createAsyncThunk(
    'user/create',
    async (values: UserPayload, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post('/api/users', values);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Create failed');
        }
    }
);

// Get all users
export const getAllUsers = createAsyncThunk(
    'user/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get('/api/users');
            return res.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch users');
        }
    }
);


// Get user by ID
export const getUserById = createAsyncThunk(
    'user/getById',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`/api/users/${id}`);
            return res.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch failed');
        }
    }
);

// Update user
export const updateUser = createAsyncThunk(
    'user/update',
    async ({ id, formData }: { id: string; formData: UserPayload }, { rejectWithValue }) => {
        try {
            console.log("test",formData)
            const res = await axiosInstance.put(`/api/users/${id}`, formData);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update failed');
        }
    }
);

// Delete user
export const deleteUser = createAsyncThunk(
    'user/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete(`/api/users/${id}`);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete failed');
        }
    }
);

// -------- SLICE --------
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // CREATE
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL USERS
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            // GET BY ID
            .addCase(getUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserById.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // DELETE
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.user = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});


export default userSlice.reducer;
