import React, { useState } from 'react';
import { AttendanceRecord } from '../types';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface AttendanceTableProps {
  records: AttendanceRecord[];
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({ records }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 17; // Matching the 17 items in screenshot

  const totalPages = Math.max(1, Math.ceil(records.length / pageSize) || 99);
  const displayedRecords = records.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Helper for Shift Period Badge Color
  const getShiftPeriodStyle = (period: string) => {
    switch (period) {
      case '日班':
        return 'text-amber-500 font-medium';
      case '中班':
        return 'text-emerald-500 font-medium';
      case '夜班':
        return 'text-blue-600 font-medium';
      default:
        return 'text-slate-600';
    }
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col rounded-lg border border-slate-200/80 overflow-hidden">
      {/* Scrollable Container with sticky header & frozen left columns */}
      <div className="flex-1 overflow-auto relative w-full h-full">
        <table className="w-full text-left text-[13px] border-separate border-spacing-0 whitespace-nowrap">
          {/* Table Header Row - Sticky Top */}
          <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0 z-30 shadow-2xs">
            <tr className="bg-slate-100">
              {/* Frozen Column 1: 序號 */}
              <th className="py-3 px-3 w-[50px] min-w-[50px] sticky left-0 z-40 bg-slate-100 border-r border-b border-slate-200 text-center">
                序號
              </th>
              {/* Frozen Column 2: 部門代碼 */}
              <th className="py-3 px-3 w-[120px] min-w-[120px] sticky left-[50px] z-40 bg-slate-100 border-r border-b border-slate-200">
                部門代碼
              </th>
              {/* Frozen Column 3: 部門名稱 */}
              <th className="py-3 px-3 w-[150px] min-w-[150px] sticky left-[170px] z-40 bg-slate-100 border-r border-b border-slate-200">
                部門名稱
              </th>
              {/* Frozen Column 4: 工號 */}
              <th className="py-3 px-3 w-[110px] min-w-[110px] sticky left-[320px] z-40 bg-slate-100 border-r border-b border-slate-200">
                工號
              </th>
              {/* Frozen Column 5: 姓名 (with right border shadow) */}
              <th className="py-3 px-3 w-[90px] min-w-[90px] sticky left-[430px] z-40 bg-slate-100 border-r-2 border-b border-slate-300 shadow-xs">
                姓名
              </th>

              {/* Scrollable Columns */}
              <th className="py-3 px-3 border-r border-b border-slate-200 bg-slate-100">在職狀態</th>
              <th className="py-3 px-3 border-r border-b border-slate-200 bg-slate-100">身份代碼</th>
              <th className="py-3 px-3 border-r border-b border-slate-200 bg-slate-100">身分別</th>
              <th className="py-3 px-3 border-r border-b border-slate-200 bg-slate-100">報表分類</th>
              <th className="py-3 px-3 border-r border-b border-slate-200 bg-slate-100">打卡時間</th>
              <th className="py-3 px-3 border-r border-b border-slate-200 bg-slate-100">出勤日</th>
              <th className="py-3 px-3 border-r border-b border-slate-200 bg-slate-100 text-center">是否工作日</th>
              <th className="py-3 px-3 border-r border-b border-slate-200 bg-slate-100">班別代碼</th>
              <th className="py-3 px-3 border-r border-b border-slate-200 bg-slate-100">班別</th>
              <th className="py-3 px-3 border-r border-b border-slate-200 bg-slate-100 text-center">班段</th>
              <th className="py-3 px-3 border-r border-b border-slate-200 bg-slate-100">製造樓層</th>
              <th className="py-3 px-3 border-r border-b border-slate-200 bg-slate-100">班型</th>
              <th className="py-3 px-3 border-r border-b border-slate-200 bg-slate-100">學校</th>
              <th className="py-3 px-3 border-r border-b border-slate-200 bg-slate-100">科系</th>
              <th className="py-3 px-3 border-r border-b border-slate-200 bg-slate-100">到職日期</th>
              <th className="py-3 px-3 border-r border-b border-slate-200 bg-slate-100">離職日期</th>
              <th className="py-3 px-3 border-r border-b border-slate-200 bg-slate-100">留停日期</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-slate-700 bg-white">
            {displayedRecords.length > 0 ? (
              displayedRecords.map((item) => (
                <tr 
                  key={item.id}
                  className="hover:bg-[#f0f9ff] transition-colors group"
                >
                  {/* Frozen Left Column 1: 序號 */}
                  <td className="py-2.5 px-3 text-center text-slate-400 font-medium sticky left-0 z-20 bg-white group-hover:bg-[#f0f9ff] border-r border-b border-slate-200">
                    {item.id}
                  </td>
                  {/* Frozen Left Column 2: 部門代碼 */}
                  <td className="py-2.5 px-3 font-mono text-slate-600 sticky left-[50px] z-20 bg-white group-hover:bg-[#f0f9ff] border-r border-b border-slate-200">
                    {item.deptCode}
                  </td>
                  {/* Frozen Left Column 3: 部門名稱 */}
                  <td className="py-2.5 px-3 font-medium text-slate-800 sticky left-[170px] z-20 bg-white group-hover:bg-[#f0f9ff] border-r border-b border-slate-200">
                    {item.deptName}
                  </td>
                  {/* Frozen Left Column 4: 工號 */}
                  <td className="py-2.5 px-3 font-mono text-slate-600 sticky left-[320px] z-20 bg-white group-hover:bg-[#f0f9ff] border-r border-b border-slate-200">
                    {item.empId}
                  </td>
                  {/* Frozen Left Column 5: 姓名 */}
                  <td className="py-2.5 px-3 font-medium text-slate-900 sticky left-[430px] z-20 bg-white group-hover:bg-[#f0f9ff] border-r-2 border-b border-slate-300 shadow-xs">
                    {item.name}
                  </td>

                  {/* Non-frozen Scrollable Columns */}
                  <td className="py-2.5 px-3 border-r border-b border-slate-100">
                    <span className={`inline-block px-1.5 py-0.5 rounded-xs text-[11px] ${
                      item.status === '在職' ? 'bg-slate-100 text-slate-700' :
                      item.status === '離職' ? 'bg-rose-50 text-rose-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-500 border-r border-b border-slate-100">{item.identityCode}</td>
                  <td className="py-2.5 px-3 text-slate-600 border-r border-b border-slate-100">{item.identityType}</td>
                  <td className="py-2.5 px-3 text-slate-600 border-r border-b border-slate-100">{item.reportCategory}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-500 border-r border-b border-slate-100">{item.clockTime}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-500 border-r border-b border-slate-100">{item.attendanceDate}</td>
                  <td className="py-2.5 px-3 text-center border-r border-b border-slate-100">
                    {item.isWorkday === '是' ? (
                      <span className="text-emerald-600 font-bold">是</span>
                    ) : (
                      <span className="text-slate-300">否</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600 font-semibold border-r border-b border-slate-100">{item.shiftCode}</td>
                  <td className="py-2.5 px-3 text-slate-700 border-r border-b border-slate-100">{item.shiftName}</td>
                  <td className={`py-2.5 px-3 text-center border-r border-b border-slate-100 ${getShiftPeriodStyle(item.shiftPeriod)}`}>
                    {item.shiftPeriod}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 border-r border-b border-slate-100">{item.manufacturingFloor}</td>
                  <td className="py-2.5 px-3 text-slate-600 border-r border-b border-slate-100">{item.shiftSchedule}</td>
                  <td className="py-2.5 px-3 text-slate-600 border-r border-b border-slate-100">{item.school || '-'}</td>
                  <td className="py-2.5 px-3 text-slate-600 border-r border-b border-slate-100">{item.department || '-'}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-500 border-r border-b border-slate-100">{item.hireDate}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-500 border-r border-b border-slate-100">{item.resignDate}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 border-r border-b border-slate-100">{item.leaveDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={22} className="py-12 text-center text-slate-400">
                  無符合條件的出勤數據
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar Matching Screenshot 2 */}
      <div className="shrink-0 py-3 px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
        <div>
          共 <strong className="text-blue-600">{records.length}</strong> 筆紀錄
        </div>

        <div className="flex items-center space-x-1.5">
          <button 
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="p-1 rounded-md hover:bg-slate-200 text-slate-500 disabled:opacity-30"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-1 rounded-md hover:bg-slate-200 text-slate-500 disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page numbers: 1, 2, 3, 4, 5, ..., 99 */}
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`w-7 h-7 rounded-md font-medium transition-colors ${
                currentPage === num
                  ? 'bg-blue-600 text-white shadow-2xs font-bold'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {num}
            </button>
          ))}

          <span className="px-1 text-slate-400">...</span>

          <button
            onClick={() => setCurrentPage(99)}
            className={`w-8 h-7 rounded-md font-medium transition-colors ${
              currentPage === 99
                ? 'bg-blue-600 text-white font-bold'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            99
          </button>

          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-1 rounded-md hover:bg-slate-200 text-slate-500 disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="p-1 rounded-md hover:bg-slate-200 text-slate-500 disabled:opacity-30"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
