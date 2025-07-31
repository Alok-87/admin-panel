import { useMemo, useState } from "react";
import { FaEnvelope, FaPhone, FaBook, FaUser } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";

export interface Inquiry {
  _id: string;
  status: "pending" | "approved" | "rejected" | "waitlisted";
  name: string;
  phone: string;
  email: string;
  courseInterest: string;
  message: string;
  followUps: string[];
  createdAt: string;
}

interface InquiryListProps {
  inquiries: Inquiry[];
}

const InquiryList: React.FC<InquiryListProps> = ({ inquiries }) => {
  // Local state for inquiry list
  const [inquiryList, setInquiryList] = useState<Inquiry[]>(inquiries);

  // Filters
  const [statusFilter, setStatusFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [tempStatus, setTempStatus] = useState("");
  const [tempCourse, setTempCourse] = useState("");
  const [tempDate, setTempDate] = useState("");

  const [showFilter, setShowFilter] = useState(false);

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    waitlisted: "bg-blue-100 text-blue-800",
  };

  // Filtered inquiries
  const filteredInquiries = useMemo(() => {
    return inquiryList.filter((inquiry) => {
      const matchesStatus = statusFilter ? inquiry.status === statusFilter : true;
      const matchesCourse = courseFilter ? inquiry.courseInterest === courseFilter : true;
      const matchesDate = dateFilter
        ? new Date(inquiry.createdAt).toISOString().split("T")[0] === dateFilter
        : true;
      return matchesStatus && matchesCourse && matchesDate;
    });
  }, [inquiryList, statusFilter, courseFilter, dateFilter]);

  // Unique courses for filter dropdown
  const uniqueCourses = Array.from(new Set(inquiries.map((i) => i.courseInterest)));

  // Status change handler
  const handleStatusChange = (id: string, newStatus: Inquiry["status"]) => {
    const updated = inquiryList.map((inquiry) =>
      inquiry._id === id ? { ...inquiry, status: newStatus } : inquiry
    );
    setInquiryList(updated);
  };

  return (
    <div className="space-y-6">
      {/* Filter button */}
      <div className="relative inline-block">
        <button
          onClick={() => {
            setTempStatus(statusFilter);
            setTempCourse(courseFilter);
            setTempDate(dateFilter);
            setShowFilter(!showFilter);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-black rounded-md shadow hover:bg-gray-200 transition"
        >
          <FiFilter className="text-lg" />
          Filter
        </button>

        {/* Filter dropdown */}
        {showFilter && (
          <div className="absolute top-full mt-2 bg-white p-4 rounded-lg shadow border w-72 z-10 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={tempStatus}
                onChange={(e) => setTempStatus(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="waitlisted">Waitlisted</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <select
                value={tempCourse}
                onChange={(e) => setTempCourse(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">All</option>
                {uniqueCourses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={tempDate}
                onChange={(e) => setTempDate(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setTempStatus("");
                  setTempCourse("");
                  setTempDate("");
                  setStatusFilter("");
                  setCourseFilter("");
                  setDateFilter("");
                  setShowFilter(false);
                }}
                className="px-4 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setStatusFilter(tempStatus);
                  setCourseFilter(tempCourse);
                  setDateFilter(tempDate);
                  setShowFilter(false);
                }}
                className="px-4 py-1 text-sm rounded bg-brand-500 text-white hover:bg-brand-600"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Inquiry cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredInquiries.length > 0 ? (
          filteredInquiries.map((inquiry) => (
            <div
              key={inquiry._id}
              className="p-5 rounded-2xl shadow bg-white border hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FaUser className="text-brand-500" />
                  {inquiry.name}
                </h3>
                <select
                  value={inquiry.status}
                  onChange={(e) =>
                    handleStatusChange(inquiry._id, e.target.value as Inquiry["status"])
                  }
                  className={`text-xs px-2 py-1 rounded font-semibold border ${statusColor[inquiry.status]}`}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="waitlisted">Waitlisted</option>
                </select>
              </div>

              <div className="text-sm text-gray-700 space-y-2">
                <div className="flex items-center gap-2">
                  <FaPhone className="text-brand-500" />
                  {inquiry.phone}
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-brand-500" />
                  {inquiry.email}
                </div>
                <div className="flex items-center gap-2">
                  <FaBook className="text-brand-500" />
                  <span className="font-medium">Course:</span> {inquiry.courseInterest}
                </div>
                <div>
                  <span className="font-medium">Message:</span>{" "}
                  <span className="text-gray-600">{inquiry.message}</span>
                </div>
                <div>
                  <span className="font-medium">Created:</span>{" "}
                  {new Date(inquiry.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 italic">No inquiries found for selected filters.</div>
        )}
      </div>
    </div>
  );
};

export default InquiryList;
