import React from 'react';

const SearchBar = () => {
    return (
        <div className="flex items-center justify-center border-black ">
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-2 border border-gray-300 rounded border-none focus:border-none"
                />

                <select className="px-4 py-2 border border-gray-300 rounded border-none focus:border-none">
                    <option value="">Select Theatre</option>
                    <option value="theatre1">Theatre 1</option>
                    <option value="theatre2">Theatre 2</option>
                    <option value="theatre3">Theatre 3</option>
                </select>

                <select className="px-4 py-2 border border-gray-300 rounded border-none focus:border-none">
                    <option value="">Select Date</option>
                    <option value="date1">Date 1</option>
                    <option value="date2">Date 2</option>
                    <option value="date3">Date 3</option>
                </select>

                <button
                    type="button"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
