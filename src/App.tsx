import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import CreateCourseForm from "./pages/courseManagement/createCourse/CreateCourseForm";
import CourseList from "./pages/courseManagement/courseList/CourseList";
// import ProtectedLayout from "./layout/ProtectedLayout";
import { useEffect } from "react";
import Course from "./pages/courseManagement/courseDetail/Course";
import CourseEdit from "./pages/courseManagement/courseEdit/CourseEdit";
import Inquiries from "./pages/admission/inquiries/Inquiries";
import Manual_Entry from "./pages/admission/manualEntry/Manual_Entry";
import AllMedia from "./pages/media/allMedia/AllMedia";
import UploadMedia from "./pages/media/uploadMedia/UploadMedia";
import Classes from "./pages/classes/classes/Classes";
import CreateClass from "./pages/classes/createClasses/CreateClass";
import EditClass from "./pages/classes/editClasses/EditClass";
import CreateAnnouncements from "./pages/announcements/createannouncements/CreateAnnouncements";
import Announcements from "./pages/announcements/announcements/Announcements";
import EditAnnouncements from "./pages/announcements/editannouncements/EditAnnouncements";
import Profile from "./pages/profile/Profile";
import { gotme } from "./redux/slices/auth";
import ProtectedRoute from "./components/common/ProtectedRoute"; 
import CreateUser from "./pages/users&roles/createUser/CreateUser";
import UserList from "./pages/users&roles/UserList";

export default function App() {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(gotme())
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Prevent authenticated users from accessing SignIn or SignUp */}
        <Route
          path="/signin"
          element={isLogin ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={isLogin ? <Navigate to="/" /> : <SignUp />}
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute> <AppLayout /></ProtectedRoute>}>
          <Route index path="/" element={<Home />} />
          <Route path="/course/add" element={<CreateCourseForm />} />
          <Route path="/course/list" element={<CourseList />} />
          <Route path="/course/:id" element={<Course />} />
          <Route path="/editCourse/:id" element={<CourseEdit />} />
          <Route path="/admission/inquiries" element={<Inquiries />} />
          <Route path="/admission/manual-entry" element={<Manual_Entry />} />
          <Route path="/allmedia" element={<AllMedia />} />
          <Route path="/uploadmedia" element={<UploadMedia />} />
          <Route path="/live-classes/calendar" element={<Classes />} />
          <Route path="/live-classes/create" element={<CreateClass />} />
          <Route path="/live-classes/edit/:id" element={<EditClass />} />
          <Route path="/announcements/create" element={<CreateAnnouncements />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/announcements/edit/:id" element={<EditAnnouncements />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/users/create" element={<CreateUser/>} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes >
    </Router >
  );
}
