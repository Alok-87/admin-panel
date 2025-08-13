import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
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
  loading: true,
  error: null,
  token: null,
  user: null,
  isLogin: false
};

// ✅ Reusable error handler
const handleAxiosError = (err: unknown, defaultMsg: string) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || defaultMsg;
  }
  return defaultMsg;
};

export const login = createAsyncThunk<
  { token: string; email: string },
  LoginPayload,
  { rejectValue: string }
>('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', credentials);
    localStorage.setItem('token', response.data.data.token);
    return response.data.data;
  } catch (err: unknown) {
    return rejectWithValue(handleAxiosError(err, 'Login failed'));
  }
});

export const gotme = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>('auth/gotme', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/api/auth/me');
    return response.data.data;
  } catch (err: unknown) {
    return rejectWithValue(handleAxiosError(err, 'Fetch user failed'));
  }
});

export const logoutUser = createAsyncThunk<
  string,
  void,
  { rejectValue: string }
>('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/api/auth/logout');
    localStorage.removeItem('token');
    return response.data.message;
  } catch (err: unknown) {
    return rejectWithValue(handleAxiosError(err, 'Logout failed'));
  }
});

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
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string; email: string }>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.isLogin = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      })
      .addCase(gotme.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(gotme.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLogin = true;
        state.loading = false;
      })
      .addCase(gotme.rejected, (state) => {
        state.isLogin = false;
        state.user = null;
        state.loading = false;
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
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
