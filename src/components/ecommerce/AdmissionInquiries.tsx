import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { FaUser, FaBook, FaClock, } from 'react-icons/fa';
import { getAllInQuiries } from '../../redux/slices/admission';

const statusStyles = {
    approved: 'text-gray-800 bg-green-100',
    pending: 'text-gray-800 bg-red-100',
    rejected: 'text-gray-800 bg-red-100',
    waitlisted: 'text-gray-800 bg-blue-100',
};

const AdmissionInquiries = () => {

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(getAllInQuiries());
    }, [dispatch]);

    const { inquiries, loading, error } = useSelector((state: RootState) => state.admission);

    const latestInquiries = inquiries?.slice(0, 7);

    return (
        <div className="bg-white h-full shadow p-4 dark:bg-gray-800 dark:bg-white/[0.03] dark:text-gray-300 rounded-xl">
            <div className="flex flex-col gap-6 mb-4 pt-2">
                <div className="w-11 h-11 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                    {/* Replace src="" with your icon/image if needed */}
                    <FaUser className="text-xl text-gray-600" />
                </div>
                <div className="text-md text-gray-500 dark:text-gray-400">Recent Admission Inquiries</div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">Error loading inquiries.</p>
            ) : latestInquiries?.length === 0 ? (
                <p className="text-gray-500">No recent inquiries.</p>
            ) : (
                <div className="overflow-x-auto dark:text-gray-200">
                    <table className="min-w-full text-sm text-left">
                        <thead>
                            <tr className="border-b text-gray-500 font-semibold">
                                <th className="py-2 pr-4"><FaUser className="inline mr-1" />Name</th>
                                <th className="py-2 pr-4"><FaBook className="inline mr-1" />Course</th>
                                <th className="py-2"><FaClock className="inline mr-1" />Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {latestInquiries.map((inquiry: any, index: number) => (
                                <tr key={index} className="border-b last:border-0">
                                    <td className="py-2 pr-4">{inquiry.name}</td>
                                    <td className="py-2 pr-4">{inquiry.courseInterest}</td>
                                    <td className="py-2">
                                        <span
                                            className={`text-xs font-medium px-2 py-1 rounded-full ${statusStyles[inquiry.status?.toLowerCase()] || 'bg-gray-100 text-gray-600'
                                                }`}
                                        >
                                            {inquiry.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

    );
};

export default AdmissionInquiries;
