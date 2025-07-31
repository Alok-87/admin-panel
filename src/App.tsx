import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./features/store";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import CreateCourseForm from "./pages/courseManagement/createCourse/CreateCourseForm";
import CourseList from "./pages/courseManagement/courseList/CourseList";
import ProtectedLayout from "./layout/ProtectedLayout";
import { useEffect } from "react";
import Course from "./pages/courseManagement/courseDetail/Course";
import CourseEdit from "./pages/courseManagement/courseEdit/CourseEdit";
import Inquiries from "./pages/admission/Inquiries/Inquiries";
import Manual_Entry from "./pages/admission/Manual_Entry";

export default function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch({ type: 'auth/checkAuth' });
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Prevent authenticated users from accessing SignIn or SignUp */}
        <Route
          path="/signin"
          element={isAuthenticated ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
        />

        {/* Protected Routes */}
        <Route >
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/course/add" element={<CreateCourseForm />} />
            <Route path="/course/list" element={<CourseList />} />
            <Route path="/course/:id" element={<Course/>}/>
            <Route path="/editCourse/:id" element={<CourseEdit/>}/>
            <Route path="/admission/inquiries" element={<Inquiries/>} />
            <Route path="/admission/manual-entry" element={<Manual_Entry />} />
          </Route>
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
