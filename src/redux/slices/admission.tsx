import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

// Define the inquiry structure
export interface Inquire {
  _id: string;
  name: string;
  phone: number;
  email: string;
  courseInterest: string;
  message: string; // 
  status: 'pending' | 'approved' | 'rejected' | 'waitlisted';
  createdAt: string;
  updatedAt: string;
}

// Admission form payload interface (used for submission)
interface AdmissionFormPayload {
  name: string;
  phone: number;
  email: string;
  courseInterest: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected' | 'waitlisted';
}

// State interface
interface AdmissionState {
  loading: boolean;
  success: boolean;
  error: string | null;
  inquiries: Inquire[];
}

// Initial state
const initialState: AdmissionState = {
  loading: false,
  success: false,
  error: null,
  inquiries: [],
};

// Async thunk to create a new admission inquiry
export const createAdmissionInquiries = createAsyncThunk(
  'admission/submitForm',
  async (formData: AdmissionFormPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/admissions/inquiries', formData);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Submission failed');
    }
  }
);

// Async thunk to get all admission inquiries
export const getAllInQuiries = createAsyncThunk(
  'admission/getAllInquires',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/admissions/inquiries`);
      console.log("Inquiries",response.data)
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetching failed');
    }
  }
);

// Slice
const admissionSlice = createSlice({
  name: 'admission',
  initialState,
  reducers: {
    resetSuccess(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit Inquiry
      .addCase(createAdmissionInquiries.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createAdmissionInquiries.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createAdmissionInquiries.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Inquiries
      .addCase(getAllInQuiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllInQuiries.fulfilled, (state, action: PayloadAction<Inquire[]>) => {
        state.loading = false;
        state.inquiries = action.payload;
      })
      .addCase(getAllInQuiries.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSuccess } = admissionSlice.actions;
export default admissionSlice.reducer;
