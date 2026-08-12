import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AttendanceTable } from './components/AttendanceTable';
import { DashboardView } from './components/DashboardView';
import { DailyAttendanceReportView } from './components/DailyAttendanceReportView';
import { DailyAttendanceReportMfgView } from './components/DailyAttendanceReportMfgView';
import { DailyAttendanceReportStudentView } from './components/DailyAttendanceReportStudentView';
import { ExportModal } from './components/ExportModal';
import { EmailModal } from './components/EmailModal';
import { ConfigManagementView } from './components/ConfigManagementView';
import { SystemManagementView } from './components/SystemManagementView';

import { initialAttendanceRecords } from './data/mockData';
import { SubMenuItem } from './types';
import { Search, RotateCcw, Download, Mail } from 'lucide-react';

export default function App() {
  const [activeSubMenu, setActiveSubMenu] = useState<SubMenuItem>('每日出勤報表');
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);

  // Filtered records by keyword search
  const filteredRecords = useMemo(() => {
    if (!searchTerm.trim()) return initialAttendanceRecords;
    const term = searchTerm.toLowerCase();
    return initialAttendanceRecords.filter((record) => {
      return (
        record.empId.toLowerCase().includes(term) ||
        record.name.toLowerCase().includes(term) ||
        record.deptName.toLowerCase().includes(term) ||
        record.deptCode.toLowerCase().includes(term)
      );
    });
  }, [searchTerm]);

  const handleResetFilters = () => {
    setSearchTerm('');
  };

  const isDailyReportPage = [
    '每日出勤報表',
    '每日出勤報表-製造',
    '每日出勤報表-學生'
  ].includes(activeSubMenu);

  const isConfigPage = [
    '組織配置',
    '班型管理',
    '樓層管理',
    '學歷管理',
    '報表分類',
    '假別管理',
    '郵件管理'
  ].includes(activeSubMenu);

  const isSystemPage = [
    '功能清單',
    '用戶管理',
    '角色配置',
    '人員角色',
    '系統配置'
  ].includes(activeSubMenu);

  return (
    <div className="h-screen overflow-hidden bg-slate-50 flex flex-col text-slate-800 font-sans antialiased">
      {/* Top Header */}
      <Header
        onHomeClick={() => setActiveSubMenu('每日出勤報表')}
        activeSubMenu={activeSubMenu}
      />

      {/* Main Container */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeSubMenu={activeSubMenu}
          onSelectSubMenu={(item) => setActiveSubMenu(item)}
        />

        {/* Right Main Content */}
        <main className="flex-1 p-5 min-h-0 flex flex-col min-w-0 overflow-hidden">
          
          {/* 0. DASHBOARD PAGE */}
          {activeSubMenu === 'DASHBOARD' && (
            <DashboardView onNavigate={(item) => setActiveSubMenu(item)} />
          )}

          {/* 1. DAILY ATTENDANCE SUMMARY REPORT PAGES */}
          {activeSubMenu === '每日出勤報表' && (
            <DailyAttendanceReportView
              onExport={() => setIsExportOpen(true)}
              onSendEmail={() => setIsEmailOpen(true)}
            />
          )}

          {activeSubMenu === '每日出勤報表-製造' && (
            <DailyAttendanceReportMfgView
              onExport={() => setIsExportOpen(true)}
              onSendEmail={() => setIsEmailOpen(true)}
            />
          )}

          {activeSubMenu === '每日出勤報表-學生' && (
            <DailyAttendanceReportStudentView
              onExport={() => setIsExportOpen(true)}
              onSendEmail={() => setIsEmailOpen(true)}
            />
          )}

          {/* 2. EMPLOYEE DETAILS REPORT PAGE */}
          {activeSubMenu === '在職員工明細' && (
            <div className="flex-1 min-h-0 flex flex-col space-y-4">
              {/* Page Title */}
              <div className="shrink-0 flex items-center justify-between">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  在職員工明細報表
                </h1>
              </div>

              {/* Top Search & Actions Bar */}
              <div className="shrink-0 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                {/* Search Input & Main Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="搜尋工號/姓名"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>

                  {/* 搜尋 Button (Blue) */}
                  <button
                    onClick={() => {}}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center space-x-1.5 cursor-pointer transition-all"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>搜尋</span>
                  </button>

                  {/* 重新整理 Button */}
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center space-x-1.5 cursor-pointer transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>重新整理</span>
                  </button>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsExportOpen(true)}
                    className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center space-x-1.5 cursor-pointer transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>導出報表</span>
                  </button>

                  <button
                    onClick={() => setIsEmailOpen(true)}
                    className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center space-x-1.5 cursor-pointer transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>發送郵件</span>
                  </button>
                </div>
              </div>

              {/* Attendance Data Table */}
              <AttendanceTable records={filteredRecords} />
            </div>
          )}

          {/* 3. CONFIGURATION MANAGEMENT PAGES */}
          {isConfigPage && (
            <ConfigManagementView title={activeSubMenu} />
          )}

          {/* 4. SYSTEM MANAGEMENT PAGES */}
          {isSystemPage && (
            <SystemManagementView title={activeSubMenu} />
          )}

        </main>
      </div>

      {/* Modals */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        records={filteredRecords}
      />

      <EmailModal
        isOpen={isEmailOpen}
        onClose={() => setIsEmailOpen(false)}
        records={filteredRecords}
      />
    </div>
  );
}
