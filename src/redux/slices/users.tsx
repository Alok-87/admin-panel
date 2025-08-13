import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';

// -------- TYPES --------
export interface UserPayload {
    name: string;
    email: string;
    password?: string; // optional for update
    role: 'admin' | 'manager' | 'telecaller' | 'user';
}

export interface User {
    _id: string;
    name: string;
    email: string;
    password?: string;
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

// Utility to handle Axios errors
const handleAxiosError = (err: unknown, defaultMsg: string) => {
    if (axios.isAxiosError(err)) {
        return err.response?.data?.message || defaultMsg;
    }
    return defaultMsg;
};

// --------- ASYNC THUNKS ---------

export const createUser = createAsyncThunk<User, UserPayload, { rejectValue: string }>(
    'user/create',
    async (values, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post<User>('/api/users', values);
            return res.data;
        } catch (err: unknown) {
            return rejectWithValue(handleAxiosError(err, 'Create failed'));
        }
    }
);

export const getAllUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
    'user/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get<{ data: User[] }>('/api/users');
            return res.data.data;
        } catch (err: unknown) {
            return rejectWithValue(handleAxiosError(err, 'Failed to fetch users'));
        }
    }
);

export const getUserById = createAsyncThunk<User, string, { rejectValue: string }>(
    'user/getById',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get<{ data: User }>(`/api/users/${id}`);
            return res.data.data;
        } catch (err: unknown) {
            return rejectWithValue(handleAxiosError(err, 'Fetch failed'));
        }
    }
);

export const updateUser = createAsyncThunk<User, { id: string; formData: UserPayload }, { rejectValue: string }>(
    'user/update',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put<User>(`/api/users/${id}`, formData);
            return res.data;
        } catch (err: unknown) {
            return rejectWithValue(handleAxiosError(err, 'Update failed'));
        }
    }
);

export const deleteUser = createAsyncThunk<{ message: string }, string, { rejectValue: string }>(
    'user/delete',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete<{ message: string }>(`/api/users/${id}`);
            return res.data;
        } catch (err: unknown) {
            return rejectWithValue(handleAxiosError(err, 'Delete failed'));
        }
    }
);

// -------- SLICE --------
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // CREATE
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
            })

            // GET ALL USERS
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
            })

            // GET BY ID
            .addCase(getUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
            })

            // UPDATE
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null;
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
                state.error = action.payload || null;
            });
    },
});

export default userSlice.reducer;
