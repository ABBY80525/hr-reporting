import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ConfigPaginationProps {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
  totalRecordsCountText?: string;
}

export const ConfigPagination: React.FC<ConfigPaginationProps> = ({
  currentPage = 1,
  totalPages = 99,
  onPageChange,
  totalRecordsCountText
}) => {
  return (
    <div className="flex items-center justify-between pt-3 text-xs text-slate-500 font-sans">
      {/* Left info if provided */}
      <div>
        {totalRecordsCountText ? (
          <span className="text-slate-500 font-medium">{totalRecordsCountText}</span>
        ) : (
          <span></span>
        )}
      </div>

      {/* Right Pagination buttons */}
      <div className="flex items-center space-x-1">
        {/* Previous page */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-1.5 rounded-md hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-500 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page 1 */}
        <button
          onClick={() => onPageChange(1)}
          className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
            currentPage === 1
              ? 'bg-[#2563eb] text-white font-bold shadow-2xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          1
        </button>

        {/* Page 2 */}
        <button
          onClick={() => onPageChange(2)}
          className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
            currentPage === 2
              ? 'bg-[#2563eb] text-white font-bold shadow-2xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          2
        </button>

        {/* Page 3 */}
        <button
          onClick={() => onPageChange(3)}
          className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
            currentPage === 3
              ? 'bg-[#2563eb] text-white font-bold shadow-2xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          3
        </button>

        {/* Page 4 */}
        <button
          onClick={() => onPageChange(4)}
          className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
            currentPage === 4
              ? 'bg-[#2563eb] text-white font-bold shadow-2xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          4
        </button>

        {/* Page 5 */}
        <button
          onClick={() => onPageChange(5)}
          className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
            currentPage === 5
              ? 'bg-[#2563eb] text-white font-bold shadow-2xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          5
        </button>

        {/* Ellipsis */}
        <span className="px-1 text-slate-400 font-bold">•••</span>

        {/* Page 99 */}
        <button
          onClick={() => onPageChange(99)}
          className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
            currentPage === 99
              ? 'bg-[#2563eb] text-white font-bold shadow-2xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          99
        </button>

        {/* Next page */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded-md hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-500 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
