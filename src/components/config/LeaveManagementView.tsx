import React, { useState } from 'react';
import { initialLeaveData, LeaveCategoryRecord, LeaveItemRecord, availableLeaveItemsPool } from '../../data/mockConfigData';
import { ConfigPagination } from './ConfigPagination';
import { Search, Plus, Trash2, ChevronDown, X, Eye, EyeOff, Edit2 } from 'lucide-react';

export const LeaveManagementView: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dataList, setDataList] = useState<LeaveCategoryRecord[]>(initialLeaveData);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<LeaveCategoryRecord | null>(null);
  const [formData, setFormData] = useState<{
    categoryName: string;
    sort: number;
    items: LeaveItemRecord[];
  }>({
    categoryName: '',
    sort: 1,
    items: [],
  });

  // Filter logic
  const filteredData = dataList.filter((cat) => {
    const matchSearch =
      !searchTerm.trim() ||
      cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.items.some((item) => item.itemName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Status filter if needed
    const matchStatus = true;
    return matchSearch && matchStatus;
  });

  // Open modal for Create or Edit
  const handleOpenModal = (category?: LeaveCategoryRecord) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        categoryName: category.categoryName,
        sort: category.sort,
        items: category.items.map((it) => ({ ...it })),
      });
    } else {
      setEditingCategory(null);
      const nextSort = dataList.length > 0 ? Math.max(...dataList.map((d) => d.sort)) + 1 : 1;
      setFormData({
        categoryName: '',
        sort: nextSort,
        items: [
          {
            id: Date.now(),
            itemCode: 'SO002-1',
            itemName: '病假',
            mergeCount: true,
          },
        ],
      });
    }
    setIsModalOpen(true);
  };

  // Delete entire category
  const handleDeleteCategory = (categoryId: number) => {
    if (window.confirm('確定要刪除此假勤類別嗎？')) {
      setDataList((prev) => prev.filter((cat) => cat.id !== categoryId));
      setIsModalOpen(false);
    }
  };

  // Sub-item actions inside modal
  const handleAddItemRow = () => {
    const newItem: LeaveItemRecord = {
      id: Date.now() + Math.random(),
      itemCode: 'SO002-1',
      itemName: availableLeaveItemsPool[0] || '事假',
      mergeCount: true,
    };
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const handleDeleteItemRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleItemChange = (index: number, field: keyof LeaveItemRecord, value: any) => {
    setFormData((prev) => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  const handleToggleMergeCount = (index: number) => {
    setFormData((prev) => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], mergeCount: !newItems[index].mergeCount };
      return { ...prev, items: newItems };
    });
  };

  // Save Modal
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryName.trim()) {
      alert('請輸入假勤類別名稱');
      return;
    }

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

    if (editingCategory) {
      setDataList((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id
            ? {
                ...cat,
                categoryName: formData.categoryName,
                sort: formData.sort,
                maintainTime: nowStr,
                items: formData.items,
              }
            : cat
        )
      );
    } else {
      const newCat: LeaveCategoryRecord = {
        id: Date.now(),
        sort: Number(formData.sort) || 1,
        categoryName: formData.categoryName,
        maintainer: 'IG123156/張三',
        maintainTime: nowStr,
        items: formData.items.length > 0 ? formData.items : [
          { id: Date.now(), itemCode: 'SO002-1', itemName: '-', mergeCount: true }
        ],
      };
      setDataList((prev) => [...prev, newCat]);
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
              placeholder="假勤"
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
          <span>新增假勤類別</span>
        </button>
      </div>

      {/* Main Table Container */}
      <div className="flex-1 min-h-0 overflow-auto border border-slate-200 rounded-lg relative">
        <table className="w-full text-left text-[13px] border-separate border-spacing-0 whitespace-nowrap">
          <thead className="bg-[#f8fafc] text-slate-800 font-bold sticky top-0 z-20">
            <tr>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 text-center w-16 bg-[#f8fafc]">排序</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 bg-[#f8fafc] w-48">假勤類別(大項)</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 bg-[#f8fafc]">假勤項目(小項)</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 bg-[#f8fafc] text-center w-52">
                是否合併於【請假人數】顯示
              </th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 bg-[#f8fafc] w-36">維護人</th>
              <th className="py-2.5 px-3 border-b border-slate-200 bg-[#f8fafc] w-44">維護時間</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100 text-slate-700">
            {filteredData.map((cat) => {
              const rowSpanCount = cat.items.length || 1;
              return cat.items.map((item, itemIdx) => {
                const isFirst = itemIdx === 0;
                return (
                  <tr key={`${cat.id}-${item.id || itemIdx}`} className="hover:bg-slate-50/80 transition-colors group">
                    {/* 排序 */}
                    {isFirst && (
                      <td
                        rowSpan={rowSpanCount}
                        className="py-2.5 px-3 text-center text-slate-600 font-mono border-r border-b border-slate-200 align-middle bg-white"
                      >
                        {cat.sort}
                      </td>
                    )}

                    {/* 假勤類別(大項) */}
                    {isFirst && (
                      <td
                        rowSpan={rowSpanCount}
                        onClick={() => handleOpenModal(cat)}
                        className="py-2.5 px-3 font-semibold text-slate-800 border-r border-b border-slate-200 align-middle bg-white hover:text-blue-600 cursor-pointer transition-colors"
                        title="點擊編輯假勤類別"
                      >
                        <div className="flex items-center justify-between">
                          <span>{cat.categoryName}</span>
                          <Edit2 className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                      </td>
                    )}

                    {/* 假勤項目(小項) */}
                    <td className="py-2.5 px-3 text-slate-700 border-r border-b border-slate-100 font-normal">
                      {item.itemName}
                    </td>

                    {/* 是否合併於【請假人數】顯示 */}
                    <td className="py-2.5 px-3 text-center border-r border-b border-slate-100">
                      {item.mergeCount ? (
                        <span className="text-emerald-600 font-semibold text-xs">是</span>
                      ) : (
                        <span className="text-slate-400 font-normal text-xs">否</span>
                      )}
                    </td>

                    {/* 維護人 */}
                    {isFirst && (
                      <td
                        rowSpan={rowSpanCount}
                        className="py-2.5 px-3 text-slate-600 border-r border-b border-slate-200 align-middle bg-white"
                      >
                        {cat.maintainer}
                      </td>
                    )}

                    {/* 維護時間 */}
                    {isFirst && (
                      <td
                        rowSpan={rowSpanCount}
                        className="py-2.5 px-3 font-mono text-slate-500 border-b border-slate-200 align-middle bg-white"
                      >
                        {cat.maintainTime}
                      </td>
                    )}
                  </tr>
                );
              });
            })}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
            {/* Modal Blue Header */}
            <div className="bg-[#2563eb] text-white px-5 py-3.5 flex items-center justify-between shrink-0">
              <h3 className="text-base font-bold tracking-wide">
                {editingCategory ? '編輯假勤類別' : '新增假勤類別'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 overflow-y-auto flex-1 space-y-5">
              {/* Category Header & Delete Button */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800">假勤類別(大項)</h4>
                  {editingCategory && (
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(editingCategory.id)}
                      className="px-3 py-1 text-xs font-semibold text-rose-500 border border-rose-300 rounded-lg hover:bg-rose-50 hover:border-rose-400 flex items-center space-x-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                      <span>刪除假勤類別</span>
                    </button>
                  )}
                </div>

                {/* Form Inputs Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      <span className="text-rose-500 mr-0.5">*</span>假勤類別
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="請輸入假勤類別"
                      value={formData.categoryName}
                      onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      <span className="text-rose-500 mr-0.5">*</span>排序
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.sort}
                      onChange={(e) => setFormData({ ...formData, sort: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Sub Items Section */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-800">假勤項目(小項)</h4>

                {/* Sub items table */}
                <div className="border border-slate-200 rounded-xl bg-slate-50/50 overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3 text-center w-12">序號</th>
                        <th className="py-2.5 px-3 w-32">假勤項目編碼</th>
                        <th className="py-2.5 px-3">假勤項目</th>
                        <th className="py-2.5 px-3 text-center w-44">
                          是否合併於<br />請假人數顯示
                        </th>
                        <th className="py-2.5 px-3 text-center w-16">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/60 bg-white">
                      {formData.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-2.5 px-3 text-center text-slate-500 font-mono">
                            {idx + 1}
                          </td>
                          <td className="py-2.5 px-3">
                            <input
                              type="text"
                              disabled
                              value={item.itemCode || `SO002-${idx + 1}`}
                              className="w-full bg-slate-100 text-slate-500 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-mono"
                            />
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="relative">
                              <select
                                value={item.itemName}
                                onChange={(e) => handleItemChange(idx, 'itemName', e.target.value)}
                                className="w-full appearance-none bg-white border border-slate-300 rounded-lg px-3 py-1 pr-8 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden cursor-pointer"
                              >
                                {availableLeaveItemsPool.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                                {!availableLeaveItemsPool.includes(item.itemName) && item.itemName && (
                                  <option value={item.itemName}>{item.itemName}</option>
                                )}
                              </select>
                              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2 pointer-events-none" />
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <button
                              type="button"
                              onClick={() => handleToggleMergeCount(idx)}
                              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                                item.mergeCount ? 'bg-[#2563eb]' : 'bg-slate-300'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-flex h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out items-center justify-center ${
                                  item.mergeCount ? 'translate-x-5' : 'translate-x-0'
                                }`}
                              >
                                {item.mergeCount ? (
                                  <Eye className="w-3 h-3 text-[#2563eb]" />
                                ) : (
                                  <EyeOff className="w-3 h-3 text-slate-400" />
                                )}
                              </span>
                            </button>
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <button
                              type="button"
                              onClick={() => handleDeleteItemRow(idx)}
                              className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded cursor-pointer transition-colors"
                              title="刪除項目"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add Item Button */}
                <button
                  type="button"
                  onClick={handleAddItemRow}
                  className="w-full py-2 bg-white hover:bg-blue-50/60 border border-blue-200 text-blue-600 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1 cursor-pointer transition-colors shadow-2xs"
                >
                  <Plus className="w-4 h-4 text-blue-600" />
                  <span>新增項目</span>
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-end space-x-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-1.5 border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 rounded-lg text-xs font-medium cursor-pointer transition-colors"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-1.5 bg-[#2563eb] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-2xs cursor-pointer transition-colors"
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
