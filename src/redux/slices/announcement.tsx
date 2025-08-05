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
    announcement?: Announcement | null;
}

// ✅ Initial state
const initialState: AnnouncementState = {
    loading: false,
    error: null,
    success: false,
    announcements: [],
    announcement: null,
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


// ✅ Async thunk to get a single announcement by ID
export const getAnnouncementById = createAsyncThunk(
    'announcement/getAnnouncementById',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/api/announcements/${id}`);
            return response.data.data; // Assuming your backend returns the announcement in `data.data`
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to fetch announcement');
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch announcement');
        }
    }
);

// ✅ Async thunk to update announcement
export const updateAnnouncement = createAsyncThunk(
    'announcement/updateAnnouncement',
    async (
        { id, formData }: { id: string; formData: AnnouncementPayload },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.put(`/api/announcements/${id}`, formData);
            toast.success('Announcement updated successfully');
            return response.data.data; // Assuming the updated announcement is in `data.data`
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Announcement update failed');
            return rejectWithValue(err.response?.data?.message || 'Announcement update failed');
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

            // Get Announcement By ID
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
                state.error = action.payload as string || 'Something went wrong';
                state.announcement = null;
            })
            // Update Announcement
            .addCase(updateAnnouncement.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateAnnouncement.fulfilled, (state, action: PayloadAction<Announcement>) => {
                state.loading = false;
                state.success = true;

            })
            .addCase(updateAnnouncement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Something went wrong';
            })


    },
});

// ✅ Exports
export const { resetAnnouncementState } = announcementSlice.actions;
export default announcementSlice.reducer;
