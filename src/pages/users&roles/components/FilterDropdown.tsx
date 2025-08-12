// components/FilterDropdown.tsx
import { useState } from "react";
import { FiFilter } from "react-icons/fi";

interface FilterDropdownProps {
  courses?: string[];
  onApply: (filters: { status?: string; course?: string; date?: string }) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ courses = [], onApply }) => {
  const [tempStatus, setTempStatus] = useState("");
  const [tempCourse, setTempCourse] = useState("");
  const [tempDate, setTempDate] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const handleApply = () => {
    onApply({
      status: tempStatus || undefined,
      course: tempCourse || undefined,
      date: tempDate || undefined,
    });
    setShowFilter(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-md shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <FiFilter className="text-lg" />
        Filter
      </button>

      {showFilter && (
        <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-lg shadow border dark:border-gray-600 w-72 z-10 space-y-4">
          {/* Status */}
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

          {/* Course */}
          <div>
            <label className="block text-sm font-medium mb-1">Course</label>
            <select
              value={tempCourse}
              onChange={(e) => setTempCourse(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">All</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={tempDate}
              onChange={(e) => setTempDate(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => {
                setTempStatus("");
                setTempCourse("");
                setTempDate("");
                setShowFilter(false);
              }}
              className="px-4 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-1 text-sm rounded bg-brand-500 text-white hover:bg-brand-600"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
