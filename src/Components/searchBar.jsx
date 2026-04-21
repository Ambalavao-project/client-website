import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div 
      className="max-w-md mx-auto mt-10 mb-8 px-6 opacity-0 anim-item" 
      data-index={2}
    >
      <div className="relative group">
        {/* L'icône positionnée de manière absolue à l'intérieur de l'input */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FiSearch 
            className="h-5 w-5 text-gray-400 group-focus-within:text-pink-600 transition-colors duration-300" 
          />
        </div>

        {/* L'input stylisé */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-2xl bg-white 
                     text-gray-900 text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent 
                     outline-none transition-all duration-300 shadow-sm hover:shadow-md 
                     placeholder:text-gray-400"
        />
      </div>
    </div>
  );
};

export default SearchBar;