import { useState } from 'react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

const FilterSidebar = ({ isOpen, onClose, onApplyFilters }: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = ['Electronics', 'Clothing', 'Home', 'Books', 'Beauty'];

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      priceRange,
      categories: selectedCategories
    });
    onClose();
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="px-2">
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full mb-2"
            />
            <div className="flex justify-between">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="mr-2"
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-auto flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;