import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';


interface Course {
  _id: string;
  title: string;
  slug: string;
  category: string;
  bannerImageUrl: string;
}

// Class Item Interface
export interface ClassItem {
  _id: string;
  course:  Course |null ;
  instructor: string | null;
  date: string;
  time: string;
  mode: 'online' | 'offline' | 'hybrid';
  link: string;
  isCancelled: boolean;
  createdAt: string;
}

// Payload for Creating or Updating Class
export interface ClassPayload {
  course: string;
  instructor: string;
  date: string;
  time: string;
  mode: 'online' | 'offline' | 'hybrid';
  link: string;
  isCancelled: boolean;
}

// State Interface
export interface ClassState {
  loading: boolean;
  error: string | null;
  success: boolean;
  classes: ClassItem[];
  selectedClass: ClassItem | null;
}

// Initial State
const initialState: ClassState = {
  loading: false,
  error: null,
  success: false,
  classes: [],
  selectedClass: null,
};

// Async Thunk: Create Class
export const createClass = createAsyncThunk(
  'liveClass/create',
  async (classData: ClassPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/schedules', classData);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create class');
    }
  }
);

// Async Thunk: Get All Classes
export const getAllClasses = createAsyncThunk(
  'liveClass/getAllClasses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/schedules');
      return response.data.data as ClassItem[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch classes');
    }
  }
);

// Async Thunk: Fetch Class by ID
export const fetchClassById = createAsyncThunk(
  'liveClass/fetchById',
  async (classId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/schedules/${classId}`);
      return response.data.data as ClassItem;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch class');
    }
  }
);

// Async Thunk: Update Class
export const updateClass = createAsyncThunk(
  'liveClass/update',
  async (
    { classId, updatedData }: { classId: string; updatedData: Partial<ClassPayload> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`/api/schedules/${classId}`, updatedData);
      return response.data.data as ClassItem;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update class');
    }
  }
);

export const deleteClass = createAsyncThunk(
    'liveClass/Delete',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/api/schedules/${id}`);
            toast.success("Class delete successfully")
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to delete Class');
        }
    }
);

// Slice
const classSlice = createSlice({
  name: 'liveClass',
  initialState,
  reducers: {
    resetClassState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.selectedClass = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Class
      .addCase(createClass.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createClass.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createClass.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Get All Classes
      .addCase(getAllClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllClasses.fulfilled, (state, action: PayloadAction<ClassItem[]>) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(getAllClasses.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Class by ID
      .addCase(fetchClassById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassById.fulfilled, (state, action: PayloadAction<ClassItem>) => {
        state.loading = false;
        state.selectedClass = action.payload;
      })
      .addCase(fetchClassById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Class
      .addCase(updateClass.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateClass.fulfilled, (state, action: PayloadAction<ClassItem>) => {
        state.loading = false;
        state.success = true;

        const index = state.classes.findIndex((cls) => cls._id === action.payload._id);
        if (index !== -1) {
          state.classes[index] = action.payload;
        }

        if (state.selectedClass && state.selectedClass._id === action.payload._id) {
          state.selectedClass = action.payload;
        }
      })
      .addCase(updateClass.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// Export
export const { resetClassState } = classSlice.actions;
export default classSlice.reducer;
