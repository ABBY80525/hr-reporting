import React, { useState, useMemo } from 'react';
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  AlertTriangle,
  TrendingUp,
  Building2,
  GraduationCap,
  Factory,
  ArrowUpRight,
  Filter,
  Calendar,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { SubMenuItem } from '../types';

interface DashboardViewProps {
  onNavigate: (item: SubMenuItem) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  // Global dashboard filter states
  const [selectedFactory, setSelectedFactory] = useState('NVD');
  const [selectedDate, setSelectedDate] = useState('2026-08-01');
  const [activeShiftTab, setActiveShiftTab] = useState<'day' | 'night' | 'total'>('day');

  // Colors for charts
  const COLORS = {
    primary: '#2563eb',     // Blue
    success: '#10b981',     // Emerald
    warning: '#f59e0b',     // Amber
    danger: '#ef4444',      // Rose
    purple: '#8b5cf6',      // Purple
    indigo: '#6366f1',      // Indigo
    cyan: '#06b6d4',        // Cyan
    slate: '#64748b',       // Slate
    lightBlue: '#3b82f6',
  };

  // 1. 三大報表整體當日出勤比較 (每日出勤報表 vs 製造 vs 學生)
  const reportComparisonData = useMemo(() => {
    return [
      {
        name: '部門整體 (每日出勤報表)',
        expected: 2350,
        actual: 2260,
        extra: 18,
        absent: 90,
        rate: 96.2,
      },
      {
        name: '製造樓層 (每日出勤報表-製造)',
        expected: 1850,
        actual: 1770,
        extra: 12,
        absent: 80,
        rate: 95.7,
      },
      {
        name: '建教合作 (每日出勤報表-學生)',
        expected: 520,
        actual: 495,
        extra: 8,
        absent: 25,
        rate: 95.2,
      },
    ];
  }, []);

  // 2. 製造處 (ONLINE vs OFFLINE) 身分別人力結構 (Stacked Bar)
  const mfgCategoryStructureData = useMemo(() => {
    return [
      {
        group: 'ONLINE (線上線別)',
        indirectRegular: 208, // 間接正職
        directRegular: 350,   // 直接正職
        foreignWorker: 420,   // 外籍移工
        internStudent: 280,   // 實習工讀
        dispatchWorker: 110,  // 派遣
      },
      {
        group: 'OFFLINE (線下輔助)',
        indirectRegular: 180,
        directRegular: 120,
        foreignWorker: 150,
        internStudent: 90,
        dispatchWorker: 45,
      },
    ];
  }, []);

  // 3. 缺勤與請假原因當日分佈 (Donut / Pie)
  const absenceBreakdownData = useMemo(() => {
    return [
      { name: '請假 (已簽核完成)', value: 75, color: '#3b82f6' },
      { name: '請假 (未簽核完成)', value: 42, color: '#f59e0b' },
      { name: '曠職 (異常缺勤)', value: 18, color: '#ef4444' },
      { name: '國內出差', value: 12, color: '#10b981' },
      { name: '國外出差', value: 8, color: '#8b5cf6' },
      { name: '外出申請', value: 15, color: '#06b6d4' },
    ];
  }, []);

  // 4. 合作院校學生出勤與缺勤分析 (Bar Chart)
  const studentSchoolData = useMemo(() => {
    return [
      { school: '勤益科大', expected: 210, actual: 202, absent: 8, rate: 96.2 },
      { school: '育達科大', expected: 160, actual: 153, absent: 7, rate: 95.6 },
      { school: '中華大學', expected: 150, actual: 140, absent: 10, rate: 93.3 },
    ];
  }, []);

  // 5. 製造處重點樓層/線別當日實到與缺勤 Top 8 (Horizontal Bar)
  const floorAttendanceData = useMemo(() => {
    return [
      { floor: '1-1 Google線長', expected: 251, actual: 242, absent: 9, rate: 96.4 },
      { floor: '1-2 ASSY線長', expected: 251, actual: 245, absent: 6, rate: 97.6 },
      { floor: '1-2 PF線長', expected: 251, actual: 238, absent: 13, rate: 94.8 },
      { floor: '1-2 X-RAY線長', expected: 251, actual: 241, absent: 10, rate: 96.0 },
      { floor: 'PCB_OPEN', expected: 251, actual: 236, absent: 15, rate: 94.0 },
      { floor: '1-2重工', expected: 158, actual: 151, absent: 7, rate: 95.5 },
    ];
  }, []);

