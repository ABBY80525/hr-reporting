import React, { useState } from 'react';
import { initialFloorData, FloorRecord } from '../../data/mockConfigData';
import { ConfigPagination } from './ConfigPagination';
import { Search, Plus, Edit2, Trash2, ChevronDown, X } from 'lucide-react';

export const FloorView: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dataList, setDataList] = useState<FloorRecord[]>(initialFloorData);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FloorRecord | null>(null);
  const [formData, setFormData] = useState({
    sort: '' as number | string,
    code: 'BS00001',
    name: '',
    category: 'OFFLINE' as 'ONLINE' | 'OFFLINE',
    status: true,
    maintainer: 'IG123156/張三'
  });

  const filteredData = dataList.filter((item) => {
    const matchSearch =
      !searchTerm.trim() ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = !categoryFilter || item.category === categoryFilter;
    const matchStatus =
      !statusFilter ||
      (statusFilter === '啟用' && item.status) ||
      (statusFilter === '停用' && !item.status);
    return matchSearch && matchCategory && matchStatus;
  });

  const handleToggleStatus = (id: number) => {
    setDataList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: !item.status } : item))
    );
  };

  const handleDelete = (id: number) => {
    if (window.confirm('確定要刪除此樓層設定嗎？')) {
      setDataList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleOpenModal = (item?: FloorRecord) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        sort: item.sort,
        code: item.code,
        name: item.name,
        category: item.category,
        status: item.status,
        maintainer: item.maintainer
      });
    } else {
      setEditingItem(null);
      const nextNum = dataList.length + 1;
      setFormData({
        sort: '',
        code: `BS${nextNum.toString().padStart(5, '0')}`,
        name: '',
        category: 'OFFLINE',
        status: true,
        maintainer: 'IG123156/張三'
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

    if (editingItem) {
      setDataList((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                sort: Number(formData.sort) || 1,
                code: formData.code,
                name: formData.name,
                category: formData.category,
                status: formData.status,
                maintainer: formData.maintainer,
                maintainTime: nowStr
              }
            : item
        )
      );
    } else {
      const newItem: FloorRecord = {
        id: Math.max(...dataList.map((d) => d.id), 0) + 1,
        sort: Number(formData.sort) || 10,
        code: formData.code,
        name: formData.name,
        category: formData.category,
        status: formData.status,
        maintainer: formData.maintainer,
        maintainTime: nowStr
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
          {/* 分類 Dropdown */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none bg-white border border-slate-300 rounded-lg px-3 py-1.5 pr-8 text-xs text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">分類</option>
              <option value="ONLINE">ONLINE</option>
              <option value="OFFLINE">OFFLINE</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

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
              placeholder="樓層編碼 / 名稱"
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
          <span>新增樓層</span>
        </button>
      </div>

      {/* Main Table Container */}
      <div className="flex-1 min-h-0 overflow-auto border border-slate-200 rounded-lg relative">
        <table className="w-full text-left text-[13px] border-separate border-spacing-0 whitespace-nowrap">
          <thead className="bg-[#f8fafc] text-slate-800 font-bold sticky top-0 z-20">
            <tr>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 text-center w-12 bg-[#f8fafc]">序號</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 text-center w-12 bg-[#f8fafc]">排序</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 bg-[#f8fafc]">樓層編碼</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 bg-[#f8fafc]">樓層名稱</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 text-center bg-[#f8fafc]">對應分類</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 bg-[#f8fafc]">維護人</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 bg-[#f8fafc]">維護時間</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 text-center w-20 bg-[#f8fafc]">狀態</th>
              <th className="py-2.5 px-3 border-b border-slate-200 text-center w-24 bg-[#f8fafc]">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100 text-slate-700">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-2.5 px-3 text-center text-slate-400 border-r border-b border-slate-100">{item.id}</td>
                <td className="py-2.5 px-3 text-center text-slate-500 border-r border-b border-slate-100">{item.sort}</td>
                <td className="py-2.5 px-3 font-mono text-slate-700 border-r border-b border-slate-100">{item.code}</td>
                <td className="py-2.5 px-3 text-slate-800 font-medium border-r border-b border-slate-100">{item.name}</td>
                
                {/* Category Badge */}
                <td className="py-2.5 px-3 text-center border-r border-b border-slate-100">
                  {item.category === 'ONLINE' ? (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-emerald-300 bg-emerald-50 text-emerald-600 tracking-wider">
                      ONLINE
                    </span>
                  ) : (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-slate-300 bg-white text-slate-700 tracking-wider shadow-2xs">
                      OFFLINE
                    </span>
                  )}
                </td>

                <td className="py-2.5 px-3 text-slate-600 border-r border-b border-slate-100">{item.maintainer}</td>
                <td className="py-2.5 px-3 font-mono text-slate-500 border-r border-b border-slate-100">{item.maintainTime}</td>

                {/* Status Switch Toggle */}
                <td className="py-2.5 px-3 text-center border-r border-b border-slate-100">
                  <button
                    onClick={() => handleToggleStatus(item.id)}
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
                      onClick={() => handleDelete(item.id)}
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
            <div className="bg-[#2563eb] text-white px-5 py-3.5 flex items-center justify-between shrink-0">
              <h3 className="text-base font-bold text-white tracking-wide">
                {editingItem ? '編輯製造樓層' : '新增製造樓層'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-white/90 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSave} className="flex flex-col">
              <div className="p-5 space-y-4">
                {/* 樓層編碼 */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    樓層編碼
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 focus:outline-hidden focus:border-blue-500 font-mono"
                  />
                </div>

                {/* 樓層名稱 */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    <span className="text-red-500 mr-1">*</span>樓層名稱
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：S_X-RAY/P_X-RAY"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* 排序 */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    <span className="text-red-500 mr-1">*</span>排序
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：10"
                    value={formData.sort}
                    onChange={(e) => setFormData({ ...formData, sort: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* 對應分類 */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    <span className="text-red-500 mr-1">*</span>對應分類
                  </label>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as 'ONLINE' | 'OFFLINE' })}
                      className="w-full appearance-none px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer pr-9"
                    >
                      <option value="OFFLINE">OFFLINE</option>
                      <option value="ONLINE">ONLINE</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                </div>

                {/* 啟用/停用 */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
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
              <div className="bg-[#f8fafc] px-5 py-3.5 border-t border-slate-100 flex items-center justify-end space-x-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-medium cursor-pointer shadow-2xs transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-[#2563eb] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer transition-colors"
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
