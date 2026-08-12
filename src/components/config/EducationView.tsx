import React, { useState } from 'react';
import { initialEducationData, EducationRecord } from '../../data/mockConfigData';
import { ConfigPagination } from './ConfigPagination';
import { Search, Plus, Edit2, Trash2, ChevronDown, X } from 'lucide-react';

const rawEduOptions = [
  { rawName: '二專', code: '2' },
  { rawName: '二年制', code: '1' },
  { rawName: '三專', code: '3' },
  { rawName: '五專', code: '5' },
  { rawName: '四技', code: '6' },
  { rawName: '學士', code: 'B' },
  { rawName: '二技', code: 'C' },
  { rawName: '博士', code: 'D' },
  { rawName: '高中（普通科）', code: 'H' },
  { rawName: '國中/附設國中部', code: 'J' },
  { rawName: '碩士', code: 'M' },
  { rawName: '綜合高中部', code: 'P' },
  { rawName: '高職（職業科）', code: 'V' },
  { rawName: '4+X', code: 'X' },
  { rawName: '國小', code: 'EE' },
  { rawName: '附設進修部', code: 'A' },
  { rawName: '延教班/實用技能班', code: 'E' },
];

const mappedEduOptions = [
  { mappedEdu: '專科', eduCode: 'E04' },
  { mappedEdu: '大學', eduCode: 'E03' },
  { mappedEdu: '碩士', eduCode: 'E02' },
  { mappedEdu: '博士', eduCode: 'E01' },
  { mappedEdu: '高中職', eduCode: 'E05' },
  { mappedEdu: '國中', eduCode: 'E06' },
  { mappedEdu: '國小', eduCode: 'E07' },
  { mappedEdu: '—', eduCode: 'E00' },
];

