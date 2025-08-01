// courseSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

// 1. Define the interface for course data
interface CoursePayload {
    title: string;
    slug: string;
    category: string;
    subtitle: string;
    description: string;
    duration: string;
    successRate: number;
    qualifiedCount: string;
    yearsOfExcellence: number;
    bannerImage: File | null;

    floatingHighlights: string[];

    examPattern: {
        questionFormat: string;
        duration: string;
        markingSystem: string;
    };

    topicBreakdown: Array<{
        topic: string;
        percentage: number | '';
    }>;

    programs: Array<{
        mode: string;
        title: string;
        description: string;
        price: number;
        priceLabel: string;
        features: string[];
    }>;

    whyChooseUs: Array<{
        icon: string;
        title: string;
        description: string;
    }>;

    topicCoverage: Array<{
        title: string;
        description: string;
    }>;

    faculty: Array<{
        name: string;
        designation: string;
        bio: string;
        expertise: string[];
        photo: File | null;
    }>;

    testimonials: Array<{
        name: string;
        scoreSummary: string;
        subjectScore: string;
        quote: string;
        photo: File | null;
    }>;

    showTrialButton: boolean;
    showBrochureButton: boolean;
    brochureUrl: string;

    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];
    isPublished: boolean;
}

interface Course {
    _id: string;
    title: string;
    slug: string;
    category: string;
    subtitle: string;
    description: string;
    duration: string;
    successRate: number;
    qualifiedCount: string;
    yearsOfExcellence: number;
    bannerImage?: string; // Optional: if exists in your backend
    brochureUrl: string;

    floatingHighlights: string[];

    examPattern: {
        questionFormat: string;
        duration: string;
        markingSystem: string;
    };

    topicBreakdown: Array<{
        _id: string;
        topic: string;
        percentage: number;
    }>;

    programs: Array<{
        _id: string;
        mode: string;
        title: string;
        description: string;
        price: number;
        priceLabel: string;
        features: string[];
    }>;

    whyChooseUs: Array<{
        _id: string;
        icon: string;
        title: string;
        description: string;
    }>;

    topicCoverage: Array<{
        _id: string;
        title: string;
        description: string;
    }>;

    faculty: Array<{
        _id: string;
        name: string;
        designation: string;
        bio: string;
        expertise: string[];
        photo?: string; // Optional: if stored in DB
    }>;

    testimonials: Array<{
        _id: string;
        name: string;
        scoreSummary: string;
        subjectScore: string;
        quote: string;
        photo?: string; // Optional
    }>;

    showTrialButton: boolean;
    showBrochureButton: boolean;

    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];

    isPublished: boolean;

    createdAt: string;
    updatedAt: string;
    __v: number;
}


// 2. Define the state shape
interface CourseState {
    loading: boolean;
    error: string | null;
    success: boolean;
    courses: Course[];
    course: Course | null;
}

// 3. Initial state
const initialState: CourseState = {
    loading: false,
    error: null,
    success: false,
    courses: [],
    course: null,
};

// 4. Async thunk to create course
export const createCourse = createAsyncThunk(
    'course/createCourse',
    async (courseData: CoursePayload, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/api/courses', courseData);
            toast.success("Course created successfully");
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Course creation failed');
        }
    }
);

// 5. Async thunk to get all courses
export const getAllCourses = createAsyncThunk(
    'course/getAllCourses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/api/courses');
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch courses');
        }
    }
);

export const deleteCourse = createAsyncThunk(
    'course/deleteCourse',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/api/courses/${id}`);
            toast.success("course delete successfully")
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to delete course');
        }
    }
);

export const getCourseById = createAsyncThunk(
    'course/getCourseById',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/api/courses/${id}`);
            return response.data.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch course');
        }
    }
);


export const updateCourse = createAsyncThunk(
  'course/updateCourse',
  async (
    { id, courseData }: { id: string; courseData: CoursePayload },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`/api/courses/${id}`, courseData);
      toast.success('Course updated successfully');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Course update failed');
    }
  }
);


// 6. Slice
const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create course
            .addCase(createCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createCourse.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(createCourse.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            // Get all courses
            .addCase(getAllCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
                state.loading = false;
                state.courses = action.payload;
            })
            .addCase(getAllCourses.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })

            // delete courses
            .addCase(deleteCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCourse.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.courses = state.courses.filter(course => course._id !== action.payload);
                toast.success('Course deleted successfully');
            })
            .addCase(deleteCourse.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            // Get course by ID
            .addCase(getCourseById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCourseById.fulfilled, (state, action: PayloadAction<Course>) => {
                state.loading = false;
                state.course = action.payload;
            })
            .addCase(getCourseById.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export default courseSlice.reducer;

