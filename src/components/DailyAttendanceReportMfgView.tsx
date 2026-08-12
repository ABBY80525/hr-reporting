import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Download, Mail, Eye, EyeOff } from 'lucide-react';
import { mockMfgReportRows, MfgReportRow } from '../data/mockDailyReportData';

interface CategoryVisibility {
  indirectRegular: boolean; // 間接正職
  directRegular: boolean;   // 直接正職
  foreignWorker: boolean;   // 外籍移工
  internStudent: boolean;   // 實習工讀
  dispatchWorker: boolean;  // 派遣
}

interface Props {
  onExport?: () => void;
  onSendEmail?: () => void;
}

export const DailyAttendanceReportMfgView: React.FC<Props> = ({ onExport, onSendEmail }) => {
  // Filters state
  const [selectedFactory, setSelectedFactory] = useState('NVD');
  const [selectedDate, setSelectedDate] = useState('2026-08-01');
  const [activeShiftTab, setActiveShiftTab] = useState<'day' | 'night' | 'total'>('day');

  // Category column toggles
  const [visibleCategories, setVisibleCategories] = useState<CategoryVisibility>({
    indirectRegular: true,
    directRegular: true,
    foreignWorker: true,
    internStudent: true,
    dispatchWorker: true,
  });

  // Show/hide 缺勤分佈與出差
  const [showAbsenceAndTrip, setShowAbsenceAndTrip] = useState(true);

  // Search keyword filter
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggleCategory = (key: keyof CategoryVisibility) => {
    setVisibleCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleReset = () => {
    setSelectedFactory('NVD');
    setSelectedDate('2026-08-01');
    setActiveShiftTab('day');
    setVisibleCategories({
      indirectRegular: true,
      directRegular: true,
      foreignWorker: true,
      internStudent: true,
      dispatchWorker: true,
    });
    setShowAbsenceAndTrip(true);
    setSearchTerm('');
  };

  // Filtered rows by search
  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) return mockMfgReportRows;
    const term = searchTerm.toLowerCase();
    return mockMfgReportRows.filter(
      (r) =>
        r.category.toLowerCase().includes(term) ||
        r.floorName.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Compute rowSpans for Category column
  const categoryRowSpans = useMemo(() => {
    const spans: { [key: number]: number } = {};
    let i = 0;
    while (i < filteredRows.length) {
      const cat = filteredRows[i].category;
      let count = 1;
      while (i + count < filteredRows.length && filteredRows[i + count].category === cat) {
        count++;
      }
      spans[i] = count;
      i += count;
    }
    return spans;
  }, [filteredRows]);

  // Number of active sub-columns under each category group (plus 總人數)
  const categoryColSpan = useMemo(() => {
    let count = 0;
    if (visibleCategories.indirectRegular) count++;
    if (visibleCategories.directRegular) count++;
    if (visibleCategories.foreignWorker) count++;
    if (visibleCategories.internStudent) count++;
    if (visibleCategories.dispatchWorker) count++;
    return count + 1; // + 1 for 總人數
  }, [visibleCategories]);

  // Calculate 合計 Summary row
  const summaryRow = useMemo(() => {
    return {
      yesterdayOnDuty: 131,
      yesterdayResigned: 56,
      yesterdayNewHired: 56,
      yesterdayOnLeave: 56,
      todayOnDuty: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 230 },
      expectedPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 230 },
      actualPresent: { indirectRegular: 26, directRegular: 26, foreignWorker: 26, internStudent: 26, dispatchWorker: 26, total: 230 },
      extraPresent: { indirectRegular: '-', directRegular: 3, foreignWorker: 2, internStudent: 3, dispatchWorker: '-', total: 8 },
      attendanceRate: { indirectRegular: '26%', directRegular: '26%', foreignWorker: '26%', internStudent: '26%', dispatchWorker: '26%', total: '26%' },
      absentTruancy: 14,
      leaveUnapproved: 18,
      leaveApproved: 10,
      domesticTrip: 10,
      overseasTrip: 10,
      outApplication: 10,
    };
  }, []);

  return (
    <div className="flex-1 min-h-0 flex flex-col space-y-3">
      {/* Top Header & Filters Section */}
      <div className="shrink-0 space-y-3">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            每日出勤報表-製造
          </h1>

          {/* Top Actions: Factory Select, Date Picker, Search, Refresh, Export, Send Email */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Factory Select */}
            <select
              value={selectedFactory}
              onChange={(e) => setSelectedFactory(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              <option value="NVD">NVD</option>
              <option value="ALL">全部廠部</option>
              <option value="SMT">SMT廠</option>
              <option value="ASSY">ASSY廠</option>
            </select>

            {/* Date Picker */}
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono font-medium text-slate-700 shadow-2xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />

            {/* Search Button */}
            <button
              onClick={() => {}}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center space-x-1.5 cursor-pointer transition-all"
            >
              <Search className="w-3.5 h-3.5" />
              <span>搜尋</span>
            </button>

            {/* Refresh Button */}
            <button
              onClick={handleReset}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center space-x-1.5 cursor-pointer transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重新整理</span>
            </button>

            {/* Export & Email Buttons */}
            <div className="flex items-center space-x-2 ml-auto lg:ml-2">
              <button
                onClick={onExport}
                className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center space-x-1.5 cursor-pointer transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>導出報表</span>
              </button>

              <button
                onClick={onSendEmail}
                className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center space-x-1.5 cursor-pointer transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>發送郵件</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sub Tabs: 今日日班 / 今日夜班 / 今日日班&昨日夜班總計 */}
        <div className="border-b border-slate-200 flex items-center space-x-6 text-xs font-bold pt-1">
          <button
            onClick={() => setActiveShiftTab('day')}
            className={`pb-2 transition-all cursor-pointer border-b-2 ${
              activeShiftTab === 'day'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            今日日班
          </button>
          <button
            onClick={() => setActiveShiftTab('night')}
            className={`pb-2 transition-all cursor-pointer border-b-2 ${
              activeShiftTab === 'night'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            今日夜班
          </button>
          <button
            onClick={() => setActiveShiftTab('total')}
            className={`pb-2 transition-all cursor-pointer border-b-2 ${
              activeShiftTab === 'total'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            今日日班&昨日夜班總計
          </button>
        </div>

        {/* Category Toggle Checkboxes & Show/Hide Absence & Trip Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs py-1">
          {/* Category Checkboxes */}
          <div className="flex flex-wrap items-center space-x-4 font-semibold text-slate-700">
            <label className="flex items-center space-x-1.5 cursor-pointer select-none hover:text-blue-600">
              <input
                type="checkbox"
                checked={visibleCategories.indirectRegular}
                onChange={() => handleToggleCategory('indirectRegular')}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
              />
              <span>間接正職</span>
            </label>

            <label className="flex items-center space-x-1.5 cursor-pointer select-none hover:text-blue-600">
              <input
                type="checkbox"
                checked={visibleCategories.directRegular}
                onChange={() => handleToggleCategory('directRegular')}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
              />
              <span>直接正職</span>
            </label>

            <label className="flex items-center space-x-1.5 cursor-pointer select-none hover:text-blue-600">
              <input
                type="checkbox"
                checked={visibleCategories.foreignWorker}
                onChange={() => handleToggleCategory('foreignWorker')}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
              />
              <span>外籍移工</span>
            </label>

            <label className="flex items-center space-x-1.5 cursor-pointer select-none hover:text-blue-600">
              <input
                type="checkbox"
                checked={visibleCategories.internStudent}
                onChange={() => handleToggleCategory('internStudent')}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
              />
              <span>實習工讀</span>
            </label>

            <label className="flex items-center space-x-1.5 cursor-pointer select-none hover:text-blue-600">
              <input
                type="checkbox"
                checked={visibleCategories.dispatchWorker}
                onChange={() => handleToggleCategory('dispatchWorker')}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
              />
              <span>派遣</span>
            </label>
          </div>

          {/* Right Toggle Button: 顯示/隱藏缺勤分佈與出差 */}
          <button
            onClick={() => setShowAbsenceAndTrip(!showAbsenceAndTrip)}
            className="flex items-center space-x-1.5 text-blue-600 hover:text-blue-800 font-semibold cursor-pointer transition-colors"
          >
            {showAbsenceAndTrip ? (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span>隱藏缺勤分佈與出差</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>顯示缺勤分佈與出差</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Wide Attendance Report Table Container */}
      <div className="flex-1 min-h-0 flex flex-col rounded-xl border border-slate-200/80 overflow-hidden">
        <div className="flex-1 overflow-auto relative w-full h-full">
          <table className="w-full text-[13px] text-center border-separate border-spacing-0">
            {/* Table Header */}
            <thead className="bg-[#f1f5f9] sticky top-0 z-20 shadow-xs text-slate-700 font-bold">
              <tr className="bg-[#f1f5f9]">
                <th
                  rowSpan={2}
                  className="px-3 py-2.5 bg-[#f1f5f9] min-w-[70px] sticky left-0 z-30 border-r border-b border-slate-300"
                >
                  分類
                </th>
                <th
                  rowSpan={2}
                  className="px-3 py-2.5 bg-[#f1f5f9] min-w-[130px] sticky left-[70px] z-30 border-r border-b border-slate-300"
                >
                  樓層名稱
                </th>
                <th
                  rowSpan={2}
                  className="px-3 py-2.5 bg-[#f1f5f9] min-w-[80px] sticky left-[200px] z-30 border-r border-b border-slate-300"
                >
                  昨日在職
                </th>

                {/* 昨日異動 Group */}
                <th colSpan={3} className="px-3 py-1.5 bg-[#f1f5f9] border-r border-b border-slate-300">
                  昨日異動
                </th>

                {/* 今日在職 Group */}
                <th colSpan={categoryColSpan} className="px-3 py-1.5 bg-[#f1f5f9] border-r border-b border-slate-300">
                  今日在職
                </th>

                {/* 應到人數 Group */}
                <th colSpan={categoryColSpan} className="px-3 py-1.5 bg-[#f1f5f9] border-r border-b border-slate-300">
                  應到人數
                </th>

                {/* 實到人數 Group (Shown when showAbsenceAndTrip is true) */}
                {showAbsenceAndTrip && (
                  <th colSpan={categoryColSpan} className="px-3 py-1.5 bg-[#f1f5f9] border-r border-b border-slate-300">
                    實到人數
                  </th>
                )}

                {/* 額外出勤 Group (Shown when showAbsenceAndTrip is true) */}
                {showAbsenceAndTrip && (
                  <th colSpan={categoryColSpan} className="px-3 py-1.5 bg-[#f1f5f9] border-r border-b border-slate-300">
                    額外出勤
                  </th>
                )}

                {/* 出勤率 Group (Shown when showAbsenceAndTrip is true) */}
                {showAbsenceAndTrip && (
                  <th colSpan={categoryColSpan} className="px-3 py-1.5 bg-[#f1f5f9] border-r border-b border-slate-300">
                    出勤率
                  </th>
                )}

                {/* 缺勤 Group (Shown when showAbsenceAndTrip is true) */}
                {showAbsenceAndTrip && (
                  <th rowSpan={2} className="px-3 py-1.5 bg-[#f1f5f9] min-w-[60px] border-r border-b border-slate-300">
                    缺勤
                  </th>
                )}

                {/* 缺勤分佈 Group (Shown when showAbsenceAndTrip is true) */}
                {showAbsenceAndTrip && (
                  <th colSpan={3} className="px-3 py-1.5 bg-[#f1f5f9] border-r border-b border-slate-300">
                    缺勤分佈
                  </th>
                )}

                {/* 出差 Group (Shown when showAbsenceAndTrip is true) */}
                {showAbsenceAndTrip && (
                  <th colSpan={3} className="px-3 py-1.5 bg-[#f1f5f9] border-r border-b border-slate-300">
                    出差
                  </th>
                )}
              </tr>

              {/* Row 2: Sub-column Titles */}
              <tr className="text-[11px] font-semibold text-slate-600 bg-[#f8fafc]">
                {/* 昨日異動 */}
                <th className="px-2 py-1.5 min-w-[50px] bg-[#f8fafc] border-r border-b border-slate-300">離職</th>
                <th className="px-2 py-1.5 min-w-[50px] bg-[#f8fafc] border-r border-b border-slate-300">新進</th>
                <th className="px-2 py-1.5 min-w-[50px] bg-[#f8fafc] border-r border-b border-slate-300">留停</th>

                {/* 今日在職 Sub-columns */}
                {visibleCategories.indirectRegular && <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">間接正職</th>}
                {visibleCategories.directRegular && <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">直接正職</th>}
                {visibleCategories.foreignWorker && <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">外籍移工</th>}
                {visibleCategories.internStudent && <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">實習工讀</th>}
                {visibleCategories.dispatchWorker && <th className="px-2 py-1.5 min-w-[50px] bg-[#f8fafc] border-r border-b border-slate-300">派遣</th>}
                <th className="px-2 py-1.5 min-w-[55px] font-bold bg-[#e2e8f0] border-r border-b border-slate-300">總人數</th>

                {/* 應到人數 Sub-columns */}
                {visibleCategories.indirectRegular && <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">間接正職</th>}
                {visibleCategories.directRegular && <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">直接正職</th>}
                {visibleCategories.foreignWorker && <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">外籍移工</th>}
                {visibleCategories.internStudent && <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">實習工讀</th>}
                {visibleCategories.dispatchWorker && <th className="px-2 py-1.5 min-w-[50px] bg-[#f8fafc] border-r border-b border-slate-300">派遣</th>}
                <th className="px-2 py-1.5 min-w-[55px] font-bold bg-[#e2e8f0] border-r border-b border-slate-300">總人數</th>

                {/* 實到人數 Sub-columns */}
                {showAbsenceAndTrip && (
                  <>
                    {visibleCategories.indirectRegular && <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">間接正職</th>}
                    {visibleCategories.directRegular && <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">直接正職</th>}
                    {visibleCategories.foreignWorker && <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">外籍移工</th>}
                    {visibleCategories.internStudent && <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">實習工讀</th>}
                    {visibleCategories.dispatchWorker && <th className="px-2 py-1.5 min-w-[50px] bg-[#f8fafc] border-r border-b border-slate-300">派遣</th>}
                    <th className="px-2 py-1.5 min-w-[55px] font-bold bg-[#e2e8f0] border-r border-b border-slate-300">總人數</th>
                  </>
                )}

                {/* 額外出勤 Sub-columns */}
                {showAbsenceAndTrip && (
                  <>
                    {visibleCategories.indirectRegular && <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">間接正職</th>}
                    {visibleCategories.directRegular && <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">直接正職</th>}
                    {visibleCategories.foreignWorker && <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">外籍移工</th>}
                    {visibleCategories.internStudent && <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">實習工讀</th>}
                    {visibleCategories.dispatchWorker && <th className="px-2 py-1.5 min-w-[50px] bg-[#f8fafc] border-r border-b border-slate-300">派遣</th>}
                    <th className="px-2 py-1.5 min-w-[55px] font-bold bg-[#e2e8f0] border-r border-b border-slate-300">總人數</th>
                  </>
                )}

                {/* 出勤率 Sub-columns */}
                {showAbsenceAndTrip && (
                  <>
                    {visibleCategories.indirectRegular && <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">間接正職</th>}
                    {visibleCategories.directRegular && <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">直接正職</th>}
                    {visibleCategories.foreignWorker && <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">外籍移工</th>}
                    {visibleCategories.internStudent && <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">實習工讀</th>}
                    {visibleCategories.dispatchWorker && <th className="px-2 py-1.5 min-w-[50px] bg-[#f8fafc] border-r border-b border-slate-300">派遣</th>}
                    <th className="px-2 py-1.5 min-w-[55px] font-bold bg-[#e2e8f0] border-r border-b border-slate-300">總人數</th>
                  </>
                )}

                {/* 缺勤分佈 Sub-columns */}
                {showAbsenceAndTrip && (
                  <>
                    <th className="px-2 py-1.5 min-w-[50px] bg-[#f8fafc] border-r border-b border-slate-300">曠職</th>
                    <th className="px-2 py-1.5 min-w-[100px] bg-[#f8fafc] border-r border-b border-slate-300">請假<br />(未簽核完成)</th>
                    <th className="px-2 py-1.5 min-w-[100px] bg-[#f8fafc] border-r border-b border-slate-300">請假<br />(已簽核完成)</th>
                  </>
                )}

                {/* 出差 Sub-columns */}
                {showAbsenceAndTrip && (
                  <>
                    <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">國內出差</th>
                    <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">國外出差</th>
                    <th className="px-2 py-1.5 min-w-[65px] bg-[#f8fafc] border-r border-b border-slate-300">外出申請</th>
                  </>
                )}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-slate-700 font-medium bg-white">
              {/* 合計 Row */}
              <tr className="bg-[#fffbeb] font-bold text-slate-900 hover:bg-[#fef3c7] transition-colors">
                <td className="px-3 py-2 sticky left-0 z-10 bg-[#fffbeb] border-r border-b border-amber-300 shadow-r">
                  合計
                </td>
                <td className="px-3 py-2 sticky left-[70px] z-10 bg-[#fffbeb] border-r border-b border-amber-300 shadow-r"></td>
                <td className="px-3 py-2 sticky left-[200px] z-10 bg-[#fffbeb] border-r border-b border-amber-300 shadow-r">
                  {summaryRow.yesterdayOnDuty}
                </td>

                {/* 昨日異動 合計 */}
                <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.yesterdayResigned}</td>
                <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.yesterdayNewHired}</td>
                <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.yesterdayOnLeave}</td>

                {/* 今日在職 合計 */}
                {visibleCategories.indirectRegular && <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.todayOnDuty.indirectRegular}</td>}
                {visibleCategories.directRegular && <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.todayOnDuty.directRegular}</td>}
                {visibleCategories.foreignWorker && <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.todayOnDuty.foreignWorker}</td>}
                {visibleCategories.internStudent && <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.todayOnDuty.internStudent}</td>}
                {visibleCategories.dispatchWorker && <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.todayOnDuty.dispatchWorker}</td>}
                <td className="px-2 py-2 font-bold text-rose-600 bg-[#fef3c7] border-r border-b border-amber-200">{summaryRow.todayOnDuty.total}</td>

                {/* 應到人數 合計 */}
                {visibleCategories.indirectRegular && <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.expectedPresent.indirectRegular}</td>}
                {visibleCategories.directRegular && <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.expectedPresent.directRegular}</td>}
                {visibleCategories.foreignWorker && <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.expectedPresent.foreignWorker}</td>}
                {visibleCategories.internStudent && <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.expectedPresent.internStudent}</td>}
                {visibleCategories.dispatchWorker && <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.expectedPresent.dispatchWorker}</td>}
                <td className="px-2 py-2 font-bold text-rose-600 bg-[#fef3c7] border-r border-b border-amber-200">{summaryRow.expectedPresent.total}</td>

                {/* 實到人數 合計 */}
                {showAbsenceAndTrip && (
                  <>
                    {visibleCategories.indirectRegular && <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.actualPresent.indirectRegular}</td>}
                    {visibleCategories.directRegular && <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.actualPresent.directRegular}</td>}
                    {visibleCategories.foreignWorker && <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.actualPresent.foreignWorker}</td>}
                    {visibleCategories.internStudent && <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.actualPresent.internStudent}</td>}
                    {visibleCategories.dispatchWorker && <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.actualPresent.dispatchWorker}</td>}
                    <td className="px-2 py-2 font-bold text-rose-600 bg-[#fef3c7] border-r border-b border-amber-200">{summaryRow.actualPresent.total}</td>
                  </>
                )}

                {/* 額外出勤 合計 */}
                {showAbsenceAndTrip && (
                  <>
                    {visibleCategories.indirectRegular && <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.extraPresent.indirectRegular}</td>}
                    {visibleCategories.directRegular && <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.extraPresent.directRegular}</td>}
                    {visibleCategories.foreignWorker && <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.extraPresent.foreignWorker}</td>}
                    {visibleCategories.internStudent && <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.extraPresent.internStudent}</td>}
                    {visibleCategories.dispatchWorker && <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.extraPresent.dispatchWorker}</td>}
                    <td className="px-2 py-2 font-bold text-rose-600 bg-[#fef3c7] border-r border-b border-amber-200">{summaryRow.extraPresent.total}</td>
                  </>
                )}

                {/* 出勤率 合計 */}
                {showAbsenceAndTrip && (
                  <>
                    {visibleCategories.indirectRegular && <td className="px-2 py-2 text-rose-600 font-bold border-r border-b border-amber-200">{summaryRow.attendanceRate.indirectRegular}</td>}
                    {visibleCategories.directRegular && <td className="px-2 py-2 text-rose-600 font-bold border-r border-b border-amber-200">{summaryRow.attendanceRate.directRegular}</td>}
                    {visibleCategories.foreignWorker && <td className="px-2 py-2 text-rose-600 font-bold border-r border-b border-amber-200">{summaryRow.attendanceRate.foreignWorker}</td>}
                    {visibleCategories.internStudent && <td className="px-2 py-2 text-rose-600 font-bold border-r border-b border-amber-200">{summaryRow.attendanceRate.internStudent}</td>}
                    {visibleCategories.dispatchWorker && <td className="px-2 py-2 text-rose-600 font-bold border-r border-b border-amber-200">{summaryRow.attendanceRate.dispatchWorker}</td>}
                    <td className="px-2 py-2 font-bold text-rose-600 bg-[#fef3c7] border-r border-b border-amber-200">{summaryRow.attendanceRate.total}</td>
                  </>
                )}

                {/* 缺勤 合計 */}
                {showAbsenceAndTrip && (
                  <td className="px-2 py-2 font-bold text-rose-600 border-r border-b border-amber-200">{summaryRow.absentTruancy}</td>
                )}

                {/* 缺勤分佈 合計 */}
                {showAbsenceAndTrip && (
                  <>
                    <td className="px-2 py-2 font-bold text-rose-600 border-r border-b border-amber-200">{summaryRow.absentTruancy}</td>
                    <td className="px-2 py-2 font-bold text-rose-600 border-r border-b border-amber-200">{summaryRow.leaveUnapproved}</td>
                    <td className="px-2 py-2 font-bold border-r border-b border-amber-200">{summaryRow.leaveApproved}</td>
                  </>
                )}

                {/* 出差 合計 */}
                {showAbsenceAndTrip && (
                  <>
                    <td className="px-2 py-2 font-bold border-r border-b border-amber-200">{summaryRow.domesticTrip}</td>
                    <td className="px-2 py-2 font-bold border-r border-b border-amber-200">{summaryRow.overseasTrip}</td>
                    <td className="px-2 py-2 font-bold border-r border-b border-amber-200">{summaryRow.outApplication}</td>
                  </>
                )}
              </tr>

              {/* Data Rows */}
              {filteredRows.map((row, index) => {
                const categorySpan = categoryRowSpans[index];
                return (
                  <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors group">
                    {/* Category Column (RowSpanned) */}
                    {categorySpan ? (
                      <td
                        rowSpan={categorySpan}
                        className={`px-2 py-2 sticky left-0 z-10 border-r border-b border-slate-200 shadow-r text-center align-middle ${
                          row.category === 'ONLINE' ? 'bg-[#e6f8f0]' : 'bg-[#f8fafc]'
                        }`}
                      >
                        <div
                          className={`inline-block text-[11px] tracking-wider uppercase font-extrabold ${
                            row.category === 'ONLINE'
                              ? 'text-[#00D492]'
                              : 'text-[#334155]'
                          }`}
                          style={{ writingMode: 'vertical-lr' }}
                        >
                          {row.category}
                        </div>
                      </td>
                    ) : null}

                    {/* 樓層名稱 */}
                    <td className="px-3 py-2 sticky left-[70px] z-10 bg-white group-hover:bg-[#f8fafc] border-r border-b border-slate-200 shadow-r text-left font-medium">
                      {row.floorName}
                    </td>

                    {/* 昨日在職 */}
                    <td className="px-3 py-2 sticky left-[200px] z-10 bg-white group-hover:bg-[#f8fafc] border-r border-b border-slate-200 shadow-r font-mono">
                      {row.yesterdayOnDuty}
                    </td>

                    {/* 昨日異動 */}
                    <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.yesterdayResigned}</td>
                    <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.yesterdayNewHired}</td>
                    <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.yesterdayOnLeave}</td>

                    {/* 今日在職 */}
                    {visibleCategories.indirectRegular && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.todayOnDuty.indirectRegular}</td>}
                    {visibleCategories.directRegular && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.todayOnDuty.directRegular}</td>}
                    {visibleCategories.foreignWorker && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.todayOnDuty.foreignWorker}</td>}
                    {visibleCategories.internStudent && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.todayOnDuty.internStudent}</td>}
                    {visibleCategories.dispatchWorker && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.todayOnDuty.dispatchWorker}</td>}
                    <td className="px-2 py-2 font-mono font-bold bg-[#f8fafc] border-r border-b border-slate-200">{row.todayOnDuty.total}</td>

                    {/* 應到人數 */}
                    {visibleCategories.indirectRegular && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.expectedPresent.indirectRegular}</td>}
                    {visibleCategories.directRegular && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.expectedPresent.directRegular}</td>}
                    {visibleCategories.foreignWorker && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.expectedPresent.foreignWorker}</td>}
                    {visibleCategories.internStudent && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.expectedPresent.internStudent}</td>}
                    {visibleCategories.dispatchWorker && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.expectedPresent.dispatchWorker}</td>}
                    <td className="px-2 py-2 font-mono font-bold bg-[#f8fafc] border-r border-b border-slate-200">{row.expectedPresent.total}</td>

                    {/* 實到人數 */}
                    {showAbsenceAndTrip && (
                      <>
                        {visibleCategories.indirectRegular && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.actualPresent.indirectRegular}</td>}
                        {visibleCategories.directRegular && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.actualPresent.directRegular}</td>}
                        {visibleCategories.foreignWorker && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.actualPresent.foreignWorker}</td>}
                        {visibleCategories.internStudent && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.actualPresent.internStudent}</td>}
                        {visibleCategories.dispatchWorker && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.actualPresent.dispatchWorker}</td>}
                        <td className="px-2 py-2 font-mono font-bold bg-[#f8fafc] border-r border-b border-slate-200">{row.actualPresent.total}</td>
                      </>
                    )}

                    {/* 額外出勤 */}
                    {showAbsenceAndTrip && (
                      <>
                        {visibleCategories.indirectRegular && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.extraPresent.indirectRegular}</td>}
                        {visibleCategories.directRegular && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.extraPresent.directRegular}</td>}
                        {visibleCategories.foreignWorker && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.extraPresent.foreignWorker}</td>}
                        {visibleCategories.internStudent && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.extraPresent.internStudent}</td>}
                        {visibleCategories.dispatchWorker && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.extraPresent.dispatchWorker}</td>}
                        <td className="px-2 py-2 font-mono font-bold bg-[#f8fafc] border-r border-b border-slate-200">
                          {row.extraPresent.total !== '-' && row.extraPresent.total !== 0 ? (
                            <span className="text-rose-600">{row.extraPresent.total}</span>
                          ) : (
                            row.extraPresent.total
                          )}
                        </td>
                      </>
                    )}

                    {/* 出勤率 */}
                    {showAbsenceAndTrip && (
                      <>
                        {visibleCategories.indirectRegular && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.attendanceRate.indirectRegular}</td>}
                        {visibleCategories.directRegular && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.attendanceRate.directRegular}</td>}
                        {visibleCategories.foreignWorker && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.attendanceRate.foreignWorker}</td>}
                        {visibleCategories.internStudent && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.attendanceRate.internStudent}</td>}
                        {visibleCategories.dispatchWorker && <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.attendanceRate.dispatchWorker}</td>}
                        <td className="px-2 py-2 font-mono font-bold bg-[#f8fafc] border-r border-b border-slate-200">{row.attendanceRate.total}</td>
                      </>
                    )}

                    {/* 缺勤 */}
                    {showAbsenceAndTrip && (
                      <td className="px-2 py-2 font-mono border-r border-b border-slate-200">
                        {row.absentTruancy !== '-' && row.absentTruancy !== 0 ? (
                          <span className="text-rose-600 font-bold">{row.absentTruancy}</span>
                        ) : (
                          row.absentTruancy
                        )}
                      </td>
                    )}

                    {/* 缺勤分佈 */}
                    {showAbsenceAndTrip && (
                      <>
                        <td className="px-2 py-2 font-mono border-r border-b border-slate-200">
                          {row.absentTruancy !== '-' && row.absentTruancy !== 0 ? (
                            <span className="text-rose-600 font-bold">{row.absentTruancy}</span>
                          ) : (
                            row.absentTruancy
                          )}
                        </td>
                        <td className="px-2 py-2 font-mono border-r border-b border-slate-200">
                          {row.leaveUnapproved !== '-' && row.leaveUnapproved !== 0 ? (
                            <span className="text-rose-600 font-bold">{row.leaveUnapproved}</span>
                          ) : (
                            row.leaveUnapproved
                          )}
                        </td>
                        <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.leaveApproved}</td>
                      </>
                    )}

                    {/* 出差 */}
                    {showAbsenceAndTrip && (
                      <>
                        <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.domesticTrip}</td>
                        <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.overseasTrip}</td>
                        <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.outApplication}</td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination Bar */}
        <div className="shrink-0 bg-white border-t border-slate-200 px-4 py-2.5 flex items-center justify-end text-xs text-slate-500 font-medium">
          <div className="flex items-center space-x-1">
            <button className="px-2 py-1 rounded border border-slate-200 hover:bg-slate-100 transition-colors disabled:opacity-40">
              &lt;
            </button>
            <button className="px-2.5 py-1 rounded bg-blue-600 text-white font-bold">1</button>
            <button className="px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-100 transition-colors">2</button>
            <button className="px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-100 transition-colors">3</button>
            <button className="px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-100 transition-colors">4</button>
            <button className="px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-100 transition-colors">5</button>
            <span className="px-1 text-slate-400">...</span>
            <button className="px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-100 transition-colors">99</button>
            <button className="px-2 py-1 rounded border border-slate-200 hover:bg-slate-100 transition-colors">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
