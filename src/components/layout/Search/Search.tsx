import React from "react";

export const SearchBar: React.FC<{ text: string, onChange: React.ChangeEventHandler<HTMLInputElement>, onSearch: () => void }> = ({ text, onChange, onSearch }) => {
    return (
        <div className="flex items-center gap-4 max-w-[700px] mx-auto my-8 h-12 pl-3 pr-1 bg-white rounded-full shadow-lg border border-gray-300">
            {/* Search Icon */}
            <div className="icon">
                <svg fill="#999" width="24px" height="24px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M416 448L319 351Q277 383 224 383 181 383 144 362 107 340 86 303 64 266 64 223 64 180 86 143 107 106 144 85 181 63 224 63 267 63 304 85 341 106 363 143 384 180 384 223 384 277 351 319L448 416 416 448ZM223 336Q270 336 303 303 335 270 335 224 335 177 303 145 270 112 223 112 177 112 144 145 111 177 111 224 111 270 144 303 177 336 223 336Z" />
                </svg>
            </div>

            {/* Search Input */}
            <input
                className="h-full w-full flex-1 outline-none bg-transparent text-gray-700 text-lg"
                type="text"
                placeholder="Enter user name..."
                value={text}
                onChange={onChange}
                onKeyUp={onSearch} // Trigger search on key up event
            />

            {/* Search Button */}
            <button
                className="bg-red-500 hover:bg-red-600 transition-all text-white px-6 py-2 rounded-full text-sm font-semibold"
                onClick={onSearch}
            >
                Search
            </button>
        </div>
    );
};
