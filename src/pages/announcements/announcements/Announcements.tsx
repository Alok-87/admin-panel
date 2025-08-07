import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAnnouncement, getAllAnnouncement } from '../../../redux/slices/announcement';
import { AppDispatch, RootState } from '../../../redux/store';
import { FiFilter, FiEdit, FiTrash2 } from 'react-icons/fi';
import { format } from 'date-fns';
import { useNavigate } from 'react-router';

const Announcements = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { announcements, error } = useSelector(
        (state: RootState) => state.announcement
    );

    const [showFilters, setShowFilters] = useState(false);
    const [expandedIds, setExpandedIds] = useState<string[]>([]);

    useEffect(() => {
        dispatch(getAllAnnouncement());
    }, [dispatch]);

    const toggleExpand = (id: string) => {
        setExpandedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this course?");
        if (confirmDelete) {
            const resultAction = await dispatch(deleteAnnouncement(id));
            if (deleteAnnouncement.fulfilled.match(resultAction)) {
                dispatch(getAllAnnouncement());
            }
        }
    }

    const handleEdit = (id: string) => {
        navigate(`/announcements/edit/${id}`)
    }

    return (
        <div className="max-w-6xl mx-auto py-4 sm:py-8 px-2 sm:px-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">📢 Announcements</h1>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-1 sm:gap-2 bg-brand-500 hover:bg-brand-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors text-sm sm:text-base"
                >
                    <FiFilter className="w-4 h-4" />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 sm:p-4 mb-4 sm:mb-6 rounded text-sm sm:text-base">
                    <p>{error}</p>
                </div>
            )}

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                {/* Table for medium+ screens */}
                <table className="hidden sm:table min-w-full text-left text-sm">
                    <thead className="bg-gray-100 font-semibold text-gray-700">
                        <tr>
                            <th className="py-3 px-4 sm:px-6">Title</th>
                            <th className="py-3 px-4 sm:px-6">Content</th>
                            <th className="py-3 px-4 sm:px-6">Date</th>
                            <th className="py-3 px-4 sm:px-6 text-center">Edit</th>
                            <th className="py-3 px-4 sm:px-6 text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableContent()}
                    </tbody>
                </table>

                {/* Cards for small screens */}
                <div className="sm:hidden space-y-2 p-2">
                    {announcements.length > 0 ? (
                        announcements.map((a) => {
                            const isExpanded = expandedIds.includes(a._id);
                            const shortContent = a.content.slice(0, 60);

                            return (
                                <div key={a._id} className="border rounded-lg p-3 hover:bg-gray-50">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-medium text-gray-800">{a.title}</h3>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(a._id)}
                                                className="text-blue-600 hover:text-blue-800 p-1"
                                            >
                                                <FiEdit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(a._id)}
                                                className="text-red-600 hover:text-red-800 p-1"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-2 text-sm text-gray-600">
                                        {isExpanded ? a.content : `${shortContent}...`}
                                        {a.content.length > 60 && (
                                            <button
                                                onClick={() => toggleExpand(a._id)}
                                                className="ml-2 text-brand-600 underline text-xs"
                                            >
                                                {isExpanded ? 'Show Less' : 'Show More'}
                                            </button>
                                        )}
                                    </div>

                                    <div className="mt-2 text-xs text-gray-500">
                                        {a.createdAt ? format(new Date(a.createdAt), 'MMM dd, yyyy') : 'N/A'}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-4 text-gray-500">
                            No announcements found.
                        </div>
                    )}
                </div>
            </div>
        </div>

                )

// Helper function for table content (to avoid duplication)
function renderTableContent() {
        return announcements.length > 0 ? (
            announcements.map((a) => {
                const isExpanded = expandedIds.includes(a._id);
                const shortContent = a.content.slice(0, 100);

                return (
                    <tr key={a._id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 sm:px-6 font-medium">{a.title}</td>
                        <td className="py-3 px-4 sm:px-6">
                            {isExpanded ? a.content : `${shortContent}...`}
                            {a.content.length > 100 && (
                                <button
                                    onClick={() => toggleExpand(a._id)}
                                    className="ml-2 text-brand-600 underline text-xs"
                                >
                                    {isExpanded ? 'Show Less' : 'Show More'}
                                </button>
                            )}
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-sm text-gray-500">
                            {a.createdAt ? format(new Date(a.createdAt), 'MMM dd, yyyy') : 'N/A'}
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-center">
                            <button
                                onClick={() => handleEdit(a._id)}
                                className="text-blue-600 hover:text-blue-800 p-1"
                            >
                                <FiEdit className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-center">
                            <button
                                onClick={() => handleDelete(a._id)}
                                className="text-red-600 hover:text-red-800 p-1"
                            >
                                <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </td>
                    </tr>
                );
            })
        ) : (
            <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                    No announcements found.
                </td>
            </tr>
        );
    }
    
};

export default Announcements;
