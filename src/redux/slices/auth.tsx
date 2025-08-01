import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';


// 1. Define the interface for login credentials
interface LoginPayload {
    email: string;
    password: string;
}

// 2. Define the AuthState interface
export interface AuthState {
    email: string;
    password: string;
    loading: boolean;
    error: string | null;
    token: string | null;
}

// 3. Initial state
const initialState: AuthState = {
    email: '',
    password: '',
    loading: false,
    error: null,
    token: null,
};

// 4. Define the thunk inside this file
export const login = createAsyncThunk(
    'auth/loginUser',
    async (credentials: LoginPayload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/api/auth/login', credentials);
            localStorage.setItem('token', response.data.data.token);
            console.log(response)
            return response.data; // expected: { token, email }
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

// 5. Create the slice
export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        logout(state) {
            state.email = '';
            state.password = '';
            state.token = null;
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
            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
