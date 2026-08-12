import React, { useState } from 'react';
import { 
  BarChart3, 
  Sliders, 
  ClipboardList, 
  Settings, 
  ChevronDown, 
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { SubMenuItem } from '../types';

interface SidebarProps {
  activeSubMenu: SubMenuItem;
  onSelectSubMenu: (item: SubMenuItem) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSubMenu, onSelectSubMenu }) => {
  // Sidebar collapsed state
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Accordion open/close state
  const [openConfig, setOpenConfig] = useState(true);
  const [openReports, setOpenReports] = useState(true);
  const [openSystem, setOpenSystem] = useState(true);

  const baseConfigItems: SubMenuItem[] = [
    '組織配置',
    '班型管理',
    '樓層管理',
    '學歷管理',
    '報表分類',
    '假別管理',
    '郵件管理',
  ];

  const attendanceReportItems: SubMenuItem[] = [
    '在職員工明細',
    '每日出勤報表',
    '每日出勤報表-製造',
    '每日出勤報表-學生',
  ];

  const systemMgmtItems: SubMenuItem[] = [
    '功能清單',
    '用戶管理',
    '角色配置',
    '人員角色',
    '系統配置',
  ];

  return (
    <aside 
      className={`${
        isCollapsed ? 'w-16' : 'w-68'
      } bg-[#2563eb] text-white flex flex-col justify-between shrink-0 shadow-lg h-full select-none transition-all duration-300 relative z-20`}
    >
      {/* Top Toggle Header */}
      <div className="flex items-center justify-between p-3.5 border-b border-blue-500/30">
        {!isCollapsed && (
          <span className="font-bold text-xs tracking-wider text-blue-100 uppercase pl-1">
            系統選單
          </span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 rounded-lg hover:bg-blue-700 text-blue-100 hover:text-white transition-colors cursor-pointer ${
            isCollapsed ? 'mx-auto' : 'ml-auto'
          }`}
          title={isCollapsed ? '展開側邊欄' : '收合側邊欄'}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="w-5 h-5 text-white" />
          ) : (
            <PanelLeftClose className="w-5 h-5 text-blue-100" />
          )}
        </button>
      </div>

      {/* Navigation List */}
      <div className="py-4 px-2.5 space-y-2 overflow-y-auto flex-1 min-h-0 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        
        {/* DASHBOARD Link */}
        <button
          onClick={() => {
            onSelectSubMenu('DASHBOARD');
          }}
          title="DASHBOARD"
          className={`w-full flex items-center ${
            isCollapsed ? 'justify-center px-0' : 'space-x-3 px-4'
          } py-3 rounded-xl transition-colors text-base font-bold tracking-wide cursor-pointer ${
            activeSubMenu === 'DASHBOARD'
              ? 'bg-white text-blue-700 shadow-md'
              : 'hover:bg-blue-700/80 text-white'
          }`}
        >
          <BarChart3 className={`w-5 h-5 shrink-0 ${activeSubMenu === 'DASHBOARD' ? 'text-blue-600' : 'text-blue-200'}`} />
          {!isCollapsed && <span>DASHBOARD</span>}
        </button>

        {/* 基礎配置 Section */}
        <div className="pt-2">
          <button
            onClick={() => {
              if (isCollapsed) setIsCollapsed(false);
              setOpenConfig(!openConfig);
            }}
            title="基礎配置"
            className={`w-full flex items-center ${
              isCollapsed ? 'justify-center px-0' : 'justify-between px-4'
            } py-2.5 rounded-xl hover:bg-blue-700/80 transition-colors text-base font-semibold text-blue-100 cursor-pointer`}
          >
            <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'}`}>
              <Sliders className="w-5 h-5 shrink-0 text-blue-200" />
              {!isCollapsed && <span>基礎配置</span>}
            </div>
            {!isCollapsed && (
              openConfig ? (
                <ChevronDown className="w-4.5 h-4.5 text-blue-300" />
              ) : (
                <ChevronRight className="w-4.5 h-4.5 text-blue-300" />
              )
            )}
          </button>

          {(!isCollapsed && openConfig) && (
            <div className="pl-9 pr-1.5 py-1.5 space-y-1">
              {baseConfigItems.map((item) => {
                const isActive = activeSubMenu === item;
                return (
                  <button
                    key={item}
                    onClick={() => onSelectSubMenu(item)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-blue-700 font-bold shadow-xs'
                        : 'text-blue-100 hover:bg-blue-700/60 hover:text-white font-medium'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 出勤報表 Section */}
        <div className="pt-2">
          <button
            onClick={() => {
              if (isCollapsed) setIsCollapsed(false);
              setOpenReports(!openReports);
            }}
            title="出勤報表"
            className={`w-full flex items-center ${
              isCollapsed ? 'justify-center px-0' : 'justify-between px-4'
            } py-2.5 rounded-xl hover:bg-blue-700/80 transition-colors text-base font-semibold text-blue-100 cursor-pointer`}
          >
            <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'}`}>
              <ClipboardList className="w-5 h-5 shrink-0 text-blue-200" />
              {!isCollapsed && <span>出勤報表</span>}
            </div>
            {!isCollapsed && (
              openReports ? (
                <ChevronDown className="w-4.5 h-4.5 text-blue-300" />
              ) : (
                <ChevronRight className="w-4.5 h-4.5 text-blue-300" />
              )
            )}
          </button>

          {(!isCollapsed && openReports) && (
            <div className="pl-9 pr-1.5 py-1.5 space-y-1">
              {attendanceReportItems.map((item) => {
                const isActive = activeSubMenu === item;
                return (
                  <button
                    key={item}
                    onClick={() => onSelectSubMenu(item)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-blue-700 font-bold shadow-xs'
                        : 'text-blue-100 hover:bg-blue-700/60 hover:text-white font-medium'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 系統管理 Section */}
        <div className="pt-2">
          <button
            onClick={() => {
              if (isCollapsed) setIsCollapsed(false);
              setOpenSystem(!openSystem);
            }}
            title="系統管理"
            className={`w-full flex items-center ${
              isCollapsed ? 'justify-center px-0' : 'justify-between px-4'
            } py-2.5 rounded-xl hover:bg-blue-700/80 transition-colors text-base font-semibold text-blue-100 cursor-pointer`}
          >
            <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'}`}>
              <Settings className="w-5 h-5 shrink-0 text-blue-200" />
              {!isCollapsed && <span>系統管理</span>}
            </div>
            {!isCollapsed && (
              openSystem ? (
                <ChevronDown className="w-4.5 h-4.5 text-blue-300" />
              ) : (
                <ChevronRight className="w-4.5 h-4.5 text-blue-300" />
              )
            )}
          </button>

          {(!isCollapsed && openSystem) && (
            <div className="pl-9 pr-1.5 py-1.5 space-y-1">
              {systemMgmtItems.map((item) => {
                const isActive = activeSubMenu === item;
                return (
                  <button
                    key={item}
                    onClick={() => onSelectSubMenu(item)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-blue-700 font-bold shadow-xs'
                        : 'text-blue-100 hover:bg-blue-700/60 hover:text-white font-medium'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Footer Branding */}
      <div className="p-3 border-t border-blue-500/30 text-center shrink-0">
        {!isCollapsed ? (
          <p className="text-xs text-blue-200 font-medium tracking-wide">
            Powered by CESBG IT
          </p>
        ) : (
          <p className="text-[10px] text-blue-200 font-bold">
            CESBG
          </p>
        )}
      </div>
    </aside>
  );
};
