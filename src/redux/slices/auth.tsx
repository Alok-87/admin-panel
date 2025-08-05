import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

interface LoginPayload {
    email: string;
    password: string;
}

interface User {
    email: string;
    name: string;
    role: string;
}

export interface AuthState {
    email: string;
    password: string;
    loading: boolean;
    error: string | null;
    token: string | null;
    user: User | null;
    isLogin: boolean;
}

const initialState: AuthState = {
    email: '',
    password: '',
    loading: false,
    error: null,
    token: null,
    user: null,
    isLogin:false
};

export const login = createAsyncThunk(
    'auth/loginUser',
    async (credentials: LoginPayload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/api/auth/login', credentials);
            localStorage.setItem('token', response.data.data.token);
            return response.data.data; // { token, email }
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

export const gotme = createAsyncThunk(
    'auth/gotme',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/api/auth/me');
            console.log("hello")
            return response.data.data; // { email, name, role }
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch user failed');
        }
    }
);


export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/api/auth/logout');
            localStorage.removeItem('token');
            return response.data.message;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Logout failed');
        }
    }
);


export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        logout(state) {
            state.email = '';
            state.password = '';
            state.token = null;
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.token = action.payload.token;
                state.email = action.payload.email;
                state.isLogin = true;
            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(gotme.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(gotme.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
                state.isLogin = true;
            })
            .addCase(gotme.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.isLogin = false;
            })
            .addCase(logoutUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
