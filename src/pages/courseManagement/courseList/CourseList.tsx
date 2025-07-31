import { useState } from 'react';
import FilterSidebar from './components/FilterSidebar';
import { Product } from './types';
import { TbPencil, TbTrash } from 'react-icons/tb'
import image_1 from '../../../Assets/image_1.jpeg'
import image_2 from '../../../Assets/image_2.jpeg'
import {  useNavigate } from 'react-router';
import { FiFilter } from "react-icons/fi";


const CourseList = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const navigate = useNavigate();

    // Mock data - replace with your actual data
    const mockProducts: Product[] = [
        {
            id: 1,
            title: 'Physics batch',
            price: 3999,
            image: image_1
        },
        {
            id: 2,
            title: 'Advance Physics',
            price: 4999,
            image: image_2
        }
    ];

    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Courses</h1>
                <div className="flex space-x-4">
                    <button
                        onClick={toggleFilter}
                        className="px-4 py-2 flex items-center gap-2 align-baseline bg-gray-200 rounded-md hover:bg-gray-300"
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
                            <th className="py-3 px-4 font-semibold text-left">Courses</th>
                            <th className="py-3 px-4 font-semibold text-left">Title</th>
                            <th className="py-3 px-4 font-semibold text-left">Price</th>
                            <th className="py-3 px-4 font-semibold text-left">Edit</th>
                            <th className="py-3 px-4 font-semibold text-left">Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {mockProducts.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-6 text-center text-gray-500">
                                    No data found!
                                </td>
                            </tr>
                        ) : (
                            mockProducts.map((product) => (
                                <tr key={product.id} className="border-b hover:bg-gray-50 ">
                                    <td className="py-3 px-4">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-16 h-16 object-cover rounded cursor-pointer"
                                            onClick={()=> navigate('/course/:3848u398')}
                                        />
                                    </td>
                                    <td className="py-3 px-4">{product.title}</td>
                                    <td className="py-3 px-4">₹{product.price.toFixed(2)}</td>

                                    {/* Edit Column */}
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => console.log('Edit', product.id)}
                                            className="px-3 py-1 text-black hover:text-brand-500"
                                        >
                                            <TbPencil className='h-5 w-5' onClick={()=> navigate('/editCourse/:3848u398')}/>
                                        </button>
                                    </td>

                                    {/* Delete Column */}
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => console.log('Delete', product.id)}
                                            className="px-3 py-1 text-black hover:text-brand-500"
                                        >
                                            <TbTrash className='h-5 w-5' />
                                        </button>
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