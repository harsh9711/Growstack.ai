import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const generatePageNumbers = () => {
    const pageNumbers: number[] = [];
    const maxVisiblePages = 5; // Number of visible pages in the pagination
    const halfRange = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, currentPage + halfRange);

    if (endPage - startPage < maxVisiblePages - 1) {
      if (startPage === 1) {
        endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 mx-1 border rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {pageNumbers.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 mx-1 border rounded ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 mx-1 border rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
