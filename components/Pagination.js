import React, { useState, useEffect } from "react";

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage]);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <nav className="mt-8">
      <ul className="flex justify-center items-center space-x-2">
        <li>
          <button
            onClick={() => handleClick(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-2 border rounded-md ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-blue-500 hover:bg-blue-500 hover:text-white"
            }`}
          >
            &#8592;
          </button>
        </li>
        {getPageNumbers().map((number) => (
          <li key={number}>
            <button
              onClick={() => handleClick(number)}
              className={`px-3 py-2 border rounded-md ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => handleClick(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 border rounded-md ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-blue-500 hover:bg-blue-500 hover:text-white"
            }`}
          >
            &#8594;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
