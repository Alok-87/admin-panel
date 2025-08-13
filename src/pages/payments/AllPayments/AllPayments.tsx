import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { FiFilter } from "react-icons/fi";
import { getAllPayments } from "../../../redux/slices/payment";


const AllPayments = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { payments, loading, error } = useSelector((state: RootState) => state.payment);

    useEffect(() => {
        dispatch(getAllPayments());
    }, [dispatch]);


    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Users</h1>
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

            {loading && <p className="text-gray-700 dark:text-gray-200">Loading users...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
                <div className="w-full overflow-x-auto border rounded-lg dark:border-gray-700">
                    <table className="min-w-full text-left border-collapse ">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                <th className="p-4 whitespace-nowrap">Transaction ID</th>
                                <th className="p-4 whitespace-nowrap">Order ID</th>
                                <th className="p-4 whitespace-nowrap">Amount </th>
                                <th className="p-4 whitespace-nowrap">Method</th>
                                <th className="p-4 whitespace-nowrap">Status</th>
                                <th className="p-4 whitespace-nowrap">Paid Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr
                                    key={payment._id}
                                    className="border-t dark:border-gray-700 bg-white  dark:bg-gray-800 transition-colors"
                                >

                                    <td className="p-4 text-gray-800 dark:text-gray-100">{payment.transactionId}</td>
                                    <td className="p-4 text-gray-800 dark:text-gray-100">{payment.order}</td>
                                    <td className="p-4 text-gray-700 dark:text-gray-200">{payment.amount}</td>
                                    <td className="p-4 text-gray-700 dark:text-gray-300">{payment.method}</td>
                                    <td className="p-4 text-gray-700 dark:text-gray-200">{payment.status}</td>
                                    <td className="p-4 text-gray-700 dark:text-gray-200">{payment.paidAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

    );
};

export default AllPayments;
					

