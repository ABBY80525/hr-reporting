import React, { useState } from 'react';
import { initialOrgData, OrgConfigRecord } from '../../data/mockConfigData';
import { ConfigPagination } from './ConfigPagination';
import { Search, Upload, Download, ChevronDown } from 'lucide-react';

export const OrgConfigView: React.FC = () => {
  const [buFilter, setBuFilter] = useState('NVD');
  const [factoryFilter, setFactoryFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dataList] = useState<OrgConfigRecord[]>(initialOrgData);

  const filteredData = dataList.filter((item) => {
    const matchSearch =
      !searchTerm.trim() ||
      item.deptCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deptName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchBu = !buFilter || item.bu === buFilter;
    const matchFactory = !factoryFilter || item.factory === factoryFilter;
    return matchSearch && matchBu && matchFactory;
  });

  return (
    <div className="flex-1 min-h-0 flex flex-col space-y-3 p-1 overflow-hidden">
      {/* Top Controls Bar */}
      <div className="shrink-0 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left Filters & Search */}
        <div className="flex flex-wrap items-center gap-2">
          {/* BU Dropdown */}
          <div className="relative">
            <select
              value={buFilter}
              onChange={(e) => setBuFilter(e.target.value)}
              className="appearance-none bg-white border border-slate-300 rounded-lg px-3 py-1.5 pr-8 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="NVD">NVD</option>
              <option value="CESBG">CESBG</option>
              <option value="BGA">BGA</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* 廠部 Dropdown */}
          <div className="relative">
            <select
              value={factoryFilter}
              onChange={(e) => setFactoryFilter(e.target.value)}
              className="appearance-none bg-white border border-slate-300 rounded-lg px-3 py-1.5 pr-8 text-xs text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">廠部</option>
              <option value="工程技術部">工程技術部</option>
              <option value="製造一處">製造一處</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* Search Input */}
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="部門代碼 / 名稱"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* Search Button (Blue) */}
          <button className="px-4 py-1.5 bg-[#2563eb] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center space-x-1.5 cursor-pointer transition-colors">
            <Search className="w-3.5 h-3.5" />
            <span>搜尋</span>
          </button>
        </div>

        {/* Right Green Action Buttons */}
        <div className="flex items-center space-x-2">
          <button className="px-4 py-1.5 bg-[#10b981] hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center space-x-1.5 cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5" />
            <span>導出待維護清單</span>
          </button>

          <button className="px-4 py-1.5 bg-[#10b981] hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center space-x-1.5 cursor-pointer transition-colors">
            <Download className="w-3.5 h-3.5" />
            <span>導入</span>
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="flex-1 min-h-0 overflow-auto border border-slate-200 rounded-lg relative">
        <table className="w-full text-left text-[13px] border-separate border-spacing-0 whitespace-nowrap">
          <thead className="bg-[#f8fafc] text-slate-800 font-bold sticky top-0 z-20">
            <tr>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 text-center w-12 bg-[#f8fafc]">序號</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 text-center w-12 bg-[#f8fafc]">排序</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 bg-[#f8fafc]">部門代碼</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 bg-[#f8fafc]">部門名稱</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 bg-[#f8fafc]">BU</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 bg-[#f8fafc]">廠部</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 bg-[#f8fafc]">法人</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 bg-[#f8fafc]">維護人</th>
              <th className="py-2.5 px-3 border-b border-slate-200 bg-[#f8fafc]">維護時間</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100 text-slate-700">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-2.5 px-3 text-center text-slate-400 border-r border-b border-slate-100">{item.id}</td>
                <td className="py-2.5 px-3 text-center text-slate-500 border-r border-b border-slate-100">{item.sort}</td>
                <td className="py-2.5 px-3 font-mono text-slate-700 border-r border-b border-slate-100">{item.deptCode}</td>
                <td className="py-2.5 px-3 font-medium text-slate-800 border-r border-b border-slate-100">{item.deptName}</td>
                <td className="py-2.5 px-3 text-slate-700 border-r border-b border-slate-100">{item.bu}</td>
                <td className="py-2.5 px-3 text-slate-700 border-r border-b border-slate-100">{item.factory}</td>
                <td className="py-2.5 px-3 text-slate-700 border-r border-b border-slate-100">{item.legalEntity}</td>
                <td className="py-2.5 px-3 text-slate-600 border-r border-b border-slate-100">{item.maintainer}</td>
                <td className="py-2.5 px-3 font-mono text-slate-500 border-b border-slate-100">{item.maintainTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination */}
      <div className="shrink-0">
        <ConfigPagination
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          totalRecordsCountText="顯示所有資料計算結果的 5000 列資料"
        />
      </div>
    </div>
  );
};
