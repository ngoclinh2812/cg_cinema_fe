import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchBar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSearch = () => {
        // Thực hiện logic tìm kiếm dựa trên giá trị từ ô input và ngày đã chọn
        // Lưu kết quả tìm kiếm vào state searchResults
        const results = []; // Giả sử kết quả tìm kiếm là một mảng các phần tử
        setSearchResults(results);
    };

    return (
        <div className="flex flex-col items-center justify-center border-black p-4 mt-5 ">
            <div className="flex flex-col md:flex-row items-center gap-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />

                {/*<div className="flex items-center gap-4">*/}
                {/*    <DatePicker*/}
                {/*        selected={selectedDate}*/}
                {/*        onChange={handleDateChange}*/}
                {/*        dateFormat="dd/MM/yyyy"*/}
                {/*        placeholderText="Select Date"*/}
                {/*        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"*/}
                {/*    />*/}
                {/*</div>*/}

                <button
                    type="button"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            <div>
                {searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                        <div key={index}>{result}</div>
                    ))
                ) : (
                    <div>No results found</div>
                )}
            </div>
        </div>
    );
};

const App = () => {
    return (
        <div>
            <SearchBar />
        </div>
    );
};

export default App;
