import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchBar = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="flex flex-col items-center justify-center border-black p-4 mt-5 ">
            <div className="flex flex-col md:flex-row items-center gap-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />

                <div className="flex items-center gap-4">
                    <select className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                        <option value="">Select Theatre</option>
                        <option value="theatre1">Theatre 1</option>
                        <option value="theatre2">Theatre 2</option>
                        <option value="theatre3">Theatre 3</option>
                    </select>

                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Date"
                        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>

                <button
                    type="button"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
