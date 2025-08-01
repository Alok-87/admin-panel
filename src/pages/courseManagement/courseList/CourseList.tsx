import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { getAllCourses, deleteCourse } from '../../../redux/slices/course';
import FilterSidebar from './components/FilterSidebar';
import { TbPencil, TbTrash } from 'react-icons/tb';
import { useNavigate } from 'react-router';
import { FiFilter } from 'react-icons/fi';

const CourseList = () => {
    const [showFilter, setShowFilter] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();
    const { courses, loading } = useSelector((state: RootState) => state.course);


    useEffect(() => {
        dispatch(getAllCourses());
    }, [dispatch]);

    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this course?");
        if (confirmDelete) {
            const resultAction = await dispatch(deleteCourse(id));
            if (deleteCourse.fulfilled.match(resultAction)) {
                dispatch(getAllCourses()); // ✅ Refresh the course list
            }
        }
    };


    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Courses</h1>
                <div className="flex space-x-4">
                    <button
                        onClick={toggleFilter}
                        className="px-4 py-2 flex items-center gap-2 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        <FiFilter className="text-lg" />
                        Filter
                    </button>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-10 pr-4 py-2 border rounded-md"
                        />
                        <svg
                            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="border-b">
                            <th className="py-3 px-4 font-semibold text-left">Course</th>
                            <th className="py-3 px-4 font-semibold text-left">Title</th>
                            <th className="py-3 px-4 font-semibold text-left">Price</th>
                            <th className="py-3 px-4 font-semibold text-left">Edit</th>
                            <th className="py-3 px-4 font-semibold text-left">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="py-6 text-center text-gray-500">
                                    Loading...
                                </td>
                            </tr>
                        ) : courses.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-6 text-center text-gray-500">
                                    No courses found!
                                </td>
                            </tr>
                        ) : (
                            courses.map((course) => (
                                <tr key={course._id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <img
                                            src={course.bannerImage}
                                            alt={course.title}
                                            className="w-16 h-16 object-cover rounded cursor-pointer"
                                            onClick={() => navigate(`/course/${course._id}`)}
                                        />
                                    </td>
                                    <td className="py-3 px-4">{course.title}</td>
                                    <td className="py-3 px-4">
                                        ₹{course.programs[0]?.price?.toFixed(2) ?? 'N/A'}
                                    </td>
                                    <td className="py-3 px-4">
                                        <TbPencil
                                            className="h-5 w-5 cursor-pointer hover:text-brand-500"
                                            onClick={() => navigate(`/editCourse/${course._id}`)} 
                                        />
                                    </td>
                                    <td className="py-3 px-4">
                                        <TbTrash
                                            className="h-5 w-5 cursor-pointer hover:text-brand-500"
                                            onClick={() => handleDelete(course._id)} // ✅ Wrap in arrow function
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <FilterSidebar
                isOpen={showFilter}
                onClose={() => setShowFilter(false)}
                onApplyFilters={(filters) => console.log('Applied filters:', filters)}
            />
        </div>
    );
};

export default CourseList;