  // 6. 班別當日人力分佈 (Day vs Night Shift)
  const shiftDistributionData = useMemo(() => {
    return [
      { shift: '今日日班', expected: 2200, actual: 2120, extra: 18, rate: 96.3 },
      { shift: '今日夜班', expected: 1180, actual: 1125, extra: 10, rate: 95.3 },
      { shift: '中班/輪班', expected: 70, actual: 68, extra: 0, rate: 97.1 },
    ];
  }, []);

  return (
    <div className="flex-1 min-h-0 flex flex-col space-y-4 overflow-y-auto pr-1 pb-6">
      {/* 1. Header & Filters Row */}
      <div className="shrink-0 p-1 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Title & Subtitle */}
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              當日出勤數據分析看板
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              即時連動分析
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            綜合「每日出勤報表」、「每日出勤報表-製造」與「每日出勤報表-學生」之當日出勤率與人力分佈圖表
          </p>
        </div>

        {/* Global Filters & Shift Selector */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Factory Select */}
          <div className="flex items-center space-x-1.5 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs">
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-500 font-semibold">廠部:</span>
            <select
              value={selectedFactory}
              onChange={(e) => setSelectedFactory(e.target.value)}
              className="bg-transparent font-bold text-slate-800 focus:outline-hidden cursor-pointer"
            >
              <option value="NVD">NVD</option>
              <option value="ALL">全部廠部</option>
              <option value="SMT">SMT廠</option>
              <option value="ASSY">ASSY廠</option>
            </select>
          </div>

          {/* Date Picker */}
          <div className="flex items-center space-x-1.5 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent font-mono font-bold text-slate-800 focus:outline-hidden cursor-pointer"
            />
          </div>

          {/* Shift Segmented Control */}
          <div className="flex items-center bg-slate-200/70 p-1 rounded-lg text-xs font-bold text-slate-600 border border-slate-200">
            <button
              onClick={() => setActiveShiftTab('day')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                activeShiftTab === 'day'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'hover:text-slate-900'
              }`}
            >
              今日日班
            </button>
            <button
              onClick={() => setActiveShiftTab('night')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                activeShiftTab === 'night'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'hover:text-slate-900'
              }`}
            >
              今日夜班
            </button>
            <button
              onClick={() => setActiveShiftTab('total')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                activeShiftTab === 'total'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'hover:text-slate-900'
              }`}
            >
              今日日班&昨日夜班總計
            </button>
          </div>
        </div>
      </div>

      {/* Quick Report Navigation Bar */}
      <div className="shrink-0 flex items-center justify-between bg-blue-50/80 border border-blue-100 rounded-xl px-4 py-2.5 text-xs">
        <span className="font-semibold text-slate-700 flex items-center space-x-1.5">
          <Filter className="w-3.5 h-3.5 text-blue-600" />
          <span>快速導向各維度當日詳細報表：</span>
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigate('每日出勤報表')}
            className="px-3 py-1 bg-white hover:bg-blue-600 hover:text-white border border-blue-200 rounded-lg font-bold text-blue-700 shadow-2xs transition-all flex items-center space-x-1 cursor-pointer"
          >
            <span>每日出勤報表</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('每日出勤報表-製造')}
            className="px-3 py-1 bg-white hover:bg-emerald-600 hover:text-white border border-emerald-200 rounded-lg font-bold text-emerald-700 shadow-2xs transition-all flex items-center space-x-1 cursor-pointer"
          >
            <Factory className="w-3.5 h-3.5" />
            <span>每日出勤報表-製造</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('每日出勤報表-學生')}
            className="px-3 py-1 bg-white hover:bg-purple-600 hover:text-white border border-purple-200 rounded-lg font-bold text-purple-700 shadow-2xs transition-all flex items-center space-x-1 cursor-pointer"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>每日出勤報表-學生</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards (6 Key Attendance Metrics) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 shrink-0">
        {/* Card 1: 當日總在職 */}
        <div className="bg-slate-100/80 rounded-xl p-3.5 relative overflow-hidden border border-slate-200/60">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">當日總在職</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-black text-slate-900 font-mono">3,450</span>
            <span className="text-[10px] font-bold text-emerald-600">人</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-medium">昨日: 3,438 人 (+12人)</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-b-xl" />
        </div>

        {/* Card 2: 今日應到人數 */}
        <div className="bg-slate-100/80 rounded-xl p-3.5 relative overflow-hidden border border-slate-200/60">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">今日應到人數</span>
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-black text-slate-900 font-mono">3,380</span>
            <span className="text-[10px] font-bold text-indigo-600">人</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-medium">排班覆蓋率: 98.0%</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500 rounded-b-xl" />
        </div>

        {/* Card 3: 今日實到人數 */}
        <div className="bg-slate-100/80 rounded-xl p-3.5 relative overflow-hidden border border-slate-200/60">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">今日實到人數</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-black text-emerald-600 font-mono">3,245</span>
            <span className="text-[10px] font-bold text-emerald-600">人</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-medium">包含支援/現場出勤</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-b-xl" />
        </div>

        {/* Card 4: 全廠出勤率 */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">全廠綜合出勤率</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-black text-blue-600 font-mono">96.0%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '96.0%' }} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-b-xl" />
        </div>

        {/* Card 5: 當日缺勤人數 */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">當日缺勤人數</span>
            <UserX className="w-4 h-4 text-rose-600" />
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-black text-rose-600 font-mono">135</span>
            <span className="text-[10px] font-bold text-rose-600">人</span>
          </div>
          <p className="text-[11px] text-rose-500 mt-1 font-medium">曠職 18人 / 請假 117人</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-rose-500 rounded-b-xl" />
        </div>

        {/* Card 6: 額外出勤 / 加班 */}
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">額外出勤/支援</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-black text-amber-600 font-mono">28</span>
            <span className="text-[10px] font-bold text-amber-600">人</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-medium">製造 18人 / 學生 10人</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 rounded-b-xl" />
        </div>
      </div>

      {/* 3. Charts Section - Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        
        {/* Chart 1: 三大出勤報表類別比較 (Composed Chart) */}
        <div className="bg-slate-100/60 rounded-xl border border-slate-200/50 p-4 flex flex-col h-[320px]">
          <div className="flex items-center justify-between mb-3 shrink-0">
            <div>
              <h2 className="text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>三大報表當日應到 vs 實到 vs 出勤率</span>
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">跨部門、製造樓層、學生建教對比</p>
            </div>
            <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              綜合數據
            </span>
          </div>

          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={reportComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" domain={[90, 100]} tick={{ fontSize: 10, fill: '#10b981' }} unit="%" axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', fontSize: '11px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  formatter={(value: any, name: any) => [name === '出勤率' ? `${value}%` : `${value} 人`, name]}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar yAxisId="left" dataKey="expected" name="應到人數" fill="#93c5fd" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar yAxisId="left" dataKey="actual" name="實到人數" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={20} />
                <Line yAxisId="right" type="monotone" dataKey="rate" name="出勤率" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: 製造處 ONLINE vs OFFLINE 身分別人力結構 (Stacked Bar) */}
        <div className="bg-slate-100/60 rounded-xl border border-slate-200/50 p-4 flex flex-col h-[320px]">
          <div className="flex items-center justify-between mb-3 shrink-0">
            <div>
              <h2 className="text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>製造處 (ONLINE / OFFLINE) 身分別結構</span>
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">正職、移工、實習生、派遣當日分佈</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              製造報表
            </span>
          </div>

          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mfgCategoryStructureData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="group" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }} />
                <Bar dataKey="indirectRegular" name="間接正職" stackId="a" fill="#3b82f6" barSize={36} />
                <Bar dataKey="directRegular" name="直接正職" stackId="a" fill="#10b981" />
                <Bar dataKey="foreignWorker" name="外籍移工" stackId="a" fill="#f59e0b" />
                <Bar dataKey="internStudent" name="實習工讀" stackId="a" fill="#8b5cf6" />
                <Bar dataKey="dispatchWorker" name="派遣" stackId="a" fill="#64748b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: 當日缺勤與假別原因佔比 (Donut Chart) */}
        <div className="bg-slate-100/60 rounded-xl border border-slate-200/50 p-4 flex flex-col h-[320px]">
          <div className="flex items-center justify-between mb-2 shrink-0">
            <div>
              <h2 className="text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                <span>當日缺勤、請假與出差原因分佈</span>
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">曠職、未簽核假單、出差統計</p>
            </div>
            <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
              缺勤結構
            </span>
          </div>

          <div className="flex-1 min-h-0 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={absenceBreakdownData}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {absenceBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Summary Label inside Donut */}
            <div className="absolute top-[41%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <span className="text-xs text-slate-400 font-semibold block">缺勤+出差</span>
              <span className="text-lg font-black text-slate-900 font-mono">170 人</span>
            </div>
          </div>

          {/* Bottom Legend Badges */}
          <div className="shrink-0 grid grid-cols-3 gap-1 pt-1 border-t border-slate-100 text-[10px] font-medium text-slate-600">
            {absenceBreakdownData.map((item) => (
              <div key={item.name} className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 4: 合作學校學生實習出勤與缺勤分析 (Bar Chart) */}
        <div className="bg-slate-100/60 rounded-xl border border-slate-200/50 p-4 flex flex-col h-[320px]">
          <div className="flex items-center justify-between mb-3 shrink-0">
            <div>
              <h2 className="text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                <span>合作院校學生出勤與缺勤率分析</span>
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">學生報表院校維度分析</p>
            </div>
            <span className="text-xs font-mono font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
              學生報表
            </span>
          </div>

          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studentSchoolData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="school" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="expected" name="應到學生" fill="#c084fc" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="actual" name="實到學生" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="absent" name="缺勤學生" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 5: 製造樓層/線別當日實到與缺勤 Top 6 (Horizontal Bar) */}
        <div className="bg-slate-100/60 rounded-xl border border-slate-200/50 p-4 flex flex-col h-[320px]">
          <div className="flex items-center justify-between mb-3 shrink-0">
            <div>
              <h2 className="text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-600"></span>
                <span>製造處各樓層/線別當日人力狀況</span>
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">樓層名單實到人數與缺勤點檢</p>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded">
              線別排行
            </span>
          </div>

          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={floorAttendanceData} margin={{ top: 5, right: 10, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="floor" type="category" tick={{ fontSize: 10, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
                <Bar dataKey="actual" name="實到人數" fill="#06b6d4" radius={[0, 4, 4, 0]} barSize={12} />
                <Bar dataKey="absent" name="缺勤人數" fill="#f43f5e" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 6: 當日班別人力分佈 (Shift Distribution Bar) */}
        <div className="bg-slate-100/60 rounded-xl border border-slate-200/50 p-4 flex flex-col h-[320px]">
          <div className="flex items-center justify-between mb-3 shrink-0">
            <div>
              <h2 className="text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                <span>當日班別與班段 (Day / Night) 人力與出席</span>
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">日班 vs 夜班當日出席動態</p>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              班別比較
            </span>
          </div>

          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shiftDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="shift" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="expected" name="應到人數" fill="#a5b4fc" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="actual" name="實到人數" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 4. Bottom Data Insights & High Absence Warnings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
        {/* Warning Card: 曠職與未簽核異常預警 */}
        <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-rose-800 flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>當日曠職與未簽核假單預警</span>
            </span>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
              需要關注
            </span>
          </div>
          <ul className="text-xs space-y-1.5 text-slate-700 font-medium">
            <li className="flex justify-between items-center bg-white p-2 rounded border border-rose-100">
              <span>PCB_OPEN (製造樓層)</span>
              <span className="font-bold text-rose-600 font-mono">曠職 3 人 / 未簽核 2 人</span>
            </li>
            <li className="flex justify-between items-center bg-white p-2 rounded border border-rose-100">
              <span>中華大學 - 電子工程系</span>
              <span className="font-bold text-rose-600 font-mono">曠職 4 人 / 實到率 93.3%</span>
            </li>
          </ul>
        </div>

        {/* Insight Card: 建教生與實習人力分析 */}
        <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-purple-800 flex items-center space-x-1.5">
              <GraduationCap className="w-4 h-4 text-purple-600" />
              <span>實習生與建教生當日出勤總結</span>
            </span>
            <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
              實習概況
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            全廠實習生今日應到 <strong className="text-slate-900 font-mono">520</strong> 人，實到 <strong className="text-purple-700 font-mono">495</strong> 人 (整體出勤率 <strong className="text-purple-700 font-mono">95.2%</strong>)。勤益科大表現最佳 (出勤率 96.2%)。
          </p>
        </div>

        {/* Insight Card: 人力排程與加班支援 */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-800 flex items-center space-x-1.5">
              <Factory className="w-4 h-4 text-emerald-600" />
              <span>製造線上/線下當日支援與額外出勤</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              人力運作
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            製造處 ONLINE 線上線別實到 <strong className="text-emerald-700 font-mono">1,368</strong> 人，額外出勤/支援人力共 <strong className="text-emerald-700 font-mono">18</strong> 人，有效平補 1-1 Google線與 1-2 ASSY線產線缺口。
          </p>
        </div>
      </div>
    </div>
  );
};
