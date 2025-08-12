import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUser } from "react-icons/fa";
import { AppDispatch, RootState } from "../../../redux/store";
import { deleteUser, getAllUsers } from "../../../redux/slices/users"
import { FiFilter, FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router";
import FilterDropdown from "../components/FilterDropdown";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  const { users, loading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);


  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      const resultAction = await dispatch(deleteUser(id));
      if (deleteUser.fulfilled.match(resultAction)) {
        dispatch(getAllUsers());
      }
    }
  }

  const handleEdit = (id: string) => {
    navigate(`/admin/users/edit/${id}`)
  }

  const handleApplyFilters = (filters: { status?: string; course?: string; date?: string }) => {
    // Build query string
    const query = new URLSearchParams(filters as Record<string, string>).toString();
    console.log(query)
    // dispatch(getAllAnnouncement(query)); // getAllAnnouncement should accept query string
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Users</h1>
        <div className="flex gap-2">
          <FilterDropdown onApply={handleApplyFilters}/>
        </div>
      </div>

      {loading && <p className="text-gray-700 dark:text-gray-200">Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="w-full overflow-x-auto border rounded-lg dark:border-gray-700">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr className="text-sm font-medium text-gray-700 dark:text-gray-300">
                <th className="p-4 whitespace-nowrap">User</th>
                <th className="p-4 whitespace-nowrap">Name</th>
                <th className="p-4 whitespace-nowrap">Email</th>
                <th className="p-4 whitespace-nowrap">Role</th>
                <th className="p-4 whitespace-nowrap">Edit</th>
                <th className="p-4 whitespace-nowrap">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t dark:border-gray-700 bg-white  dark:bg-gray-800 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-brand-100 dark:bg-brand-500 rounded-full">
                      <FaUser className="text-brand-500 dark:text-white" />
                    </div>
                  </td>
                  <td className="p-4 text-gray-800 dark:text-gray-100">{user.name}</td>
                  <td className="p-4 text-gray-700 dark:text-gray-200">{user.email}</td>
                  <td className="p-4 capitalize text-gray-700 dark:text-gray-300">{user.role}</td>
                  <td className="p-4">
                    <FiEdit
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer"
                      onClick={() => handleEdit(user._id)}
                    />
                  </td>
                  <td className="p-4">
                    <FiTrash2
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 cursor-pointer"
                      onClick={() => handleDelete(user._id)}
                    />
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

export default UserList;
