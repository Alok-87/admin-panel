// redux/slices/announcementSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

// ✅ Types
interface AnnouncementPayload {
    title: string;
    content: string;
}

interface Announcement {
    _id: string;
    title: string;
    content: string;
    createdAt?: string;
}

interface AnnouncementState {
    loading: boolean;
    error: string | null;
    success: boolean;
    announcements: Announcement[];
}

// ✅ Initial state
const initialState: AnnouncementState = {
    loading: false,
    error: null,
    success: false,
    announcements: [],
};

// ✅ Async thunk to create announcement
export const createAnnouncement = createAsyncThunk(
    'announcement/createAnnouncement',
    async (formData: AnnouncementPayload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/api/announcements', formData);
            toast.success('Announcement created successfully');

            return response.data;
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Announcement creation failed');
            return rejectWithValue(err.response?.data?.message || 'Announcement creation failed');
        }
    }
);

// ✅ Async thunk to get all announcements
export const getAllAnnouncement = createAsyncThunk(
    'announcement/getAllAnnouncement',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/api/announcements');
            console.log("check", response)
            return response.data.data;
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to fetch announcements');
            return rejectWithValue(err.response?.data?.message || 'Announcement fetch failed');
        }
    }
);

export const deleteAnnouncement = createAsyncThunk(
    'announcement/deleteAnnouncement',
    async (announcementId: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/api/announcements/${announcementId}`);
            toast.success('Announcement deleted successfully');
            return response.data; 
            return announcementId; // We'll use this to remove it from local state
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to delete announcement');
            return rejectWithValue(err.response?.data?.message || 'Announcement deletion failed');
        }
    }
);

// ✅ Slice
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
            // Create Announcement
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
                state.error = action.payload as string || 'Something went wrong';
            })

            // Get All Announcements
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
                state.error = action.payload as string || 'Something went wrong';
            })
            // Delete Announcement
            .addCase(deleteAnnouncement.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAnnouncement.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.announcements = state.announcements.filter(a => a._id !== action.payload);
            })
            .addCase(deleteAnnouncement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Something went wrong';
            })

    },
});

// ✅ Exports
export const { resetAnnouncementState } = announcementSlice.actions;
export default announcementSlice.reducer;
