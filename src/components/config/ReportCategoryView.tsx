import React, { useState } from 'react';
import { initialReportCategoryData, ReportCategoryRecord } from '../../data/mockConfigData';
import { ConfigPagination } from './ConfigPagination';
import { Plus, Edit2, Trash2, ChevronDown, X } from 'lucide-react';

const identityCodeOptions = [
  { identityCode: 'IG身004', identityType: '間接-正職' },
  { identityCode: 'IG身001', identityType: '間接-正職-新幹班' },
  { identityCode: 'IG身003', identityType: '直接-正職' },
  { identityCode: 'IG身005', identityType: '間接-約聘-按摩師' },
  { identityCode: 'IG身008', identityType: '直接-派遣-時薪' },
  { identityCode: 'IG身006', identityType: '直接-派遣-月薪' },
  { identityCode: 'IG身009', identityType: '間接-派遣-時薪' },
  { identityCode: 'IG身010', identityType: '直接-派遣-假日' },
  { identityCode: 'IG身015', identityType: '直接-約聘-工讀生-時' },
  { identityCode: 'IG身016', identityType: '間接-約聘-工讀生-月' },
  { identityCode: 'IG身023', identityType: '間接-約聘-實習生-時' },
  { identityCode: 'IG身024', identityType: '直接-約聘-實習生-月' },
  { identityCode: 'IG身025', identityType: '間接-約聘-實習生-月' },
  { identityCode: 'IG身026', identityType: '直接-約聘-建考生' },
  { identityCode: 'IG身027', identityType: '間接-約聘-建考生' },
  { identityCode: 'SIYO2', identityType: '外籍移工-正職' },
];

const reportCategoryOptions = [
  { reportCategory: '間接正職', categoryCode: 'RC001' },
  { reportCategory: '直接正職', categoryCode: 'RC002' },
  { reportCategory: '實習工讀', categoryCode: 'RC003' },
  { reportCategory: '派遣', categoryCode: 'RC004' },
  { reportCategory: '外籍移工', categoryCode: 'RC005' },
  { reportCategory: '約聘兼職', categoryCode: 'RC006' },
];

