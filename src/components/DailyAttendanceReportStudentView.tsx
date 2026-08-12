import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Download, Mail } from 'lucide-react';
import { mockStudentReportRows, StudentReportRow } from '../data/mockDailyReportData';

interface Props {
  onExport?: () => void;
  onSendEmail?: () => void;
}

export const DailyAttendanceReportStudentView: React.FC<Props> = ({ onExport, onSendEmail }) => {
  // Filters state
  const [selectedFactory, setSelectedFactory] = useState('NVD');
  const [selectedDate, setSelectedDate] = useState('2026-08-01');
  const [activeShiftTab, setActiveShiftTab] = useState<'day' | 'night' | 'total'>('day');

  // Search keyword filter
  const [searchTerm, setSearchTerm] = useState('');

  const handleReset = () => {
    setSelectedFactory('NVD');
    setSelectedDate('2026-08-01');
    setActiveShiftTab('day');
    setSearchTerm('');
  };

  // Filtered rows
  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) return mockStudentReportRows;
    const term = searchTerm.toLowerCase();
    return mockStudentReportRows.filter(
      (r) =>
        r.schoolName.toLowerCase().includes(term) ||
        r.deptName.toLowerCase().includes(term) ||
        r.shiftName.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Calculate rowSpans for schoolName
  const schoolRowSpans = useMemo(() => {
    const spans: { [key: number]: number } = {};
    let i = 0;
    while (i < filteredRows.length) {
      const school = filteredRows[i].schoolName;
      let count = 1;
      while (i + count < filteredRows.length && filteredRows[i + count].schoolName === school) {
        count++;
      }
      spans[i] = count;
      i += count;
    }
    return spans;
  }, [filteredRows]);

  // Calculate rowSpans for deptName (within same schoolName)
  const deptRowSpans = useMemo(() => {
    const spans: { [key: number]: number } = {};
    let i = 0;
    while (i < filteredRows.length) {
      const school = filteredRows[i].schoolName;
      const dept = filteredRows[i].deptName;
      let count = 1;
      while (
        i + count < filteredRows.length &&
        filteredRows[i + count].schoolName === school &&
        filteredRows[i + count].deptName === dept
      ) {
        count++;
      }
      spans[i] = count;
      i += count;
    }
    return spans;
  }, [filteredRows]);

  // Summary totals for 合計
  const summaryRow = useMemo(() => {
    return {
      yesterdayOnDuty: 131,
      yesterdayResigned: 56,
      yesterdayNewHired: 56,
      yesterdayOnLeave: 56,
      todayTotal: 230,
      expectedTotal: 230,
      actualTotal: 230,
      extraTotal: 8,
      attendanceRate: '26%',
      absentTruancy: 14,
      leaveUnapproved: 18,
      leaveApproved: 10,
    };
  }, []);

  return (
    <div className="flex-1 min-h-0 flex flex-col space-y-3">
      {/* Top Header & Filters Section */}
      <div className="shrink-0 space-y-3">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            每日出勤報表-學生
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
      </div>

      {/* Main Student Attendance Report Table Container */}
      <div className="flex-1 min-h-0 flex flex-col rounded-xl border border-slate-200/80 overflow-hidden">
        <div className="flex-1 overflow-auto relative w-full h-full">
          <table className="w-full text-[13px] text-center border-separate border-spacing-0">
            {/* Table Header */}
            <thead className="bg-[#f1f5f9] sticky top-0 z-20 shadow-xs text-slate-700 font-bold">
              {/* Header Row 1 */}
              <tr className="bg-[#f1f5f9]">
                <th
                  rowSpan={2}
                  className="px-3 py-2.5 bg-[#f1f5f9] min-w-[120px] border-r border-b border-slate-300"
                >
                  學校
                </th>
                <th
                  rowSpan={2}
                  className="px-3 py-2.5 bg-[#f1f5f9] min-w-[150px] border-r border-b border-slate-300"
                >
                  科系
                </th>
                <th
                  rowSpan={2}
                  className="px-3 py-2.5 bg-[#f1f5f9] min-w-[110px] border-r border-b border-slate-300"
                >
                  班型名稱
                </th>
                <th
                  rowSpan={2}
                  className="px-3 py-2.5 bg-[#f1f5f9] min-w-[80px] border-r border-b border-slate-300"
                >
                  昨日在職
                </th>

                {/* 昨日異動 Group */}
                <th colSpan={3} className="px-3 py-1.5 bg-[#f1f5f9] border-r border-b border-slate-300">
                  昨日異動
                </th>

                {/* 今日在職 Group */}
                <th className="px-3 py-1.5 bg-[#f1f5f9] border-r border-b border-slate-300 min-w-[70px]">
                  今日在職
                </th>

                {/* 應到人數 Group */}
                <th className="px-3 py-1.5 bg-[#f1f5f9] border-r border-b border-slate-300 min-w-[70px]">
                  應到人數
                </th>

                {/* 實到人數 Group */}
                <th className="px-3 py-1.5 bg-[#f1f5f9] border-r border-b border-slate-300 min-w-[70px]">
                  實到人數
                </th>

                {/* 額外出勤 Group */}
                <th className="px-3 py-1.5 bg-[#f1f5f9] border-r border-b border-slate-300 min-w-[70px]">
                  額外出勤
                </th>

                {/* 出勤率 Group */}
                <th className="px-3 py-1.5 bg-[#f1f5f9] border-r border-b border-slate-300 min-w-[70px]">
                  出勤率
                </th>

                {/* 缺勤 Standalone column */}
                <th rowSpan={2} className="px-3 py-1.5 bg-[#f1f5f9] min-w-[60px] border-r border-b border-slate-300">
                  缺勤
                </th>

                {/* 缺勤分佈 Group */}
                <th colSpan={3} className="px-3 py-1.5 bg-[#f1f5f9] border-r border-b border-slate-300">
                  缺勤分佈
                </th>
              </tr>

              {/* Header Row 2 */}
              <tr className="text-[11px] font-semibold text-slate-600 bg-[#f8fafc]">
                {/* 昨日異動 */}
                <th className="px-2 py-1.5 min-w-[50px] bg-[#f8fafc] border-r border-b border-slate-300">離職</th>
                <th className="px-2 py-1.5 min-w-[50px] bg-[#f8fafc] border-r border-b border-slate-300">新進</th>
                <th className="px-2 py-1.5 min-w-[50px] bg-[#f8fafc] border-r border-b border-slate-300">留停</th>

                {/* 今日在職 */}
                <th className="px-2 py-1.5 min-w-[60px] bg-[#f8fafc] border-r border-b border-slate-300">總人數</th>

                {/* 應到人數 */}
                <th className="px-2 py-1.5 min-w-[60px] bg-[#f8fafc] border-r border-b border-slate-300">總人數</th>

                {/* 實到人數 */}
                <th className="px-2 py-1.5 min-w-[60px] bg-[#f8fafc] border-r border-b border-slate-300">總人數</th>

                {/* 額外出勤 */}
                <th className="px-2 py-1.5 min-w-[60px] bg-[#f8fafc] border-r border-b border-slate-300">總人數</th>

                {/* 出勤率 */}
                <th className="px-2 py-1.5 min-w-[60px] bg-[#f8fafc] border-r border-b border-slate-300">總人數</th>

                {/* 缺勤分佈 */}
                <th className="px-2 py-1.5 min-w-[50px] bg-[#f8fafc] border-r border-b border-slate-300">曠職</th>
                <th className="px-2 py-1.5 min-w-[100px] bg-[#f8fafc] border-r border-b border-slate-300">請假<br />(未簽核完成)</th>
                <th className="px-2 py-1.5 min-w-[100px] bg-[#f8fafc] border-r border-b border-slate-300">請假<br />(已簽核完成)</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-slate-700 font-medium bg-white">
              {/* 合計 Summary Row */}
              <tr className="bg-[#fffbeb] font-bold text-slate-900 hover:bg-[#fef3c7] transition-colors">
                <td colSpan={3} className="px-3 py-2 text-center bg-[#fffbeb] border-r border-b border-amber-300">
                  合計
                </td>
                <td className="px-3 py-2 border-r border-b border-amber-300 font-mono">
                  {summaryRow.yesterdayOnDuty}
                </td>

                {/* 昨日異動 */}
                <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.yesterdayResigned}</td>
                <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.yesterdayNewHired}</td>
                <td className="px-2 py-2 border-r border-b border-amber-200">{summaryRow.yesterdayOnLeave}</td>

                {/* 今日在職 */}
                <td className="px-2 py-2 font-bold text-rose-600 border-r border-b border-amber-200">{summaryRow.todayTotal}</td>

                {/* 應到人數 */}
                <td className="px-2 py-2 font-bold text-rose-600 border-r border-b border-amber-200">{summaryRow.expectedTotal}</td>

                {/* 實到人數 */}
                <td className="px-2 py-2 font-bold text-rose-600 border-r border-b border-amber-200">{summaryRow.actualTotal}</td>

                {/* 額外出勤 */}
                <td className="px-2 py-2 font-bold text-rose-600 border-r border-b border-amber-200">{summaryRow.extraTotal}</td>

                {/* 出勤率 */}
                <td className="px-2 py-2 font-bold text-rose-600 border-r border-b border-amber-200">{summaryRow.attendanceRate}</td>

                {/* 缺勤 */}
                <td className="px-2 py-2 font-bold border-r border-b border-amber-200">{summaryRow.absentTruancy}</td>

                {/* 缺勤分佈 */}
                <td className="px-2 py-2 font-bold text-rose-600 border-r border-b border-amber-200">{summaryRow.absentTruancy}</td>
                <td className="px-2 py-2 font-bold text-rose-600 border-r border-b border-amber-200">{summaryRow.leaveUnapproved}</td>
                <td className="px-2 py-2 font-bold border-r border-b border-amber-200">{summaryRow.leaveApproved}</td>
              </tr>

              {/* Data Rows */}
              {filteredRows.map((row, index) => {
                const schoolSpan = schoolRowSpans[index];
                const deptSpan = deptRowSpans[index];

                return (
                  <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors group">
                    {/* 學校 RowSpan */}
                    {schoolSpan ? (
                      <td
                        rowSpan={schoolSpan}
                        className="px-3 py-2 bg-white group-hover:bg-[#f8fafc] border-r border-b border-slate-200 text-center align-middle font-semibold text-slate-800"
                      >
                        {row.schoolName}
                      </td>
                    ) : null}

                    {/* 科系 RowSpan */}
                    {deptSpan ? (
                      <td
                        rowSpan={deptSpan}
                        className="px-3 py-2 bg-white group-hover:bg-[#f8fafc] border-r border-b border-slate-200 text-left align-middle"
                      >
                        {row.deptName}
                      </td>
                    ) : null}

                    {/* 班型名稱 */}
                    <td className="px-3 py-2 border-r border-b border-slate-200 text-center">
                      {row.shiftName}
                    </td>

                    {/* 昨日在職 */}
                    <td className="px-3 py-2 font-mono border-r border-b border-slate-200">
                      {row.yesterdayOnDuty}
                    </td>

                    {/* 昨日異動 */}
                    <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.yesterdayResigned}</td>
                    <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.yesterdayNewHired}</td>
                    <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.yesterdayOnLeave}</td>

                    {/* 今日在職 */}
                    <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.todayTotal}</td>

                    {/* 應到人數 */}
                    <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.expectedTotal}</td>

                    {/* 實到人數 */}
                    <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.actualTotal}</td>

                    {/* 額外出勤 */}
                    <td className="px-2 py-2 font-mono border-r border-b border-slate-200">
                      {row.extraTotal !== '-' && row.extraTotal !== 0 ? (
                        <span className="text-rose-600 font-bold">{row.extraTotal}</span>
                      ) : (
                        row.extraTotal
                      )}
                    </td>

                    {/* 出勤率 */}
                    <td className="px-2 py-2 font-mono border-r border-b border-slate-200">{row.attendanceRate}</td>

                    {/* 缺勤 */}
                    <td className="px-2 py-2 font-mono border-r border-b border-slate-200">
                      {row.absentTruancy !== '-' && row.absentTruancy !== 0 ? (
                        <span className="text-rose-600 font-bold">{row.absentTruancy}</span>
                      ) : (
                        row.absentTruancy
                      )}
                    </td>

                    {/* 缺勤分佈 */}
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
