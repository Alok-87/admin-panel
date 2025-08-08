import { useMemo, useState } from "react";
import { FaEnvelope, FaPhone, FaBook, FaUser, FaTable, FaTh } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";

export interface Inquiry {
  _id: string;
  status: "pending" | "approved" | "rejected" | "waitlisted";
  name: string;
  phone: number;
  email: string;
  courseInterest: string;
  message: string;
  createdAt: string;
}

interface InquiryListProps {
  inquiries: Inquiry[];
}

const InquiriesList: React.FC<InquiryListProps> = ({ inquiries }) => {
  const [inquiryList, setInquiryList] = useState<Inquiry[]>(inquiries);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  const [statusFilter, setStatusFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [tempStatus, setTempStatus] = useState("");
  const [tempCourse, setTempCourse] = useState("");
  const [tempDate, setTempDate] = useState("");

  const [showFilter, setShowFilter] = useState(false);

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900",
    approved: "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900",
    rejected: "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900",
    waitlisted: "bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-900",
  };

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

  const uniqueCourses = Array.from(new Set(inquiries.map((i) => i.courseInterest)));

  const handleStatusChange = (id: string, newStatus: Inquiry["status"]) => {
    const updated = inquiryList.map((inquiry) =>
      inquiry._id === id ? { ...inquiry, status: newStatus } : inquiry
    );
    setInquiryList(updated);
  };

  return (
    <div className="space-y-6">
      {/* View and filter controls */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode("card")}
            className={`p-2 rounded-md ${viewMode === "card" ? "bg-brand-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}`}
            title="Card View"
          >
            <FaTh />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded-md ${viewMode === "table" ? "bg-brand-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"}`}
            title="Table View"
          >
            <FaTable />
          </button>
        </div>

        {/* Filter button */}
        <div className="relative inline-block">
          <button
            onClick={() => {
              setTempStatus(statusFilter);
              setTempCourse(courseFilter);
              setTempDate(dateFilter);
              setShowFilter(!showFilter);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-md shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <FiFilter className="text-lg" />
            Filter
          </button>

          {showFilter && (
            <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-lg shadow border dark:border-gray-600 w-72 z-10 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={tempStatus}
                  onChange={(e) => setTempStatus(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="waitlisted">Waitlisted</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Course</label>
                <select
                  value={tempCourse}
                  onChange={(e) => setTempCourse(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={tempDate}
                  onChange={(e) => setTempDate(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                  className="px-4 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500"
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
      </div>

      {/* Card View */}
      {viewMode === "card" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredInquiries.length > 0 ? (
            filteredInquiries.map((inquiry) => (
              <div
                key={inquiry._id}
                className="p-5 rounded-2xl shadow bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-700 hover:shadow-lg transition-all"
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
                    className={`text-xs px-2 py-1 rounded font-semibold border ${statusColor[inquiry.status]} dark:border-gray-600`}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="waitlisted">Waitlisted</option>
                  </select>
                </div>

                <div className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
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
                    <span className="text-gray-600 dark:text-gray-400">{inquiry.message}</span>
                  </div>
                  <div>
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(inquiry.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 dark:text-gray-400 italic">
              No inquiries found for selected filters.
            </div>
          )}
        </div>
      ) : (
        // Table View
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {["Name", "Contact", "Course", "Message", "Created", "Status"].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-brand-100 dark:bg-brand-900 rounded-full">
                          <FaUser className="text-brand-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {inquiry.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      <div>{inquiry.email}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{inquiry.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      {inquiry.courseInterest}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300 line-clamp-2 max-w-xs">
                      {inquiry.message}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={inquiry.status}
                        onChange={(e) =>
                          handleStatusChange(inquiry._id, e.target.value as Inquiry["status"])
                        }
                        className={`text-xs px-2 py-1 rounded font-semibold border ${statusColor[inquiry.status]} dark:border-gray-600`}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="waitlisted">Waitlisted</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400 italic">
                    No inquiries found for selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InquiriesList;