export const ReportCategoryView: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataList, setDataList] = useState<ReportCategoryRecord[]>(initialReportCategoryData);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ReportCategoryRecord | null>(null);
  const [formData, setFormData] = useState({
    identityCode: 'IG身004',
    identityType: '間接-正職',
    reportCategory: '間接正職',
    categoryCode: 'RC001',
    status: true,
  });

  const handleToggleStatus = (id: number) => {
    setDataList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: !item.status } : item))
    );
  };

  const handleDelete = (id: number) => {
    if (window.confirm('確定要刪除此分類配置嗎？')) {
      setDataList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleOpenModal = (item?: ReportCategoryRecord) => {
    if (item) {
      setEditingItem(item);
      const matchedId = identityCodeOptions.find((o) => o.identityCode === item.identityCode);
      const matchedCat = reportCategoryOptions.find((o) => o.reportCategory === item.reportCategory);
      setFormData({
        identityCode: item.identityCode,
        identityType: item.identityType || (matchedId ? matchedId.identityType : ''),
        reportCategory: item.reportCategory,
        categoryCode: item.categoryCode || (matchedCat ? matchedCat.categoryCode : 'RC001'),
        status: item.status !== undefined ? item.status : true,
      });
    } else {
      setEditingItem(null);
      setFormData({
        identityCode: 'IG身004',
        identityType: '間接-正職',
        reportCategory: '間接正職',
        categoryCode: 'RC001',
        status: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.identityCode || !formData.reportCategory) return;

    if (editingItem) {
      setDataList((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                identityCode: formData.identityCode,
                identityType: formData.identityType,
                reportCategory: formData.reportCategory,
                categoryCode: formData.categoryCode,
                status: formData.status,
              }
            : item
        )
      );
    } else {
      const newItem: ReportCategoryRecord = {
        id: Math.max(...dataList.map((d) => d.id), 0) + 1,
        identityCode: formData.identityCode,
        identityType: formData.identityType,
        reportCategory: formData.reportCategory,
        categoryCode: formData.categoryCode,
        status: formData.status,
      };
      setDataList((prev) => [newItem, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col space-y-3 p-1 overflow-hidden">
      {/* Top Controls Bar */}
      <div className="shrink-0 flex items-center justify-between">
        <div className="text-sm font-bold text-slate-700"></div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-1.5 bg-[#2563eb] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center space-x-1.5 cursor-pointer transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>新增分類配置</span>
        </button>
      </div>

      {/* Main Table Container */}
      <div className="flex-1 min-h-0 overflow-auto border border-slate-200 rounded-lg relative">
        <table className="w-full text-left text-[13px] border-separate border-spacing-0 whitespace-nowrap">
          <thead className="bg-[#f8fafc] text-slate-800 font-bold sticky top-0 z-20">
            <tr>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 text-center w-12 bg-[#f8fafc]">序號</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 bg-[#f8fafc]">身分代碼</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 bg-[#f8fafc]">身分別</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 bg-[#f8fafc]">報表分類</th>
              <th className="py-2.5 px-3 border-r border-b border-slate-200 text-center w-20 bg-[#f8fafc]">狀態</th>
              <th className="py-2.5 px-3 border-b border-slate-200 text-center w-24 bg-[#f8fafc]">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100 text-slate-700">
            {dataList.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-2.5 px-3 text-center text-slate-400 border-r border-b border-slate-100">{item.id}</td>
                <td className="py-2.5 px-3 font-mono text-slate-700 border-r border-b border-slate-100">{item.identityCode}</td>
                <td className="py-2.5 px-3 text-slate-800 font-medium border-r border-b border-slate-100">{item.identityType}</td>
                <td className="py-2.5 px-3 text-slate-800 font-medium border-r border-b border-slate-100">{item.reportCategory}</td>
                
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
            <div className="bg-[#2563eb] text-white px-6 py-4 flex items-center justify-between shrink-0">
              <h3 className="text-lg font-bold text-white tracking-wide">分類配置</h3>
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
                
                {/* 身分代碼 */}
                <div>
                  <label className="block text-sm font-normal text-slate-700 mb-1.5">
                    <span className="text-red-500 mr-1">*</span>身分代碼
                  </label>
                  <div className="relative">
                    <select
                      value={formData.identityCode}
                      onChange={(e) => {
                        const val = e.target.value;
                        const matched = identityCodeOptions.find((o) => o.identityCode === val);
                        setFormData({
                          ...formData,
                          identityCode: val,
                          identityType: matched ? matched.identityType : '',
                        });
                      }}
                      className="w-full px-3.5 py-2.5 bg-white border border-blue-500 rounded-xl text-sm text-slate-800 appearance-none pr-9 focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    >
                      {identityCodeOptions.map((opt) => (
                        <option key={opt.identityCode} value={opt.identityCode}>
                          {opt.identityCode}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* 身分別 */}
                <div>
                  <label className="block text-sm font-normal text-slate-700 mb-1.5">
                    身分別
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.identityType}
                    className="w-full px-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-600 font-mono select-none cursor-not-allowed"
                  />
                </div>

                {/* 報表分類 */}
                <div>
                  <label className="block text-sm font-normal text-slate-700 mb-1.5">
                    <span className="text-red-500 mr-1">*</span>報表分類
                  </label>
                  <div className="relative">
                    <select
                      value={formData.reportCategory}
                      onChange={(e) => {
                        const val = e.target.value;
                        const matched = reportCategoryOptions.find((o) => o.reportCategory === val);
                        setFormData({
                          ...formData,
                          reportCategory: val,
                          categoryCode: matched ? matched.categoryCode : 'RC001',
                        });
                      }}
                      className="w-full px-3.5 py-2.5 bg-white border border-blue-500 rounded-xl text-sm text-slate-800 appearance-none pr-9 focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    >
                      {reportCategoryOptions.map((opt) => (
                        <option key={opt.reportCategory} value={opt.reportCategory}>
                          {opt.reportCategory}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* 報表分類代碼 */}
                <div>
                  <label className="block text-sm font-normal text-slate-700 mb-1.5">
                    報表分類代碼
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.categoryCode}
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
