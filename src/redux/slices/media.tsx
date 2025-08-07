import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export interface MediaItem {
  _id: string;
  title: string;
  url: string;
  type: string;
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MediaPayload {
  title: string;
  file: File | null;
  type: string;
  isFeatured: boolean;
  tags: string[];
}

// State
export interface MediaState {
  loading: boolean;
  error: string | null;
  success: boolean;
  mediaList: MediaItem[];
  currentMedia: MediaItem | null;
}

// Initial State
const initialState: MediaState = {
  loading: false,
  error: null,
  success: false,
  mediaList: [],
  currentMedia: null,
};

// Upload Media
export const uploadMedia = createAsyncThunk(
  'media/upload',
  async (formData: MediaPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Upload failed');
    }
  }
);

// Get All Media
export const getAllMedia = createAsyncThunk(
  'media/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/media');
      return response.data.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch media');
    }
  }
);

// Get Media By ID
export const getMediaById = createAsyncThunk(
  'media/getById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/media/${id}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch media');
    }
  }
);

// Delete Media
export const deleteMedia = createAsyncThunk(
  'media/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/media/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete failed');
    }
  }
);

// Slice
export const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // Upload
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
      })

      // Get All
      .addCase(getAllMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMedia.fulfilled, (state, action: PayloadAction<MediaItem[]>) => {
        state.loading = false;
        state.mediaList = action.payload;
      })
      .addCase(getAllMedia.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get By ID
      .addCase(getMediaById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentMedia = null;
      })
      .addCase(getMediaById.fulfilled, (state, action: PayloadAction<MediaItem>) => {
        state.loading = false;
        state.currentMedia = action.payload;
      })
      .addCase(getMediaById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMedia.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.mediaList = state.mediaList.filter((item) => item._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteMedia.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// Exports
export default mediaSlice.reducer;