export const EducationView: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dataList, setDataList] = useState<EducationRecord[]>(initialEducationData);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EducationRecord | null>(null);
  const [formData, setFormData] = useState({
    rawName: '二專',
    code: '2',
    mappedEdu: '專科',
    eduCode: 'E04',
    status: true,
  });

  const filteredData = dataList.filter((item) => {
    const matchSearch =
      !searchTerm.trim() ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.rawName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mappedEdu.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      !statusFilter ||
      (statusFilter === '啟用' && item.status) ||
      (statusFilter === '停用' && !item.status);
    return matchSearch && matchStatus;
  });

  const handleToggleStatus = (code: string) => {
    setDataList((prev) =>
      prev.map((item) => (item.code === code ? { ...item, status: !item.status } : item))
    );
  };

  const handleDelete = (code: string) => {
    if (window.confirm(`確定要刪除學歷配置【${code}】嗎？`)) {
      setDataList((prev) => prev.filter((item) => item.code !== code));
    }
  };

  const handleOpenModal = (item?: EducationRecord) => {
    if (item) {
      setEditingItem(item);
      const matchedRaw = rawEduOptions.find((r) => r.code === item.code || r.rawName === item.rawName);
      const matchedEdu = mappedEduOptions.find((m) => m.mappedEdu === item.mappedEdu);
      setFormData({
        rawName: item.rawName,
        code: item.code,
        mappedEdu: item.mappedEdu,
        eduCode: item.eduCode || (matchedEdu ? matchedEdu.eduCode : 'E04'),
        status: item.status,
      });
    } else {
      setEditingItem(null);
      setFormData({
        rawName: '二專',
        code: '2',
        mappedEdu: '專科',
        eduCode: 'E04',
        status: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.rawName || !formData.code) return;

    if (editingItem) {
      setDataList((prev) =>
        prev.map((item) =>
          item.code === editingItem.code
            ? {
                ...item,
                rawName: formData.rawName,
                code: formData.code,
                mappedEdu: formData.mappedEdu,
                eduCode: formData.eduCode,
                status: formData.status,
              }
            : item
        )
      );
    } else {
      const newItem: EducationRecord = {
        code: formData.code,
        rawName: formData.rawName,
        mappedEdu: formData.mappedEdu,
        eduCode: formData.eduCode,
        status: formData.status,
      };
      setDataList((prev) => [newItem, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col space-y-3 p-1 overflow-hidden">
      {/* Top Controls Bar */}
      <div className="shrink-0 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Left Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 狀態 Dropdown */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white border border-slate-300 rounded-lg px-3 py-1.5 pr-8 text-xs text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">狀態</option>
              <option value="啟用">啟用</option>
              <option value="停用">停用</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* Search Input */}
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="原始學歷代碼/名稱"
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

        {/* Right Action Button */}
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-1.5 bg-[#2563eb] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center space-x-1.5 cursor-pointer transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>新增學歷配置</span>
        </button>
      </div>

      {/* Main Table Container */}
      <div className="flex-1 min-h-0 overflow-auto border border-slate-200 rounded-lg relative">
        <table className="w-full text-left text-[13px] border-separate border-spacing-0 whitespace-nowrap">
          <thead className="bg-[#f8fafc] text-slate-800 font-bold sticky top-0 z-20">
            <tr>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 bg-[#f8fafc]">原始學歷代碼</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 bg-[#f8fafc]">原始學歷名稱</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 bg-[#f8fafc]">學歷</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 text-center w-20 bg-[#f8fafc]">狀態</th>
              <th className="py-2.5 px-3 border-b border-slate-200 text-center w-24 bg-[#f8fafc]">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100 text-slate-700">
            {filteredData.map((item) => (
              <tr key={item.code} className="hover:bg-slate-50 transition-colors">
                <td className="py-2.5 px-3 font-mono text-slate-700 border-r border-b border-slate-100">{item.code}</td>
                <td className="py-2.5 px-3 text-slate-800 font-medium border-r border-b border-slate-100">{item.rawName}</td>
                <td className="py-2.5 px-3 text-slate-800 border-r border-b border-slate-100">{item.mappedEdu}</td>

                {/* Status Switch Toggle */}
                <td className="py-2.5 px-3 text-center border-r border-b border-slate-100">
                  <button
                    onClick={() => handleToggleStatus(item.code)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                      item.status ? 'bg-[#2563eb]' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                        item.status ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </td>

                {/* Operations */}
                <td className="py-2.5 px-3 text-center border-b border-slate-100">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded cursor-pointer transition-colors"
                      title="編輯"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.code)}
                      className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded cursor-pointer transition-colors"
                      title="刪除"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
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
        />
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#2563eb] text-white px-6 py-4 flex items-center justify-between shrink-0">
              <h3 className="text-lg font-bold text-white tracking-wide">學歷配置</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-white/90 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="flex flex-col flex-1">
              <div className="p-6 space-y-4 text-sm">
                
                {/* 原始學歷名稱 */}
                <div>
                  <label className="block text-sm font-normal text-slate-700 mb-1.5">
                    <span className="text-red-500 mr-1">*</span>原始學歷名稱
                  </label>
                  <div className="relative">
                    <select
                      value={formData.rawName}
                      onChange={(e) => {
                        const val = e.target.value;
                        const matched = rawEduOptions.find((o) => o.rawName === val);
                        setFormData({
                          ...formData,
                          rawName: val,
                          code: matched ? matched.code : ''
                        });
                      }}
                      className="w-full px-3.5 py-2.5 bg-white border border-blue-500 rounded-xl text-sm text-slate-800 appearance-none pr-9 focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    >
                      {rawEduOptions.map((opt) => (
                        <option key={opt.rawName} value={opt.rawName}>
                          {opt.rawName}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* 原始學歷代碼 */}
                <div>
                  <label className="block text-sm font-normal text-slate-700 mb-1.5">
                    原始學歷代碼
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.code}
                    className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-600 font-mono select-none cursor-not-allowed"
                  />
                </div>

                {/* 學歷 */}
                <div>
                  <label className="block text-sm font-normal text-slate-700 mb-1.5">
                    <span className="text-red-500 mr-1">*</span>學歷
                  </label>
                  <div className="relative">
                    <select
                      value={formData.mappedEdu}
                      onChange={(e) => {
                        const val = e.target.value;
                        const matched = mappedEduOptions.find((o) => o.mappedEdu === val);
                        setFormData({
                          ...formData,
                          mappedEdu: val,
                          eduCode: matched ? matched.eduCode : ''
                        });
                      }}
                      className="w-full px-3.5 py-2.5 bg-white border border-blue-500 rounded-xl text-sm text-slate-800 appearance-none pr-9 focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    >
                      {mappedEduOptions.map((opt) => (
                        <option key={opt.mappedEdu} value={opt.mappedEdu}>
                          {opt.mappedEdu}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* 學歷代碼 */}
                <div>
                  <label className="block text-sm font-normal text-slate-700 mb-1.5">
                    學歷代碼
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.eduCode}
                    className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-600 font-mono select-none cursor-not-allowed"
                  />
                </div>

                {/* 啟用/停用 */}
                <div>
                  <label className="block text-sm font-normal text-slate-700 mb-1.5">
                    <span className="text-red-500 mr-1">*</span>啟用/停用
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: !formData.status })}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-hidden ${
                      formData.status ? 'bg-[#2563eb]' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                        formData.status ? 'translate-x-5' : 'translate-x-0.5'
                      } my-0.5`}
                    />
                  </button>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="bg-[#f8fafc] px-6 py-4 border-t border-slate-100 flex items-center justify-end space-x-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium cursor-pointer shadow-2xs transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#2563eb] hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-xs cursor-pointer transition-colors"
                >
                  {editingItem ? '儲存' : '新增'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

