import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';

// Common error handler
const handleAxiosError = (err: unknown, defaultMsg: string): string => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || defaultMsg;
  }
  return defaultMsg;
};

// Inquiry structure
export interface Inquire {
  _id: string;
  name: string;
  phone: number;
  email: string;
  courseInterest: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected' | 'waitlisted';
  createdAt: string;
  updatedAt: string;
}

// Admission form payload
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

// Create admission inquiry
export const createAdmissionInquiries = createAsyncThunk<
  void,
  AdmissionFormPayload,
  { rejectValue: string }
>(
  'admission/submitForm',
  async (formData, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/api/admissions/inquiries', formData);
    } catch (err) {
      return rejectWithValue(handleAxiosError(err, 'Submission failed'));
    }
  }
);

// Get all inquiries
export const getAllInQuiries = createAsyncThunk<
  Inquire[],
  void,
  { rejectValue: string }
>(
  'admission/getAllInquires',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/admissions/inquiries`);
      console.log('Inquiries', response.data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(handleAxiosError(err, 'Fetching failed'));
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
      .addCase(createAdmissionInquiries.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || null;
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
      .addCase(getAllInQuiries.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || null;
      });
  },
});

export const { resetSuccess } = admissionSlice.actions;
export default admissionSlice.reducer;
