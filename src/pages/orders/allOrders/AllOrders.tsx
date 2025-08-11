import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { FiFilter } from "react-icons/fi";
import { getAllOrders } from "../../../redux/slices/order";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router";

const AllOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const clickHandler = (id: string) => {
    navigate(`/order/${id}`);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Users
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => {
              // Handle filter logic
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-black dark:bg-gray-800 dark:text-white rounded-md shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <FiFilter className="text-lg" />
            Filter
          </button>
        </div>
      </div>

      {loading && (
        <p className="text-gray-700 dark:text-gray-200">Loading users...</p>
      )}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="w-full overflow-x-auto border rounded-lg dark:border-gray-700">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr className="text-sm font-medium text-gray-700 dark:text-gray-300">
                <th className="p-4 whitespace-nowrap">Student Name</th>
                <th className="p-4 whitespace-nowrap">Course</th>
                <th className="p-4 whitespace-nowrap">Mobile</th>
                <th className="p-4 whitespace-nowrap">Email</th>
                <th className="p-4 whitespace-nowrap">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors"
                >
                  <td className="flex items-center gap-1 p-4 text-gray-800 dark:text-gray-100">
                    <div
                      onClick={() => clickHandler(order._id)}
                      className="flex-shrink-0 cursor-pointer h-8 w-8 flex items-center justify-center bg-brand-100 dark:bg-brand-500 rounded-full"
                    >
                      <FaUser className="text-brand-500 dark:text-white cursor-pointer" />
                    </div>
                    <span
                      className="cursor-pointer"
                      onClick={() => clickHandler(order._id)}
                    >
                      {order.studentName}
                    </span>
                  </td>
                  <td className="p-4 text-gray-800 dark:text-gray-100">
                    {order.course.id}
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-200">
                    {order.mobileNumber}
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    {order.email}
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-200">
                    {order.paymentStatus}
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

export default AllOrders;
