// redux/slices/announcementSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

interface AnnouncementPayload {
  title: string;
  content: string;
}

interface Announcement {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface AnnouncementState {
  loading: boolean;
  error: string | null;
  success: boolean;
  announcements: Announcement[];
  announcement?: Announcement | null;
}

const initialState: AnnouncementState = {
  loading: false,
  error: null,
  success: false,
  announcements: [],
  announcement: null,
};

const handleAxiosError = (err: unknown, defaultMsg: string) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || defaultMsg;
  }
  return defaultMsg;
};

// Create Announcement
export const createAnnouncement = createAsyncThunk<
  Announcement, // return type
  AnnouncementPayload, // argument type
  { rejectValue: string } // reject value type
>('announcement/createAnnouncement', async (formData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/api/announcements', formData);
    toast.success('Announcement created successfully');
    return response.data.data;
  } catch (err: unknown) {
    const msg = handleAxiosError(err, 'Announcement creation failed');
    toast.error(msg);
    return rejectWithValue(msg);
  }
});

// Get All Announcements
export const getAllAnnouncement = createAsyncThunk<
  Announcement[],
  void,
  { rejectValue: string }
>('announcement/getAllAnnouncement', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/api/announcements');
    return response.data.data;
  } catch (err: unknown) {
    const msg = handleAxiosError(err, 'Failed to fetch announcements');
    toast.error(msg);
    return rejectWithValue(msg);
  }
});

// Delete Announcement
export const deleteAnnouncement = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('announcement/deleteAnnouncement', async (announcementId, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/api/announcements/${announcementId}`);
    toast.success('Announcement deleted successfully');
    return announcementId;
  } catch (err: unknown) {
    const msg = handleAxiosError(err, 'Failed to delete announcement');
    toast.error(msg);
    return rejectWithValue(msg);
  }
});

// Get Announcement By ID
export const getAnnouncementById = createAsyncThunk<
  Announcement,
  string,
  { rejectValue: string }
>('announcement/getAnnouncementById', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/api/announcements/${id}`);
    return response.data.data;
  } catch (err: unknown) {
    const msg = handleAxiosError(err, 'Failed to fetch announcement');
    toast.error(msg);
    return rejectWithValue(msg);
  }
});

// Update Announcement
export const updateAnnouncement = createAsyncThunk<
  Announcement,
  { id: string; formData: AnnouncementPayload },
  { rejectValue: string }
>('announcement/updateAnnouncement', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`/api/announcements/${id}`, formData);
    toast.success('Announcement updated successfully');
    return response.data.data;
  } catch (err: unknown) {
    const msg = handleAxiosError(err, 'Announcement update failed');
    toast.error(msg);
    return rejectWithValue(msg);
  }
});

const announcementSlice = createSlice({
  name: 'announcement',
  initialState,
  reducers: {
    resetAnnouncementState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createAnnouncement.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      // Get All
      .addCase(getAllAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAnnouncement.fulfilled, (state, action: PayloadAction<Announcement[]>) => {
        state.loading = false;
        state.announcements = action.payload;
      })
      .addCase(getAllAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      // Delete
      .addCase(deleteAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.announcements = state.announcements.filter((a) => a._id !== action.payload);
      })
      .addCase(deleteAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      })

      // Get By ID
      .addCase(getAnnouncementById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.announcement = null;
      })
      .addCase(getAnnouncementById.fulfilled, (state, action: PayloadAction<Announcement>) => {
        state.loading = false;
        state.announcement = action.payload;
      })
      .addCase(getAnnouncementById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
        state.announcement = null;
      })

      // Update
      .addCase(updateAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateAnnouncement.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      });
  },
});

export const { resetAnnouncementState } = announcementSlice.actions;
export default announcementSlice.reducer;
