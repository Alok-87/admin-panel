import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

// 1. Media State
export interface MediaState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

// 2. Initial state
const initialState: MediaState = {
  loading: false,
  error: null,
  success: false,
};

// 3. Async thunk - now expects FormData
export const uploadMedia = createAsyncThunk(
  'media/upload',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Media upload failed');
    }
  }
);

// 4. Slice
export const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    resetMediaState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(uploadMedia.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(uploadMedia.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

// 5. Export
export const { resetMediaState } = mediaSlice.actions;
export default mediaSlice.reducer;
